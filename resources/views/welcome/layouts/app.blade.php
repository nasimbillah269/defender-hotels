<!DOCTYPE html>
<html lang="en-US">
    <head>
        
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <!-- Required meta tags -->
        <meta charset="utf-8" />
        <meta http-equiv="x-ua-compatible" content="ie=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <!-- CSRF Token -->
        <meta name="csrf-token" content="{{csrf_token()}}" />
        @yield('title')
        <!-- Favicon -->
        <link rel="shortcut icon" type="image/x-icon" href="{{asset(general()->favicon())}}" />
        @yield('SEO')
        <!-- Google Font CDN-->
        <link href="https://fonts.googleapis.com/css?family=Source Code Pro" rel="stylesheet" />
        
        <link rel="stylesheet" type="text/css" href="{{asset(assetLink().'/css/demo.css')}}" />
        
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Poppins&display=swap" rel="stylesheet">

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Lato&display=swap" rel="stylesheet" />
        
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Raleway:200,300,400,600,700" />

        <!-- Bootstrap CS CDN -->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" />
        <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">

        <!-- Font Awesome CSS CDN-->
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
        
        <!-- Slick Slider CSS CDN-->
        <link rel="stylesheet" type="text/css" href="{{asset(assetLink().'/css/slick.css')}}" />
        <link rel="stylesheet" type="text/css" href="{{asset(assetLink().'/css/slick-theme.css')}}" />
        
        <link rel="stylesheet" type="text/css" href="{{asset(assetLink().'/css/fancybox.css')}}" />

        <!-- Matis Menus CSS -->
        <link rel="stylesheet" href="{{asset(assetLink().'/css/metisMenu.css')}}" />
        
        <link rel="stylesheet" type="text/css" href="{{asset(assetLink().'/css/style.css')}}" />
        
        @stack('css')
    </head>
    
    <body>
        
        <div id="myOverlay" class="overlay">
            <span class="closebtn" onclick="closeSearch()" title="Close Overlay">×</span>
            <div class="overlay-content">
                <form action="{{route('blogSearch')}}">
                    <input type="text" name="search" value="{{request()->search}}" placeholder="Search" title="Search for." />
                    <button type="submit"><i class="fa fa-search"></i></button>
                </form>
            </div>
        </div>
        
        <body class="theme-default">
            <div id="container">
                <header>
                    <div class="wrapper cf">
                        @if(menu('Header Menus'))
                        <nav id="main-nav">
                            <ul class="first-nav">
                                @foreach(menu('Header Menus')->subMenus as $menu)
                                <li class="devices">
                                    
                                    @if($menu->subMenus->count() > 0)
                                    <span>{{$menu->menuName()}}</span>
                                    <ul>
                                        @foreach($menu->subMenus as $menu)
                                        <li class="mobile">
                                            <a href="{{asset($menu->menuLink())}}">{{$menu->menuName()}}</a>
                                            
                                            @if($menu->subMenus->count() > 0)
                                            <ul>
                                                @foreach($menu->subMenus as $menu)
                                                <li><a href="{{asset($menu->menuLink())}}">{{$menu->menuName()}}</a></li>
                                                @endforeach
                                            </ul>
                                            @endif
                                            
                                        </li>
                                        @endforeach
                                    </ul>
                                    @else
                                    <a href="{{asset($menu->menuLink())}}">{{$menu->menuName()}}</a>
                                    @endif
                                    
                                </li>
                                @endforeach
                            </ul>
                        </nav>
                        @endif
                        <a class="toggle" href="#">
                            <span></span>
                        </a>
                    </div>
                </header>
            </div>
        </body>
        
        <!--Header Part Include Start-->
        @include(welcomeTheme().'layouts.header')

        <!--Main Content Section Start-->
        <div class="main-content">
        @yield('contents')
        </div>
        <!--Main Content Section End-->
        
        <!--Footer Part Include Start-->
        @include(welcomeTheme().'layouts.footer')
        
        
        <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
        <script src="{{asset(assetLink().'/js/hc-offcanvas-nav.js')}}"></script>
        
        <!-- Bootstrap Script  CDN-->
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
        <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
        <!--iconify Script CDN-->
        <script src="https://code.iconify.design/1/1.0.7/iconify.min.js"></script>
        <!-- Sweet Alert CDN -->
        <script src="//cdn.jsdelivr.net/npm/sweetalert2@10"></script>

        <!-- Metis Menus Script -->
        <script src="{{asset(assetLink().'/js/metisMenu.min.js')}}"></script>

        <!-- Slick slider CDN -->
        <script type="text/javascript" src="{{asset(assetLink().'/js/slick.min.js')}}"></script>

        <!-- Custom Script for this Design -->
        <script src="{{asset(assetLink().'/js/myjquery.js')}}"></script>
        
        <script>
            (function ($) {
                "use strict";

                // call our plugin
                var Nav = new hcOffcanvasNav("#main-nav", {
                    disableAt: false,
                    customToggle: ".toggle",
                    levelSpacing: 40,
                    navTitle: "Main Menu",
                    levelTitles: true,
                    levelTitleAsBack: true,
                    pushContent: false,
                    labelClose: false,
                });

                // add new items to original nav
                $("#main-nav")
                    .find("li.add")
                    .children("a")
                    .on("click", function () {
                        var $this = $(this);
                        var $li = $this.parent();
                        var items = eval("(" + $this.attr("data-add") + ")");

                        $li.before('<li class="new"><a href="#">' + items[0] + "</a></li>");

                        items.shift();

                        if (!items.length) {
                            $li.remove();
                        } else {
                            $this.attr("data-add", JSON.stringify(items));
                        }

                        Nav.update(true); // update DOM
                    });

                // demo settings update

                const update = function (settings) {
                    if (Nav.isOpen()) {
                        Nav.on("close.once", function () {
                            Nav.update(settings);
                            Nav.open();
                        });

                        Nav.close();
                    } else {
                        Nav.update(settings);
                    }
                };

                $(".actions")
                    .find("a")
                    .on("click", function (e) {
                        e.preventDefault();

                        var $this = $(this).addClass("active");
                        var $siblings = $this.parent().siblings().children("a").removeClass("active");
                        var settings = eval("(" + $this.data("demo") + ")");

                        if ("theme" in settings) {
                            $("body")
                                .removeClass()
                                .addClass("theme-" + settings["theme"]);
                        } else {
                            update(settings);
                        }
                    });

                $(".actions")
                    .find("input")
                    .on("change", function () {
                        var $this = $(this);
                        var settings = eval("(" + $this.data("demo") + ")");

                        if ($this.is(":checked")) {
                            update(settings);
                        } else {
                            var removeData = {};
                            $.each(settings, function (index, value) {
                                removeData[index] = false;
                            });

                            update(removeData);
                        }
                    });
            })(jQuery);
        </script>

        <script>
            $(document).ready(function(){

            $("#division").on("change", function(){
                var id = $(this).val();
                  if(id==''){
                   $('#district').empty().append('<option value="">No District</option>');
                   $('#city').empty().append('<option value="">No City</option>');
                  }
                  var url ='{{url('geo/filter')}}' + '/'+id;
                  $.get(url,function(data){
                    $('#district').empty().append(data.geoData);
                    $('#city').empty().append('<option value="">No City</option>');
                  });   
            });

            $("#district").on("change", function(){
                var id = $(this).val();
                  if(id==''){
                   $('#city').empty().append('<option value="">No City</option>');
                  }
                  var url ='{{url('geo/filter')}}' + '/'+id;
                  $.get(url,function(data){
                    $('#city').empty().append(data.geoData);  
                  });   
            });
            
        });
        </script>
        
        <script>
            $(document).on('click','.subsriberbtm',function(e){
              e.preventDefault();
               var url = $('#subscirbeForm').data('url');
               var subscribeEmail =$('#subscribeEmail').val();
                    $.ajax({
                      url: url,
                      type: 'POST',
                      dataType: 'json',
                       data: {email : subscribeEmail},
                      cache: false,
        
                    })
                    .done(function(data) {
                        if(data.success)
                          {
                            $("#subscribeemailMsg").html("<p style='color: #f6f6f6;background: #009688;margin: 5px 0;padding: 4px 5px;border-radius: 4px;font-weight: bold;line-height: 14px;font-size: 12px;'>"+ data.message +"</p>");
                            $("#subscribeEmail").css("border","");
                            $("#subscirbeForm")[0].reset();
                          }else{
                            $("#subscribeemailMsg").html("<p style='color: #f6f6f6;background: #ff9800;margin: 5px 0;padding: 4px 5px;border-radius: 4px;font-weight: bold;line-height: 14px;font-size: 12px;'>"+ data.message +"</p>");
                          }
                    })
                    .fail(function() {
                      // alert("error");
                    });
        
            });
        
            $("#subscribeEmail").keyup(function(){
                  if(validateEmail()){
                      $("#subscribeEmail").css("border","2px solid green");
                      $("#subscribeemailMsg").html("<p style='color: #f6f6f6;background: #009688;margin: 5px 0;padding: 4px 5px;border-radius: 4px;font-weight: bold;line-height: 14px;font-size: 12px;'>Validated Email</p>");
                  }else{
                        var subscribeEmail=$("#subscribeEmail").val();
                       if(subscribeEmail==''||subscribeEmail==null || subscribeEmail=='undefined'){
                            $("#subscribeemailMsg").html("<p style='color: white;background: red;margin: 5px 0;padding: 4px 5px;border-radius: 4px;font-weight: bold;line-height: 14px;font-size: 12px;'>Please Get a Verified Email</p>");
                        }else{
                          $("#subscribeEmail").css("border","2px solid red");
                          $("#subscribeemailMsg").html("");
                        }
                  }
              });
        
            function validateEmail(){
                  var subscribeEmail=$("#subscribeEmail").val();
        
                   var reg =/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
                   if(reg.test(subscribeEmail)){
                      return true;
                   }else{
                      return false;
              }
        
            }
        </script>
        
        <script>
            function openSearch() {
              document.getElementById("myOverlay").style.display = "block";
            }
            
            function closeSearch() {
              document.getElementById("myOverlay").style.display = "none";
            }
        </script>
        
        <script>
            (function ($) {
                "use strict";

                // call our plugin
                var Nav = new hcOffcanvasNav("#main-nav", {
                    disableAt: false,
                    customToggle: ".toggle",
                    levelSpacing: 40,
                    navTitle: "Main Menu",
                    levelTitles: true,
                    levelTitleAsBack: true,
                    pushContent: false,
                    labelClose: false,
                });

                // add new items to original nav
                $("#main-nav")
                    .find("li.add")
                    .children("a")
                    .on("click", function () {
                        var $this = $(this);
                        var $li = $this.parent();
                        var items = eval("(" + $this.attr("data-add") + ")");

                        $li.before('<li class="new"><a href="#">' + items[0] + "</a></li>");

                        items.shift();

                        if (!items.length) {
                            $li.remove();
                        } else {
                            $this.attr("data-add", JSON.stringify(items));
                        }

                        Nav.update(true); // update DOM
                    });

                // demo settings update

                const update = function (settings) {
                    if (Nav.isOpen()) {
                        Nav.on("close.once", function () {
                            Nav.update(settings);
                            Nav.open();
                        });

                        Nav.close();
                    } else {
                        Nav.update(settings);
                    }
                };

                $(".actions")
                    .find("a")
                    .on("click", function (e) {
                        e.preventDefault();

                        var $this = $(this).addClass("active");
                        var $siblings = $this.parent().siblings().children("a").removeClass("active");
                        var settings = eval("(" + $this.data("demo") + ")");

                        if ("theme" in settings) {
                            $("body")
                                .removeClass()
                                .addClass("theme-" + settings["theme"]);
                        } else {
                            update(settings);
                        }
                    });

                $(".actions")
                    .find("input")
                    .on("change", function () {
                        var $this = $(this);
                        var settings = eval("(" + $this.data("demo") + ")");

                        if ($this.is(":checked")) {
                            update(settings);
                        } else {
                            var removeData = {};
                            $.each(settings, function (index, value) {
                                removeData[index] = false;
                            });

                            update(removeData);
                        }
                    });
            })(jQuery);
        </script>
        
        @stack('js')
        
        
    </body>
</html>
