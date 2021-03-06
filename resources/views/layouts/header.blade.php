
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="csrf-token" content="{{ csrf_token() }}" />
  <title>KMA</title>

  <!-- Google Font: Source Sans Pro -->
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback">
  <!-- Font Awesome Icons -->
  <link rel="stylesheet" href="{{ asset('plugins/fontawesome-free/css/all.min.css') }}">
  <!-- overlayScrollbars -->
  <link rel="stylesheet" href="{{ asset('plugins/overlayScrollbars/css/OverlayScrollbars.min.css') }}">
  <!-- Theme style -->
  <link rel="stylesheet" href="{{ asset('dist/css/adminlte.min.css') }}">
  <link rel='stylesheet' href='https://cdn.rawgit.com/t4t5/sweetalert/v0.2.0/lib/sweet-alert.css'>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.13.3/css/bootstrap-select.min.css">
  <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/v/dt/dt-1.10.23/datatables.min.css"/>
  <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css">
  <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.9.0/css/bootstrap-datepicker.min.css">
  {{-- <link rel="stylesheet" ref="https://cdnjs.cloudflare.com/ajax/libs/fullcalendar/2.2.7/fullcalendar.min.css"/> --}}
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/fullcalendar@5.5.0/main.css"/>
  <style type="text/css" media="screen">
    .action-column{
      min-width: 90px !important
    }
    table a i {
      color: white;
    }

    .modal .modal-content .modal-title {
        font-weight: 400;
    }
    .modal-title {
        color: orange;
        font-weight: bold !important;
    }
    .modal-title {
        color: orange;
        font-weight: bold !important;
        text-align: center;
        text-transform: uppercase;
    }
    .modal-title {
        margin: 0;
        line-height: 1.42857143;
    }
    .modal-header {
        border-bottom: 1px solid #ffa331 !important;
    }
    .action-column {
      display: flex;
      justify-content: center;
    }
    .cutomize {
      margin-left: -80px;
    }
    .dataTables_filter {
      margin-right: -65px
    }
    .dataTables_paginate {
      margin-right: -65px
    }
    .table-striped {
      width: 1086px !important;
    }
</style>
