@extends(adminTheme().'layouts.app')
@section('title')
<title>{{websiteTitle('Video Edit')}}</title>
@endsection

@section('contents')

<div class="content-header row">
    <div class="content-header-left col-md-6 col-12 mb-2">
        <h3 class="content-header-title mb-0">Video Edit</h3>
        <div class="row breadcrumbs-top">
            <div class="breadcrumb-wrapper col-12">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="{{route('admin.dashboard')}}">Dashboard </a></li>
                    <li class="breadcrumb-item"><a href="{{route('admin.videos')}}">Videos</a></li>
                    <li class="breadcrumb-item active">Video Edit</li>
                </ol>
            </div>
        </div>
    </div>
    <div class="content-header-right col-md-6 col-12 mb-md-0 mb-2">
        <div class="btn-group float-md-right" role="group">
            <a class="btn btn-outline-primary" href="{{route('admin.videos')}}">BACK</a>
            @isset(json_decode(Auth::user()->permission->permission, true)['posts']['add'])
            <a class="btn btn-outline-primary" href="{{route('admin.videosAction',['create'])}}">Add Video</a>
            @endisset
        </div>
    </div>
</div>

<div class="content-body">
    <section class="basic-elements">
        @include(adminTheme().'alerts')
        <form action="{{route('admin.videosAction',['update',$video->id])}}" method="post" enctype="multipart/form-data">
            @csrf
            <div class="row">
                <div class="col-md-8">
                    <div class="card">
                        <div class="card-header" style="border-bottom: 1px solid #e3ebf3;">
                            <h4 class="card-title">Video Details</h4>
                        </div>
                        <div class="card-content">
                            <div class="card-body">
                                <div class="form-group">
                                    <label for="name">Video Title *</label>
                                    <input type="text" id="name" class="form-control {{$errors->has('name')?'error':''}}" name="name" placeholder="Enter video title" value="{{old('name', $video->name)}}" required />
                                    @if ($errors->has('name'))
                                    <p style="color: red; margin: 0; font-size: 10px;">{{ $errors->first('name') }}</p>
                                    @endif
                                </div>

                                <div class="form-group">
                                    <label for="video_link">YouTube Video Link *</label>
                                    <input type="text" id="video_link" class="form-control {{$errors->has('video_link')?'error':''}}" name="video_link" placeholder="https://www.youtube.com/watch?v=XXXXXXXXXXX" value="{{old('video_link', $video->search_key)}}" required />
                                    <small class="text-muted">YouTube link (watch, youtu.be or shorts) — a direct .mp4 URL also works.</small>
                                    @if ($errors->has('video_link'))
                                    <p style="color: red; margin: 0; font-size: 10px;">{{ $errors->first('video_link') }}</p>
                                    @endif
                                </div>

                                <div class="form-group" id="yt-preview-wrap" style="display:none;">
                                    <label>Preview</label>
                                    <div style="max-width: 420px; aspect-ratio: 16/9; background:#000;">
                                        <iframe id="yt-preview" style="width:100%;height:100%;border:0;" allowfullscreen></iframe>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-md-4">
                    <div class="card">
                        <div class="card-header" style="border-bottom: 1px solid #e3ebf3;">
                            <h4 class="card-title">Thumbnail Image</h4>
                        </div>
                        <div class="card-content">
                            <div class="card-body">
                                <div class="form-group">
                                    <input type="file" name="image" accept="image/*" class="form-control {{$errors->has('image')?'error':''}}" />
                                    <small class="text-muted">Optional — leave empty to use the YouTube thumbnail. Portrait image recommended (9:16, e.g. 540×960).</small>
                                    @if ($errors->has('image'))
                                    <p style="color: red; margin: 0; font-size: 10px;">{{ $errors->first('image') }}</p>
                                    @endif
                                </div>
                                <div class="form-group">
                                    <img src="{{$video->videoThumb()}}" style="max-width: 120px; border-radius: 8px;" />
                                    @if($video->imageFile)
                                    <a href="{{route('admin.mediesDelete',$video->imageFile->id)}}" class="mediaDelete" style="color: red;"><i class="fa fa-trash"></i></a>
                                    @endif
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="card">
                        <div class="card-header" style="border-bottom: 1px solid #e3ebf3;">
                            <h4 class="card-title">Video Action</h4>
                        </div>
                        <div class="card-content">
                            <div class="card-body">
                                <div class="form-group">
                                    <div class="custom-control custom-checkbox">
                                        <input type="checkbox" class="custom-control-input" id="status" name="status" {{$video->status=='active' || $video->status=='temp' ?'checked':''}} />
                                        <label class="custom-control-label" for="status">Active</label>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="sort_order">Display Order</label>
                                    <input type="number" min="0" id="sort_order" class="form-control form-control-sm" name="sort_order" value="{{old('sort_order', $video->view)}}" />
                                    <small class="text-muted">Lower number shows first.</small>
                                </div>
                                <div class="form-group">
                                    <label>Published Date</label>
                                    <input type="date" class="form-control form-control-sm" name="created_at" value="{{$video->created_at->format('Y-m-d')}}">
                                </div>
                                @isset(json_decode(Auth::user()->permission->permission, true)['posts']['add'])
                                <button type="submit" class="btn btn-primary">Save changes</button>
                                @endisset
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </section>
</div>

@endsection

@push('js')
<script>
    (function () {
        function ytId(url) {
            var m = String(url || '').match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/);
            return m ? m[1] : null;
        }
        function refresh() {
            var id = ytId(document.getElementById('video_link').value);
            var wrap = document.getElementById('yt-preview-wrap');
            var frame = document.getElementById('yt-preview');
            if (id) {
                var src = 'https://www.youtube.com/embed/' + id;
                if (frame.getAttribute('src') !== src) frame.setAttribute('src', src);
                wrap.style.display = '';
            } else {
                frame.removeAttribute('src');
                wrap.style.display = 'none';
            }
        }
        document.getElementById('video_link').addEventListener('input', refresh);
        refresh();
    })();
</script>
@endpush
