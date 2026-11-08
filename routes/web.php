<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\Welcome\InertiaWelcomeController;
use App\Http\Controllers\Customer\CustomerController;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Admin\PostsController;
use App\Http\Controllers\Admin\BlogsController;
use App\Http\Controllers\Admin\VideosController;
use App\Http\Controllers\Admin\MenusController;
use App\Http\Controllers\Admin\AdminController;

use Illuminate\Support\Facades\Artisan;
Route::get('/clear/{key}', function ($key) {
    // Set your secret key
    $secret = '5683';

    if ($key !== $secret) {
        abort(403, 'Unauthorized action.');
    }

    // Run optimization commands
    Artisan::call('optimize:clear');
    Artisan::call('optimize');

    return response()->json([
        'status' => 'success',
        'message' => 'Application optimized successfully!'
    ]);
});


Route::get('/',[InertiaWelcomeController::class,'index'])->name('index');
Route::get('/image-view',[InertiaWelcomeController::class,'imageView'])->name('imageView');
Route::get('/image/{template?}/{image?}',[InertiaWelcomeController::class,'imageView2'])->name('imageView2');
Route::get('/sitemap.xml',[InertiaWelcomeController::class,'siteMapXml'])->name('siteMapXml');
Route::get('/search',[InertiaWelcomeController::class,'search'])->name('search');
Route::post('/contact-mail',[InertiaWelcomeController::class,'contactMail'])->name('contactMail');
Route::post('/subscribe',[InertiaWelcomeController::class,'subscribe'])->name('subscribe');
Route::get('/switch/{lang?}',[InertiaWelcomeController::class,'language'])->name('language');
Route::get('/geo/filter/{id}',[InertiaWelcomeController::class,'geo_filter'])->name('geo_filter');

Route::get('/service/category/{slug}',[InertiaWelcomeController::class,'serviceCategory'])->name('serviceCategory');
Route::get('/service/{slug}',[InertiaWelcomeController::class,'serviceView'])->name('serviceView');
Route::post('/booking',[InertiaWelcomeController::class,'booking'])->name('booking');

Route::get('/blog',[InertiaWelcomeController::class,'blogsPage'])->name('blogsPage');
Route::get('/videos',[InertiaWelcomeController::class,'videosPage'])->name('videosPage');
Route::get('/blog/category/{slug}',[InertiaWelcomeController::class,'blogCategory'])->name('blogCategory');
Route::get('/blog/author/{id}/{slug}',[InertiaWelcomeController::class,'blogAuthor'])->name('blogAuthor');
Route::get('/blog/tag/{slug}',[InertiaWelcomeController::class,'blogTag'])->name('blogTag');
Route::get('/blog/archives/{slug}',[InertiaWelcomeController::class,'blogArchives'])->name('blogArchives');
Route::get('/blog/search',[InertiaWelcomeController::class,'blogSearch'])->name('blogSearch');
Route::get('/blog/{slug}',[InertiaWelcomeController::class,'blogView'])->name('blogView');
Route::post('/blog-comments/{slug}',[InertiaWelcomeController::class,'blogComments'])->name('blogComments');
Route::get('/rewards-card', function () {
    return Inertia::render('RewardsCard');
})->name('rewards.card');



Route::any('/login',[AuthController::class,'login'])->name('login');
Route::any('/forgot-password',[AuthController::class,'forgotPassword'])->name('forgotPassword');
Route::get('/reset-password/{token}',[AuthController::class,'resetPassword'])->name('resetPassword');
Route::post('/reset-password-check',[AuthController::class,'resetPasswordCheck'])->name('resetPasswordCheck');
Route::any('/register',[AuthController::class,'register'])->name('register');
Route::post('/log-out',[AuthController::class,'logout'])->name('logout');

Route::post('/uploadcv',[InertiaWelcomeController::class,'uploadcv'])->name('uploadcv');


Route::get('/{slug}',[InertiaWelcomeController::class,'pageView'])->name('pageView');


// require __DIR__.'/auth.php';

//Customer Route Group Start

Route::group(['prefix'=>'user', 'as'=>'user.','middleware'=>['auth','role:customer']], function(){

    Route::get('/dashboard',[CustomerController::class,'dashboard'])->name('dashboard');
    Route::any('/profile',[CustomerController::class,'profileEdit'])->name('profileEdit');
    Route::get('/mybooking',[CustomerController::class,'myBooking'])->name('myBooking');
    Route::get('/mybooking/view/{id}',[CustomerController::class,'myBookingAction'])->name('myBookingAction');
    Route::any('/changepassword',[CustomerController::class,'changePassword'])->name('changePassword');
   

    
});
    
    
    // Admin Route Group Start
    
Route::group(['prefix'=>'admin', 'as'=>'admin.','middleware'=>['auth','role:admin','permission']], function(){
    
    Route::get('/dashboard',[AdminController::class,'dashboard'])->name('dashboard');
    Route::any('/my-profile',[AdminController::class,'myProfile'])->name('myProfile');
    
    Route::get('/editor/{type}/{id}',[AdminController::class,'contentEditor'])->name('contentEditor');
    Route::any('/editor-action/{action}/{id?}',[AdminController::class,'contentEditorAction'])->name('contentEditorAction');
    
    // Medies Library Route
    Route::get('/medies',[AdminController::class,'medies'])->name('medies');
    Route::post('/medies-file-upload',[AdminController::class,'mediesFileUpload'])->name('mediesFileUpload');
    Route::post('/medies/create',[AdminController::class,'mediesCreate'])->name('mediesCreate');
    Route::match(['get','post'],'/medies/edit/{id}',[AdminController::class,'mediesEdit'])->name('mediesEdit');
    Route::get('/medies/delete/{id}',[AdminController::class,'mediesDelete'])->name('mediesDelete');
    // Medies Library Route End
    
    
    //Page Management
    Route::get('/pages',[AdminController::class,'pages'])->name('pages');
    Route::any('/pages/{action}/{id?}',[AdminController::class,'pagesAction'])->name('pagesAction');
    //Page Management End
    
    // Posts Comments Route End
    Route::get('/posts/comments/all',[PostsController::class,'postsCommentsAll'])->name('postsCommentsAll');
    Route::get('/posts/comments/post/{id}',[PostsController::class,'postsComments'])->name('postsComments');
    Route::any('/posts/comments/{action}/{id}',[PostsController::class,'postsCommentsAction'])->name('postsCommentsAction');
    // Posts Comments Route End
    
    // Posts Categories Route
    Route::get('/posts/categories',[PostsController::class,'postsCategories'])->name('postsCategories');
    Route::any('/posts/categories/{action}/{id?}',[PostsController::class,'postsCategoriesAction'])->name('postsCategoriesAction');
    // Posts Categories Route End
    
    // Posts Tags Route
    Route::get('/posts/tags',[PostsController::class,'postsTags'])->name('postsTags');
    Route::any('/posts/tags/{action}/{id?}',[PostsController::class,'postsTagsAction'])->name('postsTagsAction');
    // Posts Tags Route End
    
    // Posts Route
    Route::get('/posts',[PostsController::class,'posts'])->name('posts');
    Route::any('/posts/{action}/{id?}',[PostsController::class,'postsAction'])->name('postsAction');
    // Posts Route End

    // Blogs Route
    Route::get('/blogs',[BlogsController::class,'blogs'])->name('blogs');
    Route::any('/blogs/{action}/{id?}',[BlogsController::class,'blogsAction'])->name('blogsAction');
    // Blogs Route End

    // Videos Route
    Route::get('/videos',[VideosController::class,'videos'])->name('videos');
    Route::any('/videos/{action}/{id?}',[VideosController::class,'videosAction'])->name('videosAction');
    // Videos Route End
    
    
    
    // Services Categories Route
    Route::get('/services/categories',[AdminController::class,'servicesCategories'])->name('servicesCategories');
    Route::any('/services/categories/{action}/{id?}',[AdminController::class,'servicesCategoriesAction'])->name('servicesCategoriesAction');
    // Services Categories Route End
    
    //Services Management
    Route::get('/services',[AdminController::class,'services'])->name('services');
    Route::any('/services/{action}/{id?}',[AdminController::class,'servicesAction'])->name('servicesAction');
    //Services Management End

    Route::get('/bookings',[AdminController::class,'bookings'])->name('bookings');
    
    // Posts Route
    Route::get('/clients',[AdminController::class,'clients'])->name('clients');
    Route::any('/clients/{action}/{id?}',[AdminController::class,'clientsAction'])->name('clientsAction');
    // Posts Route End
    
    // Brands Route
    Route::get('/brands',[AdminController::class,'brands'])->name('brands');
    Route::any('/brands/{action}/{id?}',[AdminController::class,'brandsAction'])->name('brandsAction');
    // Brands Route End
    
    // Slider Route
    Route::get('/sliders',[AdminController::class,'sliders'])->name('sliders');
    Route::any('/sliders/{action}/{id?}',[AdminController::class,'slidersAction'])->name('slidersAction');
    Route::any('/sliders/slide/{action}/{id}',[AdminController::class,'slideAction'])->name('slideAction');
    // Slider Route End
    
    // Gallery Route
    Route::get('/galleries',[AdminController::class,'galleries'])->name('galleries');
    Route::any('/galleries/{action}/{id?}',[AdminController::class,'galleriesAction'])->name('galleriesAction');
    // Gallery Route End
    
    
    // Theme Route
    Route::get('/theme-setting',[AdminController::class,'themeSetting'])->name('themeSetting');
    // Theme Route End
    
    // Menus Route
    Route::get('/menus',[MenusController::class,'menus'])->name('menus');
    Route::any('/menus/config/{action}/{id?}',[MenusController::class,'menusAction'])->name('menusAction');
    Route::post('/menus/items/post/{id}',[MenusController::class,'menusItemsPost'])->name('menusItemsPost');
    Route::any('/menus/items/{action}/{id}',[MenusController::class,'menusItemsAction'])->name('menusItemsAction');
    // Menus Route End
    
    
    //User Management
    Route::get('/users/admin/',[AdminController::class,'usersAdmin'])->name('usersAdmin');
    Route::any('/users/admin/{action}/{id?}',[AdminController::class,'usersAdminAction'])->name('usersAdminAction');
    
    Route::get('/users/customer/',[AdminController::class,'usersCustomer'])->name('usersCustomer');
    Route::any('/users/customer/{action}/{id?}',[AdminController::class,'usersCustomerAction'])->name('usersCustomerAction');
    
    Route::get('/users/roles',[AdminController::class,'userRoles'])->name('userRoles');
    Route::any('/users/roles/{action}/{id?}',[AdminController::class,'userRoleAction'])->name('userRoleAction');
    
    Route::get('/subscribes',[AdminController::class,'subscribes'])->name('subscribes');
    
    // Apps Setting
    Route::get('/setting/{type}',[AdminController::class,'setting'])->name('setting');
    Route::post('/setting/{type}/update',[AdminController::class,'settingUpdate'])->name('settingUpdate');
    
});