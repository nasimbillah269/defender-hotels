@extends(adminTheme().'layouts.app') @section('title')
<title>{{websiteTitle('Booking List')}}</title>
@endsection @push('css')
<style type="text/css"></style>
@endpush @section('contents')

<div class="content-header row">
    <div class="content-header-left col-md-6 col-12 mb-2">
        <h3 class="content-header-title mb-0">Booking List</h3>
        <div class="row breadcrumbs-top">
            <div class="breadcrumb-wrapper col-12">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="{{route('admin.dashboard')}}">Dashboard </a></li>
                    <li class="breadcrumb-item active">Booking List</li>
                </ol>
            </div>
        </div>
    </div>
    <div class="content-header-right col-md-6 col-12 mb-md-0 mb-2">
        <div class="btn-group float-md-right" role="group" aria-label="Button group with nested dropdown">
            <a class="btn btn-outline-primary" href="{{route('admin.bookings')}}">
                <i class="fa-solid fa-rotate"></i>
            </a>
        </div>
    </div>
</div>

<div class="content-body">
    <!-- Basic Elements start -->
    <section class="basic-elements">
        <div class="row">
            <div class="col-md-12">
                @include('admin.alerts')
                <div class="card">
                    <div class="card-content">
                        <div class="card-body">
                            <div id="accordion">
                                <div
                                    class="card-header collapsed"
                                    data-toggle="collapse"
                                    data-target="#collapseTwo"
                                    aria-expanded="false"
                                    aria-controls="collapseTwo"
                                    id="headingTwo"
                                    style="background: #f5f7fa; padding: 10px; cursor: pointer; border: 1px solid #00b5b8;"
                                >
                                    Search click Here..
                                </div>
                                <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordion" style="border: 1px solid #00b5b8; border-top: 0;">
                                    <div class="card-body">
                                        <form action="{{route('admin.bookings')}}">
                                            <div class="row">
                                                <div class="col-md-6 mb-1">
                                                    <div class="input-group">
                                                        <input type="date" name="startDate" value="{{request()->startDate?Carbon\Carbon::parse(request()->startDate)->format('Y-m-d') :''}}" class="form-control {{$errors->has('startDate')?'error':''}}" />
                                                        <input type="date" value="{{request()->endDate?Carbon\Carbon::parse(request()->endDate)->format('Y-m-d') :''}}" name="endDate" class="form-control {{$errors->has('endDate')?'error':''}}" />
                                                    </div>
                                                </div>
                                                <div class="col-md-6 mb-1">
                                                    <div class="input-group">
                                                        <input type="text" name="search" value="{{request()->search?request()->search:''}}" placeholder="Booking Name, Email, Mobile" class="form-control {{$errors->has('search')?'error':''}}" />
                                                        <button type="submit" class="btn btn-success btn-sm rounded-0">Search</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header" style="border-bottom: 1px solid #e3ebf3;">
                        <h4 class="card-title">Booking List</h4>
                    </div>
                    <div class="card-content">
                        <div class="card-body">
                            <form action="{{route('admin.bookings')}}">
                                <div class="row">
                                    <div class="col-md-4">
                                        <div class="input-group mb-1">
                                            <select class="form-control form-control-sm rounded-0" name="action" required="">
                                                <option value="">Select Action</option>
                                                <option value="pending">Pending</option>
                                                <option value="active">Active</option>
                                                <option value="cancelled">Cancelled</option>
                                                <option value="5">Delete</option>
                                            </select>
                                            <button class="btn btn-sm btn-primary rounded-0" onclick="return confirm('Are You Want To Action?')">Action</button>
                                        </div>
                                    </div>
                                    <div class="col-md-8">
                                        <ul class="statuslist">
                                            <li><a href="{{route('admin.bookings')}}">All ({{$totals->total}})</a></li>
                                            <li><a href="{{route('admin.bookings',['status'=>'pending'])}}">Pending ({{$totals->pending}})</a></li>
                                            <li><a href="{{route('admin.bookings',['status'=>'active'])}}">Active ({{$totals->active}})</a></li>
                                            <li><a href="{{route('admin.bookings',['status'=>'cancelled'])}}">Cancelled ({{$totals->cancelled}})</a></li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="table-responsive">
                                    <table class="table table-striped table-bordered table-hover">
                                        <thead>
                                            <tr>
                                                <th style="min-width: 60px;">
                                                    <label style="cursor: pointer; margin-bottom: 0;"> <input class="checkbox" type="checkbox" class="form-control" id="checkall" /> All <span class="checkCounter"></span> </label>
                                                </th>
                                                <th style="min-width: 100px;">Name</th>
                                                <th style="min-width: 100px;">Mobile</th>
                                                <th style="min-width: 100px;">Email</th>
                                                <th style="min-width: 100px;">Category</th>
                                                <th style="min-width: 100px;">Amount</th>
                                                <th style="min-width: 100px;">Quantity</th>
                                                <th style="min-width: 100px;">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            @foreach($bookings as $i=>$booking)
                                            <tr>
                                                <td>
                                                    <input class="checkbox" type="checkbox" name="checkid[]" value="{{$booking->id}}" />
                                                    {{$bookings->currentpage()==1?$i+1:$i+($bookings->perpage()*($bookings->currentpage() - 1))+1}}
                                                </td>
                                                <td>
                                                    <a data-toggle="modal" data-target="#booking_{{$booking->id}}">{{$booking->name}}</a>
                                                </td>
                                                <td>{{$booking->mobile}}</td>
                                                <td>{{$booking->email}}</td>
                                                <td>{{$booking->category?$booking->category->name:'Not Found'}}</td>
                                                <td>{{priceFullFormat($booking->amount)}}</td>
                                                <td>{{$booking->quantity}}</td>
                                                <td>
                                                    @if($booking->status=='active')
                                                    <span class="badge badge-success">{{ucfirst($booking->status)}} </span>
                                                    @elseif($booking->status=='cancelled')
                                                    <span class="badge badge-danger" style="background-color: #ff0000;">{{ucfirst($booking->status)}} </span>
                                                    @else
                                                    <span class="badge badge-danger">{{ucfirst($booking->status)}} </span>
                                                    @endif 
                                                </td>
                                            </tr>
                                            @endforeach
                                        </tbody>
                                    </table>

                                    {{$bookings->links('pagination')}}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- Basic Inputs end -->
</div>

@foreach($bookings as $i=>$booking)
<div class="modal fade text-left" id="booking_{{$booking->id}}" tabindex="-1" >
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <form action="{{route('admin.usersAdminAction','create')}}" method="post">
                @csrf
                <div class="modal-header">
                    <h4 class="modal-title">Booking View</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times; </span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="table-responsive">
                        <table class="table table-bordered">
                            <tr>
                                <th style="width: 120px;min-width: 120px;">Name</th>
                                <td style="min-width: 250px;"></td>
                            </tr>
                            <tr>
                                <th>Booking Date</th>
                                <td>{{Carbon\Carbon::parse($booking->booking_date)->format('d-m-Y')}}</td>
                            </tr>
                            <tr>
                                <th>Email</th>
                                <td>{{$booking->email}}</td>
                            </tr>
                            <tr>
                                <th>Mobile</th>
                                <td>{{$booking->mobile}}</td>
                            </tr>
                            <tr>
                                <th>NID No</th>
                                <td>{{$booking->nid_number}}</td>
                            </tr>
                            <tr>
                                <th>Category</th>
                                <td>{{$booking->category?$booking->category->name:'Not Found'}}</td>
                            </tr>
                            
                            <tr>
                                <th>quantity</th>
                                <td>{{$booking->quantity}}</td>
                            </tr>
                            <tr>
                                <th>amount</th>
                                <td>{{priceFullFormat($booking->amount)}}</td>
                            </tr>
                            <tr>
                                <th>Booking amount</th>
                                <td>{{priceFullFormat($booking->booking_amount)}}</td>
                            </tr>
                            <tr>
                                <th>Payment Method</th>
                                <td>{{$booking->payment_method}}</td>
                            </tr>
                            <tr>
                                <th>Attachment</th>
                                <td>
                                    @if($booking->imageFile)
                                    <a href="{{asset($booking->imageFile->file_url)}}" target="_blank" class="btn btn-sm btn-success">View Attacth</a>
                                    @endif
                                </td>
                            </tr>
                            <tr>
                                <th>Bank details</th>
                                <td>{{$booking->bank_details}}</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>
@endforeach


@endsection @push('js') @endpush
