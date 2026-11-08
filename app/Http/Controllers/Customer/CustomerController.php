<?php

namespace App\Http\Controllers\Customer;

use Mail;
use Auth;
use Hash;
use Session;
use Response;
use Cookie;
use Str;
use File;
use Carbon\Carbon;
use App\Models\Country;
use App\Models\Transaction;
use App\Models\User;
use App\Models\Media;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CustomerController extends Controller
{
    
      
    public function __construct(){

        function isMobileDevice() {
          return preg_match("/(android|avantgo|blackberry|bolt|boost|cricket|docomo 
        |fone|hiptop|mini|mobi|palm|phone|pie|tablet|up\.browser|up\.link|webos|wos)/i" 
        , $_SERVER["HTTP_USER_AGENT"]); 
        }

        if(isMobileDevice())
        {
          $this->device =general()->theme.'.customer.';
        }
        else
        {
          $this->device =general()->theme.'.customer.';
        }

    }

    public function dashboard(Request $request){
      $user =Auth::user();
      $donations =$user->donations()->whereIn('type',[0,1]);
      $donationsProcceing =$user->donations()->whereIn('type',[1]);
      $donationsCompleted =$user->donations()->whereIn('type',[1]);
      $report = [
        'total' => priceFullFormat($donations->sum('amount')),
        'total_count' => priceFormat($donations->count()),
        'total_processing' => priceFullFormat($donationsProcceing->sum('amount')),
        'processing_count' => priceFormat($donationsProcceing->count()),
        'total_completed' => priceFullFormat($donationsCompleted->sum('amount')),
        'complete_count' => priceFormat($donationsCompleted->count()),
        ];


      return Inertia::render('User/Dashboard', compact('report'));
    }

    public function profileEdit(Request $r){
      $user =Auth::user();
      if($r->isMethod('post')){

        $check = $r->validate([
            'name' => 'required|max:100',
            'email' => 'required|max:100|unique:users,email,'.$user->id,
            'mobile' => 'nullable|max:20|unique:users,mobile,'.$user->id,
            'address' => 'nullable|max:5000',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $user->name =$r->name;
        $user->email =$r->email;
        $user->mobile =$r->mobile;
        $user->address_line1 =$r->address;
        $user->save();
        
        ///////Image Uploard Start////////////
        if($r->hasFile('image')){
            $file =$r->image;
            $src  =$user->id;
            $srcType  =6;
            $fileUse  =1;
            uploadFile($file,$src,$srcType,$fileUse);
        }
        ///////Image Uploard End///////////
        
        return redirect()->back()
            ->withErrors(['status'=>'success','message' => 'Your Profile has been Updated successfully.']);

      }

      $user->image_url =asset($user->image());

      return Inertia::render('User/Profile',compact('user'));
    }


    public function myBooking(Request $r){
      $user =Auth::user();
      $bookings =$user->donations()->latest()
                  ->where(function($q)use($r){
                    if($r->beneficiary){
                      $q->where('src_id',$r->beneficiary);
                    }
                  })
                  ->paginate(10)->appends([
                      'beneficiary'=>$r->beneficiary,
                    ]);

      collect($bookings->items())->map(function($item){

          $item->formatAmount =priceFullFormat($item->amount);
          $item->createdAt =$item->created_at->format('d-m-Y h:i A');
          return $item;
      });

      return Inertia::render('User/MyBooking',compact('bookings'));
    }


    public function myBookingAction($id){
      $user =Auth::user();
      $donation =$user->donations()->find($id);
      if(!$donation){
        return abort(404);
      }

      $donation->formatAmount =priceFullFormat($donation->amount);
      $donation->createdAt =$donation->created_at->format('d-m-Y h:i A');

      return Inertia::render('User/MyDonationView',compact('donation'));
    }
    
    public function changePassword(Request $r){
      $user =Auth::user();
        if($r->isMethod('post')){
          $check = $r->validate([
              'current_password' => 'required|string|min:8',
              'password' => 'required|string|min:8|confirmed|different:current_password',
          ]);
          
          if (Hash::check($r->current_password, $user->password)) {
            $user->password = Hash::make($r->password);
            $user->password_show = $r->password;
            $user->save();
    
            return redirect()->back()
            ->withErrors(['status'=>'success','message' => 'Your password has been changed successfully.']);

          }else{

            return redirect()->back()
                ->withErrors(['status'=>'error','message' => 'Current password does not match.']);
          }

          if(Hash::check($r->current_password, $user->password)){
            $user->password_show=$r->password;
            $user->password=Hash::make($r->password);
            $user->save();
            return back()->withErrors(['status' => 'success','message' => 'Your password has been changed successfully.']);
            // return back()->with('status', 'success')->with('message', 'Your password has been changed successfully.');
          }else{
            return back()->withErrors(['status' => 'error','message' => 'Carrent Password Are Not Match']);
          }

        }

        return Inertia::render('User/ChangePassword');
    }


    


}
