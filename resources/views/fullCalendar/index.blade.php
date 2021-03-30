@extends('layouts.master')

@section('head')

    <link rel="stylesheet" href="{{ asset('css/fullcalendar.min.css') }}"/>
    <link rel="stylesheet" href="{{URL::asset('')}}css/jquery.datetimepicker.min.css">
    <link rel="stylesheet" href="{{URL::asset('')}}css/bootstrap-switch.min.css">
    <link rel="stylesheet" href="{{ asset('css/jquery.qtip.min.css') }}"/>

    <style type="text/css">
    .qtip-zent {
	    background-color: #F36E24;
	    border-color: #F36E24;
	    color: white;
    }
    </style>

@endsection

@section('contents')
	
<div class="portlet light bordered">
  <div class="portlet-title">
    <div class="caption" style="font-size: 14px">
        <i class="fa fa-home" aria-hidden="true"></i>
        <a href="{{ route('dashboard') }}">  Trang chủ </a> 
        &nbsp;/&nbsp; Quản lý giảng dạy
        &nbsp;/&nbsp; Lịch học các lớp
    </div>
  </div>
    <div class="portlet-body">
    	<div class="clearfix"></div>
    	<br>
        {!! $calendar->calendar() !!}  
    </div>
</div>

@endsection

@section('footer')
    <script src="{{ asset('js/moment.min.js') }}"></script>
    <script src="{{ asset('js/fullcalendar.min.js') }}"></script>
    <script src="{{ asset('js/locale-all.js') }}"></script>
    <script src="{{ asset('js/jquery.qtip.min.js') }}"></script>
    <script src="{{URL::asset('')}}js/jquery.datetimepicker.full.min.js"></script>
    <script src="{{URL::asset('')}}js/bootstrap-switch.min.js"></script>
	{!! $calendar->script() !!}

	<script type="text/javascript">
      	$.datetimepicker.setLocale('vi');
      	$('.datetimepicker').datetimepicker();
	</script>
@endsection