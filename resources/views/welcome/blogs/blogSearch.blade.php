@extends(welcomeTheme().'layouts.app') @section('title')
<title>{{websiteTitle('Search')}}</title>
@endsection @section('SEO')
<meta name="title" property="og:title" content="{{websiteTitle('Search')}}" />
        <meta name="description" property="og:description" content="{!!general()->meta_description!!}" />
        <meta name="keywords" content="{{general()->meta_keyword}}" />
        <meta name="image" property="og:image" content="{{asset(general()->logo())}}" />
        <meta name="url" property="og:url" content="{{route('blogSearch')}}" />
        <link rel="canonical" href="{{route('blogSearch')}}">
@endsection @push('css')
<style>

</style>
@endpush 

@section('contents')

<div class="breadcrumb-area">
    <div class="container">
        <div class="title">
            <h1>Search: {{request()->search}}</h1>
            <ul>
                <li><a href="{{route('index')}}">Home</a></li>
                <li>{{request()->search}}</li>
            </ul>
        </div>
    </div>
</div>

<div class="blogCompany">
    <div class="container">
		<div class="row">
		<div class="col-lg-8 col-md-7 col-sm-12 col-xs-12">
            <div class="row">
                @foreach($posts as $post)
                <div class="col-md-6">
                    @include(welcomeTheme().'blogs.includes.blogGrid')
                </div>
                @endforeach
            </div>
			<!-- pagination -->
			{{$posts->links(welcomeTheme().'blogs.pagination')}}
		</div>
		<div class="col-lg-4 col-md-5  col-sm-12 col-xs-12">
			@include(welcomeTheme().'blogs.includes.sideBar')
		</div>
		</div>
	</div>
</div>

@endsection 
@push('js') @endpush