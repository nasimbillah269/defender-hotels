@extends(adminTheme().'layouts.app') @section('title')
<title>{{websiteTitle('Donor Edit')}}</title>
@endsection @push('css')

<style type="text/css">
    .catagorydiv {
        max-height: 300px;
        overflow: auto;
    }
    .catagorydiv ul {
        padding-left: 20px;
    }
    .catagorydiv ul li {
        list-style: none;
    }
    .person {
        border: 1px solid #ebe7e7;
        border-radius: 5px;
        padding: 10px;
    }
    .textInfo {
        height: 60px;
        overflow: hidden;
    }
    .person .image {
        height: 150px;
        background-position: center;
        background-size: contain;
        background-repeat: no-repeat;
    }
</style>
@endpush @section('contents')

<div class="content-header row">
    <div class="content-header-left col-md-6 col-12 mb-2">
        <h3 class="content-header-title mb-0">Donor Edit</h3>
        <div class="row breadcrumbs-top">
            <div class="breadcrumb-wrapper col-12">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="{{route('admin.dashboard')}}">Dashboard </a></li>
                    <li class="breadcrumb-item active">Donor Edit</li>
                </ol>
            </div>
        </div>
    </div>
    <div class="content-header-right col-md-6 col-12 mb-md-0 mb-2">
        <div class="btn-group float-md-right" role="group" aria-label="Button group with nested dropdown">
            <a class="btn btn-outline-primary" href="{{route('admin.services')}}">BACK</a>
            <a class="btn btn-outline-primary" href="javascript:void(0)">
                <i class="fa-solid fa-rotate"></i>
            </a>
        </div>
    </div>
</div>

<div class="content-body">
    <!-- Basic Elements start -->
    <section class="basic-elements">
        @include('admin.alerts')
        <form action="{{route('admin.servicesAction',['update',$service->id])}}" method="post" enctype="multipart/form-data">
            @csrf
            <div class="row">
                <div class="col-md-8">
                    <div class="card">
                        <div class="card-header" style="border-bottom: 1px solid #e3ebf3;">
                            <h4 class="card-title">Donor Edit</h4>
                        </div>
                        <div class="card-content">
                            <div class="card-body">
                                <div class="form-group">
                                    <label for="name">Donor Name* </label>
                                    <input type="text" class="form-control {{$errors->has('name')?'error':''}}" name="name" placeholder="Enter Post Name" value="{{$service->name?:old('name')}}" required="" />
                                    @if ($errors->has('name'))
                                    <p style="color: red; margin: 0; font-size: 10px;">{{ $errors->first('name') }}</p>
                                    @endif
                                </div>
                                <div class="form-group">
                                    <label for="address">Address*</label>
                                    <input type="text" class="form-control {{$errors->has('address')?'error':''}}" name="address" placeholder="Enter address" value="{{$service->short_description?:old('address')}}" required="" />
                                    @if ($errors->has('address'))
                                    <p style="color: red; margin: 0; font-size: 10px;">{{ $errors->first('address') }}</p>
                                    @endif
                                </div>
                                <div class="form-group">
                                    <label for="description">Description </label>
                                    <textarea name="description" class="{{$errors->has('description')?'error':''}} summernote" placeholder="Enter Description">{!!$service->description!!}</textarea>
                                    @if ($errors->has('description'))
                                    <p style="color: red; margin: 0; font-size: 10px;">{{ $errors->first('description') }}</p>
                                    @endif
                                </div>
                                <div class="row">
                                    <div class="col-md-6 form-group">
                                        <label for="share_price">Share Price</label>
                                    <input type="number" class="form-control {{$errors->has('share_price')?'error':''}}" name="share_price" placeholder="Enter  Price" value="{{$service->share_price?:old('share_price')}}"  />
                                    @if ($errors->has('share_price'))
                                    <p style="color: red; margin: 0; font-size: 10px;">{{ $errors->first('share_price') }}</p>
                                    @endif
                                    </div>
                                    <div class="col-md-6 form-group">
                                        <label for="share_quantity">Share Quantity</label>
                                    <input type="number" class="form-control {{$errors->has('share_quantity')?'error':''}}" name="share_quantity" placeholder="Enter  Quantity" value="{{$service->share_quantity?:old('share_quantity')}}"  />
                                    @if ($errors->has('share_quantity'))
                                    <p style="color: red; margin: 0; font-size: 10px;">{{ $errors->first('share_quantity') }}</p>
                                    @endif
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-header" style="border-bottom: 1px solid #e3ebf3;">
                            <h4 class="card-title">SEO Optimize</h4>
                        </div>
                        <div class="card-content">
                            <div class="card-body">
                                <div class="form-group">
                                    <label for="seo_title">SEO Meta Title</label>
                                    <input type="text" class="form-control {{$errors->has('seo_title')?'error':''}}" name="seo_title" placeholder="Enter SEO Meta Title" value="{{$service->seo_title?:old('seo_title')}}" />
                                    @if ($errors->has('seo_title'))
                                    <p style="color: red; margin: 0; font-size: 10px;">{{ $errors->first('seo_title') }}</p>
                                    @endif
                                </div>
                                <div class="form-group">
                                    <label for="seo_desc">SEO Meta Description </label>
                                    <textarea name="seo_desc" class="form-control {{$errors->has('seo_desc')?'error':''}}" placeholder="Enter SEO Meta Description">{!!$service->seo_desc!!}</textarea>
                                    @if ($errors->has('seo_desc'))
                                    <p style="color: red; margin: 0; font-size: 10px;">{{ $errors->first('seo_desc') }}</p>
                                    @endif
                                </div>
                                <div class="form-group">
                                    <label for="seo_keyword">SEO Meta Keyword </label>
                                    <textarea name="seo_keyword" class="form-control {{$errors->has('seo_keyword')?'error':''}}" placeholder="Enter SEO Meta Keyword">{!!$service->seo_keyword!!}</textarea>
                                    @if ($errors->has('seo_keyword'))
                                    <p style="color: red; margin: 0; font-size: 10px;">{{ $errors->first('seo_keyword') }}</p>
                                    @endif
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-md-4">
                    <div class="card">
                        <div class="card-header" style="border-bottom: 1px solid #e3ebf3;">
                            <h4 class="card-title">Donor Images</h4>
                        </div>
                        <div class="card-content">
                            <div class="card-body">
                                <div class="form-group">
                                    <label for="image">Donor Image</label>
                                    <input type="file" name="image" class="form-control {{$errors->has('image')?'error':''}}" />
                                    @if ($errors->has('image'))
                                    <p style="color: red; margin: 0; font-size: 10px;">{{ $errors->first('image') }}</p>
                                    @endif
                                </div>
                                <div class="form-group">
                                    <img src="{{asset($service->image())}}" style="max-width: 100px;" />
                                    @isset(json_decode(Auth::user()->permission->permission, true)['services']['add'])
                                    @if($service->imageFile)
                                    <a href="{{route('admin.mediesDelete',$service->imageFile->id)}}" class="mediaDelete" style="color: red;"><i class="fa fa-trash"></i></a>
                                    @endif
                                    @endisset
                                </div>
                                <div class="form-group">
                                    <label for="gallery_image">Donor Gallery</label>
                                    <input type="file" name="gallery_image[]" class="form-control {{$errors->has('gallery_image')?'error':''}}"  multiple="" />
                                    @if ($errors->has('gallery_image'))
                                    <p style="color: red; margin: 0; font-size: 10px;">{{ $errors->first('gallery_image') }}</p>
                                    @endif
                                </div>
                                <div class="row">
                                    @foreach($service->galleryFiles as $galley)
                                    <div class="col-md-4 form-group">
                                    <img src="{{asset($galley->file_url)}}" style="max-width: 60px;max-height: 60px" />

                                    @isset(json_decode(Auth::user()->permission->permission, true)['services']['add'])
                                    <a href="{{route('admin.mediesDelete',$galley->id)}}" class="mediaDelete" style="color: red;"><i class="fa fa-trash"></i></a>
                                    @endisset
                                    </div>
                                    @endforeach
                                    
                                </div>
                                
                            </div>
                        </div>
                    </div>

                    <div class="card">
                        <div class="card-header" style="border-bottom: 1px solid #e3ebf3;">
                            <h4 class="card-title">Donor Category</h4>
                        </div>
                        <div class="card-content">
                            <div class="card-body">
                                @if ($errors->has('categoryid*'))
                                <p style="color: red; margin: 0; font-size: 10px;">The Category Must Be a Number</p>
                                @endif
                                <div class="catagorydiv">
                                    <ul>
                                        @foreach($categories as $ctg)
                                        <li>
                                            <div class="custom-control custom-checkbox">
                                                <input type="checkbox" class="custom-control-input" value="{{$ctg->id}}" id="category_{{$ctg->id}}" name="categoryid[]" @foreach($service->serviceCtgs as $postctg)
                                                {{$postctg->reff_id==$ctg->id?'checked':''}} @endforeach/>
                                                <label class="custom-control-label" for="category_{{$ctg->id}}">{{$ctg->name}}</label>
                                            </div>
                                            @if($ctg->subCtgs->count() >0) @include('admin.services.includes.servicesEditSubctg',['subcategories' => $ctg->subCtgs,'i'=>1]) @endif
                                        </li>
                                        @endforeach
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div class="card">
                        <div class="card-header" style="border-bottom: 1px solid #e3ebf3;">
                            <h4 class="card-title">Donor Action</h4>
                        </div>
                        <div class="card-content">
                            <div class="card-body">
                                <div class="row">
                                    <div class="form-group col-6">
                                        <label for="status">Donor Status</label>
                                        <select name="status" class="form-control">
                                            <option value="">Select Status</option>
                                            <option value="pending" {{$service->status=='pending'?'selected':''}} >Pending</option>
                                            <option value="active" {{$service->status=='active'?'selected':''}}>Active</option>
                                            <option value="proceeding" {{$service->status=='proceeding'?'selected':''}}>Proceeding</option>
                                            <option value="completed" {{$service->status=='completed'?'selected':''}}>Completed</option>
                                            <option value="cancelled" {{$service->status=='cancelled'?'selected':''}}>Cancelled</option>
                                        </select>

                                        {{-- <div class="custom-control custom-checkbox">
                                            <input type="checkbox" class="custom-control-input" id="status" name="status" {{$service->status=='active'?'checked':''}}/>
                                            <label class="custom-control-label" for="status">Active</label>
                                        </div> --}}
                                    </div>
                                    <div class="form-group col-6">
                                        <label for="fetured">Donor Fetured</label>
                                        <div class="custom-control custom-checkbox">
                                            <input type="checkbox" class="custom-control-input" id="fetured" name="fetured" {{$service->fetured?'checked':''}}/>
                                            <label class="custom-control-label" for="fetured">Active</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label>Published Date</label>
                                    <input type="date" class="form-control form-control-sm" name="created_at" value="{{$service->created_at->format('Y-m-d')}}">
                                    @if ($errors->has('created_at'))
                                    <p style="color: red; margin: 0; font-size: 10px;">{{ $errors->first('created_at') }}</p>
                                    @endif
                                </div>
                                @isset(json_decode(Auth::user()->permission->permission, true)['services']['add'])
                                <button type="submit" class="btn btn-primary mr-sm-1 mb-1 mb-sm-0">Save changes</button>
                                @endisset
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </section>
    <!-- Basic Inputs end -->
</div>


@endsection @push('js')

<script>
    $(".summernote").summernote({
        placeholder: "Hello stand alone ui",
        tabsize: 2,
        height: 120,
        toolbar: [
            ["style", ["style"]],
            ["font", ["bold", "underline"]],
            ["color", ["color"]],
            ["para", ["ul", "ol", "paragraph"]],
            ["table", ["table"]],
            ["insert", ["link", "picture"]],
            ["view", ["fullscreen", "codeview"]],
        ],
    });
</script>

@endpush
