@extends('layouts.master')
@section('header')
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/fullcalendar/3.9.0/fullcalendar.css" />
    <link rel="stylesheet" href="{{ asset('css/jquery.qtip.min.css') }}"/>

    <style type="text/css">
        .qtip-zent {
            background-color: #F36E24;
            border-color: #F36E24;
            color: white;
        }
    </style>
@endsection
@section('content')
<div class="portlet light bordered">
    <div class="portlet-body">
    	<div id='calendar'></div>
    	<br>
        {{-- {{dd($calendar)}} --}}
        {!! $calendar->calendar() !!}
    </div>
</div>
@endsection

@section('footer')
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment.min.js"></script>
	{!! $calendar->script() !!}

	<script type="text/javascript">
      	$.datetimepicker.setLocale('vi');
      	$('.datetimepicker').datetimepicker();
	</script>
@endsection
