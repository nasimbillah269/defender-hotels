@extends(welcomeTheme().'layouts.app') @section('title')
<title>{{websiteTitle($service->seo_title?:$service->name)}}</title>
@endsection @section('SEO')
<meta name="title" property="og:title" content="{{$service->seo_title?:$service->name.' | '.general()->title}}" />
<meta name="description" property="og:description" content="{!!$service->seo_desc?:$service->name.' '.general()->meta_description!!}" />
<meta name="keywords" content="{{$service->seo_keyword?:$service->name.' '.general()->meta_keyword}}" />
<meta name="image" property="og:image" content="{{asset($service->image())}}" />
<meta name="url" property="og:url" content="{{route('serviceView',$service->slug?:Str::slug($service->name))}}" />
<link rel="canonical" href="{{route('serviceView',$service->slug?:Str::slug($service->name))}}">
@endsection 
@push('css')
@endpush 
@section('contents')

<div class="breadcrumb-area">
    <div class="container">
        <div class="title">
            <h1>{{$service->name}}</h1>
            <ul>
                <li><a href="{{route('index')}}">Home</a></li>
                <li>{{$service->name}}</li>
            </ul>
        </div>
    </div>
</div>

<div class="blogCompany">
    <div class="container">
        <div class="pageContent">
            {!!$service->description!!}
        </div>
    </div>
</div>

@endsection 
@push('js')@endpush