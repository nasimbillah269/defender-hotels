@extends(adminTheme().'layouts.app')
@section('title')
<title>{{websiteTitle('Videos List')}}</title>
@endsection

@section('contents')

<div class="content-header row">
    <div class="content-header-left col-md-6 col-12 mb-2">
        <h3 class="content-header-title mb-0">Videos List</h3>
        <div class="row breadcrumbs-top">
            <div class="breadcrumb-wrapper col-12">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="{{route('admin.dashboard')}}">Dashboard </a></li>
                    <li class="breadcrumb-item active">Videos List</li>
                </ol>
            </div>
        </div>
    </div>
    <div class="content-header-right col-md-6 col-12 mb-md-0 mb-2">
        <div class="btn-group float-md-right" role="group">
            @isset(json_decode(Auth::user()->permission->permission, true)['posts']['add'])
            <a class="btn btn-outline-primary" href="{{route('admin.videosAction',['create'])}}">Add Video</a>
            @endisset
            <a class="btn btn-outline-primary" href="{{route('admin.videos')}}"><i class="fa-solid fa-rotate"></i></a>
        </div>
    </div>
</div>

<div class="content-body">
    <section id="basic-form-layouts">
        <div class="row match-height">
            <div class="col-md-12">
                @include(adminTheme().'alerts')

                <div class="card">
                    <div class="card-content">
                        <div class="card-body">
                            <form action="{{route('admin.videos')}}">
                                <div class="row">
                                    <div class="col-md-8 mb-1">
                                        <input type="text" name="search" value="{{request()->search}}" placeholder="Video Title" class="form-control" />
                                    </div>
                                    <div class="col-md-4 mb-1">
                                        <button type="submit" class="btn btn-success btn-block">Search</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header" style="border-bottom: 1px solid #e3ebf3;">
                        <h4 class="card-title">Videos List</h4>
                    </div>
                    <div class="card-content">
                        <div class="card-body">
                            <form action="{{route('admin.videos')}}">
                                <div class="row">
                                    <div class="col-md-4">
                                        <div class="input-group mb-1">
                                            <select class="form-control form-control-sm" name="action" required="">
                                                <option value="">Select Action</option>
                                                <option value="1">Active</option>
                                                <option value="2">Inactive</option>
                                                @isset(json_decode(Auth::user()->permission->permission, true)['posts']['delete'])
                                                <option value="5">Delete</option>
                                                @endisset
                                            </select>
                                            <button class="btn btn-sm btn-primary" onclick="return confirm('Are You Want To Action?')">Action</button>
                                        </div>
                                    </div>
                                    <div class="col-md-8">
                                        <ul class="statuslist">
                                            <li><a href="{{route('admin.videos')}}">All ({{$totals->total}})</a></li>
                                            <li><a href="{{route('admin.videos',['status'=>'active'])}}">Active ({{$totals->active}})</a></li>
                                            <li><a href="{{route('admin.videos',['status'=>'inactive'])}}">Inactive ({{$totals->inactive}})</a></li>
                                        </ul>
                                    </div>
                                </div>

                                <div class="table-responsive">
                                    <table class="table table-striped table-bordered table-hover">
                                        <thead>
                                            <tr>
                                                <th style="min-width: 60px;">
                                                    <label style="cursor: pointer; margin-bottom: 0;"><input class="checkbox" type="checkbox" id="checkall" /> All</label>
                                                </th>
                                                <th style="min-width: 260px;">Video Title</th>
                                                <th style="min-width: 90px;">Thumbnail</th>
                                                <th style="min-width: 220px;">Video Link</th>
                                                <th style="min-width: 60px;">Order</th>
                                                <th style="min-width: 100px;">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            @forelse($videos as $i=>$video)
                                            <tr>
                                                <td>
                                                    <input class="checkbox" type="checkbox" name="checkid[]" value="{{$video->id}}" /><br />
                                                    {{$videos->firstItem()+$i}}
                                                </td>
                                                <td>
                                                    {{$video->name}}<br />
                                                    @if($video->status=='active')
                                                    <span class="badge badge-success">Active</span>
                                                    @else
                                                    <span class="badge badge-danger">Inactive</span>
                                                    @endif
                                                    <span><i class="fa fa-calendar" style="color: #1ab394;"></i> {{$video->created_at->format('d-m-Y')}}</span>
                                                </td>
                                                <td style="padding: 5px; text-align: center;">
                                                    <img src="{{asset($video->image())}}" style="max-width: 60px; max-height: 80px;" />
                                                </td>
                                                <td style="word-break: break-all;">
                                                    @if($video->search_key)
                                                    <a href="{{$video->search_key}}" target="_blank" rel="noopener">{{Str::limit($video->search_key, 60)}}</a>
                                                    @else
                                                    <span class="text-danger">No link</span>
                                                    @endif
                                                </td>
                                                <td>{{$video->view}}</td>
                                                <td style="padding: 5px; text-align: center;">
                                                    <a href="{{route('admin.videosAction',['edit',$video->id])}}" class="btn btn-sm btn-info">Edit</a>
                                                    @isset(json_decode(Auth::user()->permission->permission, true)['posts']['delete'])
                                                    <a href="{{route('admin.videosAction',['delete',$video->id])}}" onclick="return confirm('Are You Want To Delete?')" class="btn btn-sm btn-danger"><i class="fa fa-trash"></i></a>
                                                    @endisset
                                                </td>
                                            </tr>
                                            @empty
                                            <tr><td colspan="6" class="text-center">No videos yet. Click "Add Video" to create one.</td></tr>
                                            @endforelse
                                        </tbody>
                                    </table>
                                    {{$videos->links('pagination')}}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>

@endsection
