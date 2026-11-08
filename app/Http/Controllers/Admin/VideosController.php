<?php

namespace App\Http\Controllers\Admin;

use Auth;
use File;
use DB;
use Carbon\Carbon;
use App\Models\Post;
use App\Models\Media;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

/**
 * Videos (admin).
 * Stored in `posts` with type = 5:
 *   name       → video title
 *   search_key → YouTube link (or direct .mp4 URL)
 *   image      → thumbnail (media src_type 1 / use_Of_file 1)
 *   view       → display order (lower first)
 */
class VideosController extends Controller
{
    const TYPE = 5;

    private function canAll(){
      return !empty(json_decode(Auth::user()->permission->permission, true)['posts']['all']);
    }

    private function deleteVideo(Post $video){
      $medias = Media::where('src_type',1)->where('src_id',$video->id)->get();
      foreach($medias as $media){
        if(File::exists($media->file_url)){
          File::delete($media->file_url);
        }
        $media->delete();
      }
      $video->delete();
    }

    public function videos(Request $r){

      // Bulk actions
      if($r->action){
        if($r->checkid){
          $datas = Post::where('type',self::TYPE)->whereIn('id',$r->checkid)->get();
          foreach($datas as $data){
            if($r->action==1){
              $data->status='active'; $data->save();
            }elseif($r->action==2){
              $data->status='inactive'; $data->save();
            }elseif($r->action==5){
              $this->deleteVideo($data);
            }
          }
          Session()->flash('success','Action Successfully Completed!');
        }else{
          Session()->flash('info','Please Need To Select Minimum One Video');
        }
        return redirect()->back();
      }

      $canAll = $this->canAll();

      $videos = Post::where('type',self::TYPE)->where('status','<>','temp')
        ->where(function($q) use($r,$canAll){
          if($r->search){
            $q->where('name','LIKE','%'.$r->search.'%');
          }
          if($r->status){
            $q->where('status',$r->status);
          }
          if(!$canAll){
            $q->where('addedby_id',Auth::id());
          }
        })
        ->orderBy('view')->latest()
        ->select(['id','name','search_key','view','status','addedby_id','created_at'])
        ->paginate(25)->appends(['search'=>$r->search,'status'=>$r->status]);

      $totals = DB::table('posts')->where('type',self::TYPE)->where('status','<>','temp')
        ->selectRaw('count(*) as total')
        ->selectRaw("count(case when status = 'active' then 1 end) as active")
        ->selectRaw("count(case when status = 'inactive' then 1 end) as inactive")
        ->first();

      return view(adminTheme().'videos.videosAll',compact('videos','totals'));
    }

    public function videosAction(Request $r,$action,$id=null){

      if($action=='create'){
        $video = Post::where('type',self::TYPE)->where('status','temp')->where('addedby_id',Auth::id())->first();
        if(!$video){
          $video = new Post();
          $video->type = self::TYPE;
          $video->status = 'temp';
          $video->addedby_id = Auth::id();
        }
        $video->created_at = Carbon::now();
        $video->save();
        return redirect()->route('admin.videosAction',['edit',$video->id]);
      }

      $video = Post::where('type',self::TYPE)->find($id);
      if(!$video){
        Session()->flash('error','This Video Is Not Found');
        return redirect()->route('admin.videos');
      }

      if(!$this->canAll() && $video->addedby_id!=Auth::id()){
        Session()->flash('error','You are unauthorized Try!!');
        return redirect()->route('admin.videos');
      }

      if($action=='update'){
        $r->validate([
          'name'       => 'required|max:191',
          'video_link' => ['required','max:500','regex:/^(https?:\/\/|\/)\S+$/'],
          'sort_order' => 'nullable|integer|min:0',
          'image'      => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:4096',
          'created_at' => 'nullable|date',
        ],[
          'video_link.regex' => 'Please enter a valid YouTube link (https://...) or a video path starting with /.',
        ]);

        $video->name       = $r->name;
        $video->slug       = 'video-'.$video->id;
        $video->search_key = trim($r->video_link);
        $video->view       = (int) ($r->sort_order ?? 0);
        if($r->created_at){
          $video->created_at = $r->created_at;
        }
        $video->status      = $r->status ? 'active' : 'inactive';
        $video->editedby_id = Auth::id();
        $video->save();

        if($r->hasFile('image')){
          // uploadFile() replaces the existing thumbnail
          uploadFile($r->image,$video->id,1,1,Auth::id());
        }

        Session()->flash('success','Your Are Successfully Updated');
        return redirect()->back();
      }

      if($action=='delete'){
        $this->deleteVideo($video);
        Session()->flash('success','Your Are Successfully Deleted!');
        return redirect()->route('admin.videos');
      }

      return view(adminTheme().'videos.videoEdit',compact('video'));
    }
}
