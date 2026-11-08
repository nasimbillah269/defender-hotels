<header class="sticky-header">
    <div class="top-header">
        <div class="container">
            <div class="row">
                <div class="col-lg-4 col-md-5">
                    <div class="top-left-header">
                        <ul>
                            <li><a href="javascript:void();">Follow on</a></li>
                            @if(general()->facebook_link)
                            <li><a href="{{general()->facebook_link}}"><i class="fa fa-facebook"></i></a></li>
                            @endif
                            @if(general()->twitter_link)
                            <li><a href="{{general()->twitter_link}}"><i class="fa fa-twitter"></i></a></li>
                            @endif
                            @if(general()->instagram_link)
                            <li><a href="{{general()->instagram_link}}"><i class="fa fa-instagram"></i></a></li>
                            @endif
                            @if(general()->linkedin_link)
                            <li><a href="{{general()->linkedin_link}}"><i class="fa fa-linkedin"></i></a></li>
                            @endif
                            @if(general()->youtube_link)
                            <li><a href="{{general()->youtube_link}}"><i class="fa fa-youtube-play"></i></a></li>
                            @endif
                            @if(general()->pinterest_link)
                            <li><a href="{{general()->pinterest_link}}"><i class="fa fa-pinterest-p"></i></a></li>
                            @endif
                        </ul>
                    </div>
                </div>
                <div class="col-lg-8 col-md-7">
                    <div class="top-right-header">
                        <ul>
                            <li><a href="tel:{{general()->mobile}}"><i class="fa fa-phone"></i>  {{general()->mobile}}</a></li>
                            <li><a href="mailto:{{general()->email}}"><i class="fa fa-envelope-o"></i> {{general()->email}}</a></li>
                            <li><a href="#"><i class="fa fa-clock-o"></i> Mon – Fri: 8.00 – 18.00</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <div class="main-header">
        <div class="container">
            <div class="row">
                <div class="col-lg-2 col-md-3 col-sm-6 col-8">
                    <div class="logo">
                        <a href="{{route('index')}}"><img src="{{asset(general()->logo())}}" alt="{{general()->title}}"></a>
                    </div>
                </div>
                <div class="col-md-7 header-menu-section">
                    <div class="header-menu">
                    @if($menu = menu('Header Menus'))
                        <ul>
                            @foreach($menu->subMenus as $menu)
                            <li><a href="{{asset($menu->menuLink())}}">{{$menu->menuName()}}</a> </li>
                            @endforeach
                        </ul>
                    @endif
                    </div>
                </div>
                <div class="col-lg-3 col-md-9 col-sm-6 col-4">
                    <span class="searchBtn openBtn" onclick="openSearch()"><i class="fa fa-search"></i></span>
                    
                    @if($cPage =pageTemplate('Contact Us'))
                    <a href="{{route('pageView',$cPage->slug?:'no-title')}}" class="btn getQuote">Get A Quote <i class="fa fa-angle-double-right"></i></a>
                    @endif
                </div>
            </div>
        </div>
    </div>
</header>