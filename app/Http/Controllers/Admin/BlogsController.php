<?php

namespace App\Http\Controllers\Admin;

/**
 * Blog posts (admin). Shares all list/edit logic and views with
 * PostsController (News & Events) – only the post type and routes differ.
 * Blog posts are stored in `posts` with type = 4.
 */
class BlogsController extends PostsController
{
    protected $postType = 4;

    protected function cfg(){
      return [
        'list'     => 'admin.blogs',
        'action'   => 'admin.blogsAction',
        'singular' => 'Blog',
        'plural'   => 'Blogs',
        'comments' => false,
      ];
    }

    public function blogs(\Illuminate\Http\Request $r){
      return $this->posts($r);
    }

    public function blogsAction(\Illuminate\Http\Request $r,$action,$id=null){
      return $this->postsAction($r,$action,$id);
    }
}
