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
        .portlet-body {
            width: 1087px;
            margin-left: 255px;
        }
        .fc .fc-toolbar > * > :first-child {
            margin-left: 0;
            text-transform: uppercase;
            color: #ff0909;
        }
    </style>
@endsection
@section('content')
<div class="portlet light bordered">
    <div class="portlet-body">
    	<div id='calendar'></div>
        <a class="btn btn-warning" style="margin-top: 20px; margin-left: 962px;" href="{{ route('export') }}">Export Excel</a>
    	<br>
        {!! $calendar->calendar() !!}
    </div>
</div>
@endsection

@section('footer')
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment.min.js"></script>

<script src="{{ asset('js/locale-all.js') }}"></script>
<script src="{{ asset('js/jquery.qtip.min.js') }}"></script>
	{!! $calendar->script() !!}

	<script type="text/javascript">
      	$.datetimepicker.setLocale('vi');
      	$('.datetimepicker').datetimepicker();
	</script>
@endsection
