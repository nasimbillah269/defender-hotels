<?php

namespace App\Http\Controllers\Welcome;

use Image;
use Auth;
use Hash;
use Str;
use Artisan;
use Session;
use Carbon\Carbon;
use App\Models\Country;
use App\Models\Post;
use App\Models\PostAttribute;
use App\Models\Media;
use App\Models\PostExtra;
use App\Models\Review;
use App\Models\User;
use App\Models\Booking;
use App\Models\Attribute;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InertiaWelcomeController extends Controller
{

    public function geo_filter($id){

    $datas=Country::where('parent_id',$id)->get();

    $geoData =View('geofilter',compact('datas'))->render();

        return Response()->json([
            'success' => true,
            'geoData' => $geoData,
            ]);
    }
    
    public function imageView(Request $r){
        if($r->imageUrl && is_numeric($r->weight) && is_numeric($r->height)){
        $image = Image::make($r->imageUrl)->fit($r->weight,$r->height)->response();
        }else{
        $image = Image::make('public/medies/noimage.jpg')->fit(200,200)->response(); 
        }
        return $image;
    }
    
    public function imageView2(Request $r,$template=null,$image=null){
        $weight=null;
        $height=null;
        
        if(is_numeric($r->w)){
        $weight=$r->w;  
        }
        if(is_numeric($r->h)){
        $height=$r->h;  
        }
        
        $filePath='public/medies/noimage.jpg';
        
        if($image){
            $file =Media::where('file_rename',$image)->select(['file_url'])->first();
            if($file){
                $filePath = $file->file_url;
            }
        }
        
        
        // if($template=='s-profile'){
            
        //     if($image && $image!='profile.png' && $file){
        //         $filePath = $file->file_url;
        //     }else{
        //         $filePath ='public/medies/profile.png';
        //     }
        // }
        
        $mImage =Image::make($filePath);
        if($weight && $height){
            $mImage=$mImage->fit($weight,$height);
        }
        $mImage=$mImage->response();
        
        return $mImage;
    }

    public function siteMapXml(Request $r){
        
    $pages = Post::latest()->where('type',0)->where('status','active')->select(['slug','updated_at','status'])->limit(200)->get();
    $posts = Post::latest()->where('type',1)->where('status','active')->select(['slug','updated_at','status'])->limit(500)->get();
    $products = Post::latest()->where('type',2)->where('status','active')->select(['slug','updated_at','status'])->limit(300)->get();
    
    return response()->view('siteMap',compact('pages','posts','products'))->header('Content-Type', 'text/xml');
    }
    public function language($lang=null){
        if($lang){
            Session::put('lang',$lang);
        }else{
            Session::put('lang','en');
        }
        return redirect()->back();
    }

    public function index(Request $r){
        
        $general=general();
        
        $posts =Post::where('type',1)
        ->where('status','active')
        ->whereDate('created_at','<=',Carbon::now())
        ->limit(4)
        ->get(['id','name','slug','created_at']);

        collect($posts)->map(function($item){
            $item->date =$item->created_at->format('d');
            $item->month =$item->created_at->format('M');
            $item->image_url = asset($item->image());
            $item->category = $item->postCategories()->get()->last()->get()?$item->postCategories()->get()->last()->name:null;
            
            unset($item->imageFile);
            return $item;
        });
        
           $services =Post::where('type',3)
        ->where('status','active')
        ->whereDate('created_at','<=',Carbon::now())
        // ->limit(5)
        ->whereHas('ctgServices',function($q){
            $q->where('reff_id',221);
        })
        ->get(['id','name','slug','description','created_at']);
        
        $bella =pageTemplate('Bella Maris');
        $bookingUrl =null;
        if($bella){
            $bookingUrl =route('pageView',$bella->slug?:'no-title');
        }
        collect($services)->map(function($item)use($bookingUrl){

            $img=$item->galleryFiles()->first();
            $item->image_url = $img?asset($img->image()):null;
            $item->url = $bookingUrl;
            $item->category = $item->serviceCategories()->get()->last()->get()?$item->serviceCategories()->get()->last()->name:null;
            unset($item->imageFile);
            return $item;
        });
        $services2 =Post::where('type',3)
        ->where('status','active')
        ->whereDate('created_at','<=',Carbon::now())
        // ->limit(5)
        ->whereHas('ctgServices',function($q){
            $q->where('reff_id',220);
        })
        ->get(['id','name','slug','description','created_at']);
        
        $bella =pageTemplate('Bella Maris');
        $bookingUrl =null;
        if($bella){
            $bookingUrl =route('pageView',$bella->slug?:'no-title');
        }
        collect($services2)->map(function($item)use($bookingUrl){
             $img=$item->galleryFiles()->first();
            $item->image_url = $img?asset($img->image()):null;
            $item->url = $bookingUrl;
            $item->category = $item->serviceCategories()->get()->last()->get()?$item->serviceCategories()->get()->last()->name:null;
            unset($item->imageFile);
            return $item;
        });
        



        $servicesList =Post::where('type',3)
        ->where('status','active')
        ->whereDate('created_at','<=',Carbon::now())
        ->get(['id','name']);

        $booking =pageTemplate('Booking');
        $bookingUrl =null;
        if($booking){
            $bookingUrl =route('pageView',$booking->slug?:'no-title');
        }
        
          $sliders =slider('Front Page Slider');
        if($sliders){
            if($sliders->subSliders->count()>0){
                $sliders = $sliders->subSliders()->select(['id','name','description'])->get();
                collect($sliders)->map(function($item){
                    $item->image_url = asset($item->image());
                    unset($item->imageFile);
                    return $item;
                });
            }
        }


       
        $categores =Attribute::latest()->where('type',0)->where('status','active')->where('fetured',true)->get(['id','name']);



        $meta=[
         'title'=>general()->meta_title,
         'description'=>general()->meta_description,
         'keywords'=>general()->meta_keyword,
         'image'=>general()->logo_url,
         'url'=>route('index'),
        ];

        return Inertia::render('Welcome',compact('posts','categores','services','services2','servicesList','bookingUrl','sliders','meta'));

    }

    public function serviceCategory($slug){
        $category =Attribute::latest()->where('type',0)->where('slug',$slug)->first();
        if(!$category){
            return abort('404');
        }

        $category->image_url = asset($category->image());
        unset($category->imageFile);

        $services = Post::whereHas('ctgServices',function($q) use($category){
            $q->where('reff_id',$category->id);
        })
        ->where(function($qq){
            $qq->where('status','proceeding');
        })
        ->select(['id','name','slug','created_at','short_description'])
        ->whereDate('created_at','<=',date('Y-m-d'))
        ->paginate(12);

        $bella =pageTemplate('Bella Maris');
        $bookingUrl =null;
        if($bella){
            $bookingUrl =route('pageView',$bella->slug?:'no-title');
        }

        collect($services->items())->map(function($item)use($bookingUrl){
            $item->image_url = asset($item->image());
            $item->url = $bookingUrl;
            $item->category = $item->serviceCategories()->get()->last()->get()?$item->serviceCategories()->get()->last()->name:null;
            unset($item->imageFile);
            return $item;
        });
        
        $categores =Attribute::latest()->where('type',0)->where('status','active')->where('fetured',true)->get(['id','name']);
        $servicesList =Post::where('type',3)
        ->where('status','active')
        ->whereDate('created_at','<=',Carbon::now())
        ->get(['id','name']);
        return Inertia::render('BellaMaris', compact('category', 'services', 'categores','servicesList'));
    
    }

    public function serviceView($slug){
    $service =Post::latest()->where('type',3)->where('slug',$slug)->first();
    if(!$service){
        return abort('404');
    }
    $service->completed_percent =$service->servicePercent();
    $service->parentCtg =$service->parentCtg();
    $service->subCtg =$service->subCtg();
    $service->subSubCtg =$service->subSubCtg();
    $service->image_url = asset($service->image());
    $service->goalAmount =priceFullFormat($service->amount);
    $service->raisedAmount =priceFullFormat($service->raised_amount);
    unset($service->imageFile);
    unset($service->serviceCategories);

    $services = $service->relatedServices()->where('type',3)->select(['id','name','slug','amount','raised_amount','created_at','short_description','description'])
    ->whereDate('created_at','<=',date('Y-m-d'))
    ->paginate(12);
    collect($services->items())->map(function($item){
        $item->completed_percent =$item->servicePercent();
        $item->parentCtg =$item->parentCtg();
        $item->subCtg =$item->subCtg();
        $item->subSubCtg =$item->subSubCtg();
        $item->image_url = asset($item->image());
        $item->goalAmount =priceFullFormat($item->amount);
        $item->raisedAmount =priceFullFormat($item->raised_amount);
        unset($item->imageFile);
        return $item;
    });

    return Inertia::render('DonorDetails', compact('service', 'services'));
   
    }

    public function booking(Request $r){
        

        if($r->booking_type==1){
            $check = $r->validate([
                'name' => 'required|max:100',
                'email' => 'required|max:100',
                'mobile' => 'required|max:100',
                'category' => 'required|numeric',
            ]);
        }else{
            $check = $r->validate([
                'name' => 'required|max:100',
                'booking_date' => 'required|max:100',
                'address' => 'required|max:500',
                'email' => 'required|max:100',
                'mobile' => 'required|max:100',
                'category' => 'required|numeric',
                'nid_number' => 'required|max:100',
                'quantity' => 'required|numeric',
                'amount' => 'required|numeric',
                'booking_amount' => 'required|numeric',
                'payment_method' => 'required|max:100',
                'bank_details' => 'required|max:500',
                'attachment' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            ]);
        }

        

        $booking =new Booking();
        $booking->name =$r->name;
        $booking->booking_date =$r->booking_date;
        $booking->address =$r->address;
        $booking->email =$r->email;
        $booking->mobile =$r->mobile;
        $booking->category_id =$r->category;
        $booking->nid_number =$r->nid_number;
        $booking->quantity =$r->quantity?:0;
        $booking->amount =$r->amount?:0;
        $booking->booking_amount =$r->booking_amount?:0;
        $booking->payment_method =$r->payment_method;
        $booking->bank_details =$r->bank_details;
        $booking->type =$r->booking_type==1?1:0;
        $booking->status ='pending';
        $booking->save();

        ///////Image Uploard Start////////////
        if($r->hasFile('attachment')){
            $file =$r->attachment;
            $src  =$booking->id;
            $srcType  =9;
            $fileUse  =1;
            uploadFile($file,$src,$srcType,$fileUse);
        }
        ///////Image Uploard End///////////

        return redirect()->back()
            ->withErrors(['status'=>'success','message' => 'Your Booking has been send success. we are responsonse as soon as possiable']);

    }

    public function blogCategory($slug){
        $category =Attribute::latest()->where('type',6)->where('slug',$slug)->first();
        if(!$category){
            return abort('404');
        }

        $posts = $category->activePosts()->latest()
        ->select(['id','name','slug','short_description','addedby_id','created_at'])
        ->paginate(10);

        return view(welcomeTheme().'blogs.categoryPosts',compact('category','posts'));
    }

    public function blogTag($slug){
        $tag =Attribute::latest()->where('type',7)->where('slug',$slug)->first();
        if(!$tag){
            return abort('404');
        }

        $posts = Post::whereHas('tagPosts',function($q) use($tag){
            $q->where('reff_id',$tag->id);
        })
        ->where(function($qq){
            $qq->where('status','active');
        })
        ->select(['id','name','slug','short_description','addedby_id','created_at'])
        ->whereDate('created_at','<=',date('Y-m-d'))
        ->paginate(10);

        return view(welcomeTheme().'blogs.tagPosts',compact('tag','posts'));
    }

    public function blogAuthor($id,$slug){
        $author =User::find($id);
        if(!$author){
            return abort('404');
        }
        $posts =$author->posts()->latest()->where('type',1)->where('status','active')
        ->select(['id','name','slug','short_description','addedby_id','created_at'])
        ->whereDate('created_at','<=',date('Y-m-d'))
        ->paginate(10);
        return view(welcomeTheme().'blogs.authorPosts',compact('author','posts'));

    }

    public function blogView($slug){
    $blog =Post::whereIn('type',[1,4])->where('slug',$slug)->first();
    if(!$blog){
        return abort('404');
    }
    $blog->formatData =$blog->created_at->format('d M Y');
    $blog->image_url = asset($blog->image());

    unset($blog->imageFile);

    $recentPosts =Post::where('type',$blog->type)->where('status','active')->latest()->limit(5)->select(['id','name','slug'])->get();

    collect($recentPosts)->map(function($item){
        $item->image_url = asset($item->image());
        unset($item->imageFile);
        return $item;
    });


    $relatedPosts =$blog->relatedPosts()->limit(3)->select(['id','name','slug','short_description','addedby_id','created_at'])->get();
    $comments =$blog->postComments()->latest()->where('status','active')->select(['id','name','content','created_at'])->paginate(10);
    collect($comments->items())->map(function($item){
        $item->image_url = asset($item->image());
        $item->formatDate = $item->created_at->format('d f l Y');
        unset($item->imageFile);
        return $item;
    });

    $meta = [
        'title' => websiteTitle($blog->seo_title ?: $blog->name),
        'description' => $blog->seo_description ?: general()->meta_description,
        'keywords' => $blog->seo_keyword ?: general()->meta_keyword,
        'image' => asset($blog->image()),
        'url' => route('blogView', $blog->slug ?: 'no-title'),
    ];

    return Inertia::render('BlogDetailPage', compact('blog', 'recentPosts','comments','meta'));
    
    return view(welcomeTheme().'blogs.blogView',compact('post','relatedPosts','recentPosts','comments'));

    }

    public function blogSearch(Request $r){

        $posts =Post::latest()->where('type',1)->where('status','active')
        ->where(function($q) use ($r) {
            if($r->search){
            $q->where('name','LIKE','%'.$r->search.'%');
            }
        })
        ->select(['id','name','slug','short_description','addedby_id','created_at'])
        ->whereDate('created_at','<=',date('Y-m-d'))
        ->paginate(10)->appends([
            'search'=>$r->search,
        ]);

        collect($posts->items())->map(function($item){
            $item->date =$item->created_at->format('d');
            $item->month =$item->created_at->format('M');
            $item->image_url = asset($item->image());
          
            unset($item->imageFile);
            return $item;
        });

        return Inertia::render('BlogSearch', compact('posts'));
    return view(welcomeTheme().'blogs.blogSearch',compact('posts','r'));

    }

    public function blogComments(Request $r,$slug){
        $post =Post::where('type',1)->where('slug',$slug)->first();
        if(!$post){
            return abort('404');
        }
        $check = $r->validate([
            'name' => 'required|max:100',
            'email' => 'required|max:100',
            'comment' => 'required|max:1000',
        ]);

        $comments =new Review();
        if(Auth::check()){
        $comments->addedby_id=Auth::id();
        }
        $comments->src_id=$post->id;
        $comments->type=1;
        $comments->status='active';
        $comments->name=$r->name;
        $comments->email=$r->email;
        $comments->content=$r->comment;
        $comments->save();

        return redirect()->back()
            ->withErrors(['status'=>'success','message' => 'Your Comment are Successfully Done.']);

    }
  
  
    /** Videos page (/videos) – videos managed from Admin > Videos (posts.type = 5). */
    public function videosPage(Request $r){

        $videos = Post::where('type',5)->where('status','active')
          ->whereNotNull('search_key')
          ->whereDate('created_at','<=',date('Y-m-d'))
          ->orderBy('view')->latest()
          ->get(['id','name','search_key','view','created_at'])
          ->map(function($item){
              return [
                  'id'    => $item->id,
                  'title' => $item->name,
                  'url'   => $item->search_key,
                  'thumb' => asset($item->image()),
              ];
          })->values();

        $page = ['name' => 'Videos', 'slug' => 'videos'];
        $meta = [
            'title' => websiteTitle('Videos'),
            'description' => general()->meta_description,
            'keywords' => general()->meta_keyword,
            'image' => asset(general()->logo),
            'url' => route('videosPage'),
        ];

        return Inertia::render('Videos', compact('page','videos','meta'));
    }

    /** Dedicated Blog listing page (/blog) – shows Blog posts (type 4) managed from Admin > Blog. */
    public function blogsPage(Request $r){

        $posts = Post::latest()->where('type',4)->where('status','active')
          ->whereDate('created_at','<=',date('Y-m-d'))
          ->select(['id','name','slug','short_description','description','addedby_id','created_at'])
          ->paginate(9);

        collect($posts->items())->map(function($item){
            $item->date  = $item->created_at->format('d');
            $item->month = $item->created_at->format('M');
            $item->image_url = asset($item->image());
            $ctg = $item->postCategories()->get()->last();
            $item->category = $ctg ? $ctg->name : null;
            // Fall back to the description when no short description is set
            if(!trim(strip_tags((string) $item->short_description))){
                $item->short_description = Str::limit(trim(strip_tags((string) $item->description)), 160);
            }
            unset($item->imageFile, $item->description);
            return $item;
        });

        $page = ['name' => 'Blog', 'slug' => 'blog'];
        $meta = [
            'title' => websiteTitle('Blog'),
            'description' => general()->meta_description,
            'keywords' => general()->meta_keyword,
            'image' => asset(general()->logo),
            'url' => route('blogsPage'),
        ];

        return Inertia::render('Blogs', compact('page','posts','meta'));
    }

    public function pageView($slug){
      
        $page =Post::latest()->whereIn('type',[0,1])->where('slug',$slug)->first();
        if(!$page){
          return abort('404');
        }

        $meta = [
                'title' => $page->seo_title ?: websiteTitle($page->name),
                'description' => $page->seo_description ?: general()->meta_description,
                'keywords' => $page->seo_keyword ?: general()->meta_keyword,
                'image' => asset($page->image()),
                'url' => route('pageView', $page->slug ?: 'no-title'),
            ];

        //Font Home Page
        if($page->template=='Front Page'){
          return redirect()->route('index');
        }
  
        //Galleries Page – shows the images of the galleries selected on the page (Admin > Pages > Galleries)
        if($page->template=='Galleries'){
          $galleryIds = PostAttribute::where('src_id',$page->id)->where('type',2)->orderBy('id')->pluck('reff_id');
          $galleries = Attribute::where('type',4)->where('status','active')->whereIn('id',$galleryIds)->get()
            ->sortBy(fn($g) => $galleryIds->search($g->id))->values()
            ->map(function($g){
                return [
                  'id'     => $g->id,
                  'name'   => $g->name,
                  'images' => $g->galleryImages()->get()->map(fn($m) => [
                      'id'    => $m->id,
                      'url'   => asset($m->file_url),
                      'title' => $m->alt_text,
                      'text'  => $m->description,
                  ])->values(),
                ];
            })->filter(fn($g) => count($g['images']) > 0)->values();

          $pageData = ['name' => $page->name, 'slug' => $page->slug, 'short_description' => $page->short_description];
          return Inertia::render('Gallery', ['page' => $pageData, 'galleries' => $galleries, 'meta' => $meta]);
        }

        //Contact Us Page
        if($page->template=='Contact Us'){
          return Inertia::render('ContactUs', compact('page','meta'));
        }
        
        //Blue Rain Resorts Page
        if($page->template=='Carrer'){
          return Inertia::render('Carrer', compact('page','meta'));
        }

        //Blue Rain Resorts Page
        if($page->template=='Blue Rain Resorts'){
          return Inertia::render('BlueRainResorts', compact('page','meta'));
        }
        
         //project overview Page
        if($page->template=='Project Overview'){
            $servicesList =Post::where('type',3)
            ->where('status','active')
            ->whereDate('created_at','<=',Carbon::now())
            ->get(['id','name']);
          return Inertia::render('projectOverView', compact('page', 'servicesList','meta'));
        }
  
        //About Us Page
        if($page->template=='About Us'){
          return Inertia::render('AboutUs', compact('page','meta'));
        }
        //Booking Page
        if($page->template=='Booking'){
            $categores =Attribute::latest()->where('type',0)->where('status','active')->where('fetured',true)->get(['id','name']);
            $servicesList =Post::where('type',3)
            ->where('status','active')
            ->whereDate('created_at','<=',Carbon::now())
            ->get(['id','name','share_price','share_quantity']);

            return Inertia::render('BookingPage', compact('page','categores','servicesList','meta'));
        }

        //News & Events Page
        if($page->template=='Bella Maris'){
            
            $services = Post::latest()->where('type',3)->where('status','active')
            ->select(['id','name','slug','short_description','description','addedby_id','created_at'])
            ->whereDate('created_at','<=',date('Y-m-d'))
            ->paginate(12);
            
            $bella =pageTemplate('Bella Maris');
            $bookingUrl =null;
            if($bella){
                $bookingUrl =route('pageView',$bella->slug?:'no-title');
            }
            
            collect($services->items())->map(function($item)use($bookingUrl){
                $item->image_url = asset($item->image());
                $item->url = $bookingUrl;
                $item->category = $item->serviceCategories()->get()->last()->get()?$item->serviceCategories()->get()->last()->name:null;
                unset($item->imageFile);
                return $item;
            });
       
            $categores =Attribute::latest()->where('type',0)->where('status','active')->where('fetured',true)->get(['id','name']);
            $servicesList =Post::where('type',3)
            ->where('status','active')
            ->whereDate('created_at','<=',Carbon::now())
            ->get(['id','name']);

            return Inertia::render('BellaMaris', compact('page','services','categores','servicesList','meta'));
        }
        
        //Latest Blog Page
        if($page->template=='Latest Blog'){
          // Pages whose slug/name contains "blog" list Blog posts (type 4); others list News & Events (type 1)
          $postType = (stripos($page->slug.' '.$page->name, 'blog') !== false) ? 4 : 1;
          $posts = Post::latest()->where('type',$postType)->where('status','active')
          ->select(['id','name','slug','short_description','addedby_id','created_at'])
          ->whereDate('created_at','<=',date('Y-m-d'))
          ->paginate(10);

          collect($posts->items())->map(function($item){
                $item->date =$item->created_at->format('d');
                $item->month =$item->created_at->format('M');
                $item->image_url = asset($item->image());
                $item->category = $item->postCategories()->get()->last()->get()?$item->postCategories()->get()->last()->name:null;
                unset($item->imageFile);
                return $item;
            });

          return Inertia::render('NewsAndEvents', compact('page','posts','meta'));
        }
  
        //Latest Services Page
        if($page->template=='Latest Services'){
          $services = Post::latest()->where('type',3)->where('status','active')
          ->select(['id','name','slug','short_description','addedby_id','created_at'])
          ->whereDate('created_at','<=',date('Y-m-d'))
          ->paginate(12);

          return view(welcomeTheme().'services.latestServices',compact('services','page','meta'));
        }

        return Inertia::render('PageView', compact('page','meta'));
  
    }
    
       public function uploadcv(Request $r){


     if(general()->mail_status && general()->mail_from_address){
              //Mail Data
            //   $datas =array('r'=>$r);
            //   $template ='mails.ContactMail';
            //   $toEmail =general()->mail_from_address;
            //   $toName =general()->mail_from_name;
            //   $subject ='Contact Mail Form '.general()->title;
          
            //   sendMail($toEmail,$toName,$subject,$datas,$template);
    }
    return response()->json([
        'status' => true,
        'message' => 'CV  successfully Submited',
    ]);
}
  
    public function contactMail(Request $r){
        //return $r;
        $check = $r->validate([
            'name' => 'required|max:100',
            'email' => 'required|max:100',
            'subject' => 'required|max:100',
            'message' => 'nullable|max:500',
        ]);
  
        // if(general()->mail_status && general()->mail_from_address){
        //       //Mail Data
        //       $datas =array('r'=>$r);
        //       $template ='mails.ContactMail';
        //       $toEmail =general()->mail_from_address;
        //       $toName =general()->mail_from_name;
        //       $subject ='Contact Mail Form '.general()->title;
          
        //       sendMail($toEmail,$toName,$subject,$datas,$template);
        //   }
        
        return redirect()->back()
            ->withErrors(['status'=>'success','messages' => 'Your form send successfully done. We are response as soon as possible.']);

      }
  
      public function search(Request $r){
        
        if($r->search){
  
          $posts =Post::where('status','active')
          ->where(function($q) use($r){
            $q->where('search_key','LIKE','%'.$r->search.'%');
          })
          ->paginate(24);
  
        }else{
          $posts = array();
        }
  
        return view(welcomeTheme().'search');
  
    }
  
    public function subscribe(Request $r){
  
        if(filter_var($r->email, FILTER_VALIDATE_EMAIL)){
          $subscribe =PostExtra::latest()->where('type',1)->where('name',$r->email)->first();
  
          if(!$subscribe){
            
              $subscribe =new PostExtra();
              $subscribe->type=1;
              $subscribe->name=$r->email;
              $subscribe->save();
            $status=true;
            $message ='<p style="color: #009688;"><span>Success:</span> You Are Successfully Subsribe.</p>';
          }else{
            $status=true;
            $message ='<p style="color: #ffc107;"><span>Note:</span> You Are Already Subsribe.Thank You.</p>';
          }
  
  
        }else{
          $status=false;
          $message ='<p style="color: #ff5722;"><span>Error:</span> Email Are Not validated</p>';
        }
  
        if(request()->ajax()){
          
          return Response()->json([
                  'success' => $status,
                  'message' => $message,
                ]);
        }
  
        Session()->flash($status?'success':'error',$message);
        return redirect()->back();
  
    }
  


}