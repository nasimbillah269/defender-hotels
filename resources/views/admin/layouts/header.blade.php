 <!-- BEGIN: Header-->
 <nav class="header-navbar navbar-expand-lg navbar navbar-with-menu fixed-top navbar-semi-dark navbar-shadow">
   <div class="navbar-wrapper">
     <div class="navbar-header">
       <ul class="nav navbar-nav flex-row">
         <li class="nav-item mobile-menu d-lg-none mr-auto"><a class="nav-link nav-menu-main menu-toggle hidden-xs" href="#">
          <!-- <i class="fa-2x fas fa-bars"></i> -->
          <i class="fa-2x fas fa-arrow-alt-circle-right"></i>
          </a>
          </li>
          <li class="nav-item mr-auto">
          <a class="navbar-brand" href="{{route('admin.dashboard')}}" title="{{ general()->title }}">
            <img class="adm-brand-logo" src="{{asset(general()->logo)}}" alt="{{ general()->title }}" />
           </a>
          </li>
         <li class="nav-item d-none d-lg-block nav-toggle"><a class="nav-link modern-nav-toggle pr-0" data-toggle="collapse"><i class="fas fa-bars"></i></a></li>
         <!-- <li class="nav-item d-lg-none"><a class="nav-link open-navbar-container" data-toggle="collapse" data-target="#navbar-mobile"><i class="fa fa-ellipsis-v"></i></a></li> -->
       </ul>
     </div>
     <div class="navbar-container content">
       <div class="collapse navbar-collapse" id="navbar-mobile">
         <ul class="nav navbar-nav mr-auto float-left">
           
           <li class="nav-item d-none d-md-block">
            <a class="nav-link nav-link-expand" href="#">
              <i class="fas fa-compress"></i>
            </a>
          </li>
          <li class="nav-item d-none d-md-block">
            <a href="{{route('index')}}" target="_blank" class="nav-link adm-visit"><i class="fas fa-globe"></i> Visit Website</a>
          </li>
         </ul>
         <ul class="nav navbar-nav float-right">

           <li class="dropdown dropdown-user nav-item"><a class="dropdown-toggle nav-link dropdown-user-link" href="javascript:void(0)" data-toggle="dropdown">
               <div class="avatar avatar-online">
                <img src="{{route('imageView2',['profile',Auth::user()->imageName(),'w'=>60,'h'=>60])}}" alt="avatar" /><i></i>
              </div>
               <span class="user-name">{{Str::limit(Auth::user()->name,15)}}</span></a>
               <div class="dropdown-menu dropdown-menu-right">
                <a class="dropdown-item" href="{{route('user.dashboard')}}" style="min-width: 220px"><i class="fas fa-th-large"></i> My Dashboard </a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="{{route('admin.myProfile')}}" style="min-width: 220px"><i class="fa fa-user"></i> My Profile </a>

                 <div class="dropdown-divider"></div>
                 
                 <a class="dropdown-item" href="{{ route('logout') }}" onclick="event.preventDefault(); document.getElementById('logout-form').submit();">
                  <i class="fas fa-power-off"></i> Logout 
                  </a>
                  
                <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                    @csrf
                </form>
                
               </div>
           </li>
         </ul>
       </div>
     </div>
   </div>
 </nav>
 <!-- END: Header-->