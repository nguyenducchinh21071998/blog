<!DOCTYPE html>
<html>
<head>
    <title>Yêu cầu dạy thay</title>
</head>
<body>
    <h1>Yêu cầu dạy thay</h1>
    <p>Giảng viên tạo đơn: {{ $details['teacher_name'] }}</p>
    <p>Giảng viên dạy thay: {{ $details['teacher_replace_name'] }}</p>
    <p>Lớp dạy thay: {{ $details['class_room_name'] }}</p>
    <p>Ngày dạy thay: {{ $details['replacement_day'] }}</p>
    <p>Lý do: {{ $details['reason'] }}</p>
    <p>Thank you</p>
</body>
</html>
