//-----------------------------Xem chi tiết thông tin user-------------------------------
$(document).ready(function() {
    toastr.options = {
        "closeButton": false,
        "debug": false,
        "newestOnTop": false,
        "progressBar": false,
        "positionClass": "toast-top-right",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    };

    $('#repalceTable').delegate('.btn-detail', 'click', function() {
        var value = $(this).data('id');
        var url = 'user-info';
        $.ajax({
            type: 'get',
            url: url,
            data: {
                'id': value
            },
            success: function(data) {
                console.log(data);
                $('#infoID').val(data.info_user.id);
                $('#infoName').val(data.info_user.name);
                $('#infoEmail').val(data.info_user.email);
                $('#infoBirthday').val(data.info_user.birthday);
                $('#infoMobile').val(data.info_user.mobile);
                $('#infoFacebook').val(data.info_user.facebook);
                $('#infoSkype').val(data.info_user.skype);
                $('#infoWorkFace').val(data.info_user.work_place);
                $('#infoAddress').val(data.info_user.address);
                $('#infoSkill').val(data.info_user.skill);
                $('#infoPosition').val(data.info_user.position);
                $('#infoEducation').val(data.info_user.education_info);
                var gender = data.info_user.gender;
                var type = data.info_user.type;
                var status = data.info_user.status;
                for (var i = 1; i < 4; i++) {
                    if (gender == i) {
                        $('#infoGender option[value=' + gender + ']').attr('selected', 'selected');
                    }
                    if (type == i) {
                        $('#infoType option[value=' + type + ']').attr('selected', 'selected');
                    }
                    if (status == i) {
                        $('#infoStatus option[value=' + status + ']').attr('selected', 'selected');
                    }
                }
                //hiện popup
                $('#User-modal-info').modal('show');
                //xóa các option cũ
                $('#roles_user')
                    .find('option')
                    .remove()
                    .end();
                //in ra quyền
                for (var i = 0; i < data.info_roles_user.length; i++) {
                    if (data.info_roles_user[i].role_id == 1) {
                        $('#roles_user').append($('<option>', {
                            value: 1,
                            text: 'superadmin'
                        }));
                    }
                    if (data.info_roles_user[i].role_id == 2) {
                        $('#roles_user').append($('<option>', {
                            value: 2,
                            text: 'admin'
                        }));
                    }
                    if (data.info_roles_user[i].role_id == 3) {
                        $('#roles_user').append($('<option>', {
                            value: 3,
                            text: 'teacher'
                        }));
                    }
                    if (data.info_roles_user[i].role_id == 4) {
                        $('#roles_user').append($('<option>', {
                            value: 4,
                            text: 'teaching assistant'
                        }));
                    }
                    if (data.info_roles_user[i].role_id == 5) {
                        $('#roles_user').append($('<option>', {
                            value: 5,
                            text: 'mod'
                        }));
                    }
                }

            }

        });

    });

    //-------------------end view info-----------------------------

    //-------------------Begin View Edit User---------------------------------
    $('#repalceTable').delegate('.btn-edit', 'click', function() {
        var value = $(this).data('id');
        $('#editEmail').attr('data-id', value);
        $('#editMobile').attr('data-id', value);
        var url = 'user-update';

        $.ajax({
            type: 'get',
            url: url,
            data: {
                'id': value
            },
            success: function(data) {
                console.log(data);
                $('#editID').val(data.get_user_update.id);
                $('#editName').val(data.get_user_update.name);
                $('#editEmail').val(data.get_user_update.email);
                $('#editBirthday').val(data.get_user_update.birthday);
                $('#editMobile').val(data.get_user_update.mobile);
                $('#editFacebook').val(data.get_user_update.facebook);
                $('#editSkype').val(data.get_user_update.skype);
                $('#editWorkFace').val(data.get_user_update.work_place);
                $('#editAddress').val(data.get_user_update.address);
                $('#editSkill').val(data.get_user_update.skill);
                $('#editPosition').val(data.get_user_update.position);
                $('#editEducation').val(data.get_user_update.education_info);
                var gender = data.get_user_update.gender;
                var type = data.get_user_update.type;
                var status = data.get_user_update.status;
                // Xóa bỏ tất cả các selected
                $("#editRole").find('option').removeAttr("selected");
                //selected role user
                for (var i = 0; i < data.roles_user_info.length; i++) {
                    $('#select_role' + data.roles_user_info[i].role_id).prop('selected', true);
                }
                for (var i = 1; i < 5; i++) {
                    if (gender == i) {
                        $('#editGender option[value=' + gender + ']').attr('selected', 'selected');
                    }
                    if (type == i) {
                        $('#editType option[value=' + type + ']').attr('selected', 'selected');
                    }
                    if (status == i) {
                        $('#editStatus option[value=' + status + ']').attr('selected', 'selected');
                    }
                }
                $('#User-modal-edit').modal('show');
                $('.error').hide();
            }
        });
    });
    //-------------------------End view edit------------------------------------------

    //-------------------------Begin submit postUpdate--------------------------------
    $('#frmEditUser').on('submit', function(e) {
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
                }
            });
            e.preventDefault();
            var userID = $('#editID').val();
            var formData = $('#frmEditUser').serialize();
            var url = 'user-update';
            $.ajax({
                type: 'put',
                url: url,
                data: formData,
                success: function(data) {
                    console.log(data);
                    if (data.error == true) {
                        // $('.error').hide();
                        // if (data.message.editName != undefined) {
                        //     $('.errorName').show().text(data.message.editName[0]);
                        // }
                        // if (data.message.editMobile != undefined) {
                        //     $('.errorMobile').show().text(data.message.editMobile[0]);
                        // }
                        // if (data.message.date != undefined) {
                        //     $('.errorBirthday').show().text(data.message.date[0]);
                        // }
                        // if (data.message.editGender != undefined) {
                        //     $('.errorGender').show().text(data.message.editGender[0]);
                        // }
                        // if (data.message.editEmail != undefined) {
                        //     $('.errorEmail').show().text(data.message.editEmail[0]);
                        // }
                        // if (data.message.editFacebook != undefined) {
                        //     $('.errorFacebook').show().text(data.message.editFacebook[0]);
                        // }
                        // if (data.message.editStatus != undefined) {
                        //     $('.errorStatus').show().text(data.message.editStatus[0]);
                        // }
                        // if (data.message.editType != undefined) {
                        //     $('.errorType').show().text(data.message.editType[0]);
                        // }
                    } else {
                        var gt = data.user.gender;

                        if (data.user.gender == 1) {
                            gt = "Nam";
                        } else if (data.user.gender == 2) {
                            gt = "Nữ";
                        }

                        var type_user = data.user.type;
                        if (data.user.type == 1) {
                            type_user = "Quản Lý";
                        } else if (data.user.type == 2) {
                            type_user = "Giáo Viên";
                        } else if (data.user.type == 3) {
                            type_user = "Trợ Lý";
                        }

                        var status_user = data.user.status;
                        if (data.user.status == 1) {
                            status_user = "Đang Mở";
                        } else if (data.user.status == 2) {
                            status_user = "Đã Đóng";
                        }

                        var roles_update = "";
                        for (var i = 0; i < data.role_update.length; i++) {
                            if (data.role_update[i] == 1) {
                                roles_update = roles_update + '<label class="label label-success">superadmin</label> ';
                            }
                            if (data.role_update[i] == 2) {
                                roles_update = roles_update + '<label class="label label-success">admin</label> ';
                            }
                            if (data.role_update[i] == 3) {
                                roles_update = roles_update + '<label class="label label-success">teacher</label> ';
                            }
                            if (data.role_update[i] == 4) {
                                roles_update = roles_update + '<label class="label label-success">teaching assistant</label> ';
                            }
                            if (data.role_update[i] == 5) {
                                roles_update = roles_update + '<label class="label label-success">mod</label> ';
                            }
                        }
                        var row = '<tr align="center" id="userRow' + data.user.id + '">' +
                            '<td>' + data.user.id + '</td>' +
                            '<td>' + data.user.name + '</td>' +
                            '<td>' + data.user.mobile + '</td>' +
                            '<td><a href="' + data.user.email + '">' + data.user.email + '</a></td>' +
                            '<td>' + roles_update + '</td>' +
                            '<td>' + type_user + '</td>' +
                            '<td>' + status_user + '</td>' +
                            '<td>' + data.user.created_at + '</td>';
                        row += '<td><ul class="list-inline"><li><a href="#"><i class="fa fa-info btn-detail btn-info style-css" data-id="' + data.user.id + '" aria-hidden="true" title="Xem Chi tiết User"></i></a></li>';
                        row += '<li><a href="#"><i class="fa fa-pencil-square-o btn-warning btn-edit style-css" data-id="' + data.user.id + '" aria-hidden="true" title="Sửa Thông Tin User"></i></a></li>';
                        row += '<li><a href="#"><i class="fa fa-trash-o btn-danger btn-del style-css" data-id="' + data.user.id + '" aria-hidden="true" title="Xóa User"></i> </a></li></ul></td></tr>';

                        $("#userRow" + data.user.id).replaceWith(row);
                        $('#User-modal-edit').modal('hide');
                        swal("Success!", "Sửa người dùng thành công !", "success");
                    }
                },
                error: function(data) {
                    console.log('Error:', data);
                    $('#User-modal-edit').modal('hide');
                    swal({
                        title: "Cập nhật thông tin không thành công !",
                        type: "warning",
                        showCancelButton: false,
                        confirmButtonClass: "btn-danger",
                        confirmButtonText: "Đóng",
                        closeOnConfirm: false
                    });
                }
            });
        })
        //-------------------------End submit update ------------------------------------

    //-------------------------Begin Delete User----------------------------------------------
    $('#repalceTable').delegate('.btn-del', 'click', function() {
        $.ajaxSetup({
            headers: {
                'X-CSRF-Token': $('input[name="_token"]').val()
            }
        });
        var value = $(this).data('id');
        var url = 'user-delete';
        swal({
                title: "Bạn có chắc chắn muốn xoá?",
                text: "Bạn sẽ không thể khôi phục lại bản ghi này!!",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Có",
                cancelButtonText: "Không",
                closeOnConfirm: false,
                // closeOnCancel: false
            },
            function(isConfirm) {
                if (isConfirm) {
                    swal("Xoá thành công", "success");
                    $.ajax({
                        type: 'delete',
                        url: url,
                        data: {
                            'id': value
                        },
                        success: function(data) {
                            $('#userRow' + value).remove();
                        }
                    });
                }
            });
    });
    // ----------------------------Begin Create User -------------------------
    $('#myBtn').on('click', function() {
        $('#createUserModal').modal('show');
        $('.error').hide();
        $('#frmCreateUser').trigger('reset');
        $('#frmCreateUser button[type="submit"]').prop('disabled', false);
    });
    $('#frmCreateUser').on('submit', function(e) {
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
            }
        })
        e.preventDefault();
        var form = $('#frmCreateUser');
        var formdata = form.serialize();
        var url = 'user-create';
        $('#frmCreateUser button[type="submit"]').prop('disabled', true);
        $.ajax({
            type: 'post',
            url: url,
            data: formdata,
            success: function(data) {
                console.log(data);
                if (data.error == true) {
                    $('#frmCreateUser button[type="submit"]').prop('disabled', false);
                    // $('.error').hide();
                    // if (data.message.name != undefined) {
                    //     $('.errorName').show().text(data.message.name[0]);
                    // }
                    // if (data.message.mobile != undefined) {
                    //     $('.errorMobile').show().text(data.message.mobile[0]);
                    // }
                    // if (data.message.password != undefined) {
                    //     $('.errorPassword').show().text(data.message.password[0]);
                    // }
                    // if (data.message.gender != undefined) {
                    //     $('.errorGender').show().text(data.message.gender[0]);
                    // }
                    // if (data.message.birthday != undefined) {
                    //     $('.errorBirthday').show().text(data.message.birthday[0]);
                    // }
                    // if (data.message.email != undefined) {
                    //     $('.errorEmail').show().text(data.message.email[0]);
                    // }
                    // if (data.message.facebook != undefined) {
                    //     $('.errorFacebook').show().text(data.message.facebook[0]);
                    // }
                    // if (data.message.status != undefined) {
                    //     $('.errorStatus').show().text(data.message.status[0]);
                    // }
                    // if (data.message.type != undefined) {
                    //     $('.errorType').show().text(data.message.type[0]);
                    // }

                } else {
                    addRow(data);
                    $('#createUserModal').modal('hide');
                    swal("Success!", "Thêm người dùng thành công !", "success");
                }
            },
            error: function(data) {
                console.log('Error:', data);
                $('#createUserModal').modal('hide');
                swal({
                    title: "Thêm thông tin không thành công !",
                    type: "warning",
                    showCancelButton: false,
                    confirmButtonClass: "btn-danger",
                    confirmButtonText: "Đóng",
                    closeOnConfirm: false
                });
            }
        })
    });

    function addRow(data) {
        var gt = data.user.gender;
        if (data.user.gender == 1) {
            gt = "Nam";
        } else if (data.user.gender == 2) {
            gt = "Nữ";
        }
        var type_user = data.user.type;
        if (data.user.type == 1) {
            type_user = "Quản Lý";
        } else if (data.user.type == 2) {
            type_user = "Giáo Viên";
        } else if (data.user.type == 3) {
            type_user = "Trợ Lý";
        }
        var status_user = data.user.status;
        if (data.user.status == 1) {
            status_user = "Đang Mở";
        } else if (data.user.status == 2) {
            status_user = "Đã Đóng";
        }
        var roles_info = "";
        for (var i = 0; i < data.roles_user.length; i++) {
            if (data.roles_user[i] == 1) {
                roles_info = roles_info + '<label class="label label-success">superadmin</label> ';
            }
            if (data.roles_user[i] == 2) {
                roles_info = roles_info + '<label class="label label-success">admin</label> ';
            }
            if (data.roles_user[i] == 3) {
                roles_info = roles_info + '<label class="label label-success">teacher</label> ';
            }
            if (data.roles_user[i] == 4) {
                roles_info = roles_info + '<label class="label label-success">teaching assistant</label> ';
            }
            if (data.roles_user[i] == 5) {
                roles_info = roles_info + '<label class="label label-success">mod</label> ';
            }
        }
        var row = '<tr align="center" id="userRow' + data.user.id + '">' +
            '<td>' + data.user.id + '</td>' +
            '<td>' + data.user.name + '</td>' +
            '<td>' + data.user.mobile + '</td>' +
            '<td><a href="' + data.user.email + '">' + data.user.email + '</a></td>' +
            '<td>' + roles_info + '</td>' +
            '<td>' + type_user + '</td>' +
            '<td>' + status_user + '</td>' +
            '<td>' + data.user.created_at + '</td>';
        row += '<td><ul class="list-inline"><li><a href="#"><i class="fa fa-info btn-detail btn-info" data-id="' + data.user.id + '" aria-hidden="true" title="Xem Chi tiết User"></i></a></li>';
        row += '<li><a href="#"><i class="fa fa-pencil-square-o btn-warning btn-edit" data-id="' + data.user.id + '" aria-hidden="true" title="Sửa Thông Tin User"></i></a></li>';
        row += '<li><a href="#"><i class="fa fa-trash-o btn-danger btn-del" data-id="' + data.user.id + '" aria-hidden="true" title="Xóa User"></i> </a></li></ul></td></tr>';
        $('tbody').append(row);
    }

    //end function
    //---------------------------validation url Edit----------------------
    $('.url_input').blur(function() {
        var url = $('.url_input').val();
        var pattern = /^(http|https)?:\/\/[a-zA-Z0-9-\.]+\.[a-z]{2,4}/;
        if (url == "" || pattern.test(url) == true) {
            $('.error').hide();
            $('#frmEditUser button[type="submit"]').prop('disabled', false);
            $(".errorUrl").html("Đây là URL");
        } else if (url != "" && pattern.test(url) == false) {
            $(".errorUrl").html("Định dạng URL không đúng");
            $('.error').show();
            $('#frmEditUser button[type="submit"]').prop('disabled', true);

        }
    });
    //---------------------------validation url Create----------------------
    $('.c_url_input').blur(function() {
        var url = $('.c_url_input').val();
        var pattern = /^(http|https)?:\/\/[a-zA-Z0-9-\.]+\.[a-z]{2,4}/;
        if (url == "" || pattern.test(url) == true) {
            // alert("this is url");
            $('.error').hide();
            $('#frmCreateUser button[type="submit"]').prop('disabled', false);
            $(".errorUrl").html("Đây là URL");
        } else if (url != "" && pattern.test(url) == false) {
            $(".errorUrl").html("Định dạng URL Facebook không đúng");
            // alert("this not url");
            $('.error').show();
            $('#frmCreateUser button[type="submit"]').prop('disabled', true);
        }
    });
    //---------------------------get id login----------------------------
    var get_id_login = $('#id_login').attr("data-id");
    //---------------------------end id login----------------------------
    //----------------------------Validate Email---------------------------
    $("#email").blur(function() {
        $.ajax({
            type: 'get',
            url: 'check-email',
            data: {
                'value': $(this).val()
            },
            success: function(result) {
                console.log(result);
                if (result > 0) {
                    $('.errorEmail').show().text("Email này đã tồn tại,bạn không thể đăng ký bằng Email này!!");
                } else {
                    $('.errorEmail').hide();
                }
            }
        });
    });

    $(document).ready(function() {
        $(".editEmail").blur(function() {
            var input_email = $("#editEmail").val();
            var id_user = $('.btn-edit').data('id');
            $.ajax({
                type: 'get',
                url: 'check-email-update',
                data: {
                    'value': $(this).val(),
                    'id': id_user
                },
                success: function(result) {
                    console.log(result);
                    $('.errorEmail').hide();
                    if (result > 0) {
                        $('.errorEmail').show().text("Email này đã tồn tại,bạn không thể sửa với Email này!!");

                    } else {
                        $('.errorEmail').hide();
                    }
                }
            });

        });
    });
    //---------------------------Validate Phone -----------------------------
    $("#mobile").blur(function() {
        $.ajax({
            type: 'get',
            url: 'check-phone',
            data: {
                'value': $(this).val()
            },
            success: function(result) {
                console.log(result);
                if (result > 0) {
                    $('.errorMobile').show().text("Số điện thoại này đã tồn tại,bạn không thể đăng ký bằng Email này!!");
                } else {
                    $('.errorMobile').hide();
                }
            }
        });
    });
    $("#editMobile").blur(function() {
        var input_phone = $("#editEmail").val();
        var id_user = $(this).data('id');
        $.ajax({
            type: 'get',
            url: 'check-mobile-update',
            data: {
                'value': $(this).val(),
                'id': id_user
            },
            success: function(result) {
                console.log(result);
                if (result > 0) {
                    $('.errorMobile').show().text("Số điện thoại này đã tồn tại,bạn không thể sử dụng số điện thoại này!!");

                } else {
                    $('.errorMobile').hide();

                }
            }
        });
    });
    //----------------------click ---------------------
    // $("#info_profile").on('click', function() {
    //     // $('#edit_profile').trigger('reset');
    //     $('.error').hide();
    //     var id_user = $('#id_login').data('id');
    //     // alert("cmm");
    //     var url = 'get-profile';
    //     $.ajax({
    //         type: 'get',
    //         url: url,
    //         data: {
    //             'id': id_user
    //         },
    //         success: function(data) {
    //             console.log(data);
    //             $('#name_profile').val(data.name);
    //             $('#birthday_profile').val(data.birthday);
    //             $('#gender_profile').prop('selected', true);
    //         }
    //     });
    // });

    //--------------------- Reset Change Password------------------
    $("#reset_change_password").on('click', function() {
        $('.error').hide();
        $('#edit_profile_password').trigger('reset');
    });
    //--------------------- Edit profile onclick ---------------------------
    $("#info_profile").on('click', function() {
        console.log('xxx');
        // $("#gender_profile").prop("selected", false);
        $('#edit_profile button[type="submit"]').prop('disabled',false);
        $('#edit_profile').trigger('reset');
       $('.error').hide();
        var id_user = $('#id_login').data('id');
        // alert("cmm");
        var url = 'get-profile';
        $.ajax({
            type: 'get',
            url: url,
            data: {
                'id': id_user
            },
            success: function(data) {
                console.log(data);

                $('#name_profile').val(data.name);
                $('#birthday_profile').val(data.birthday);
                $('#gender_profile').prop('selected', true);
            }
        });
    });
    //------------------------Edit profile-----------------------------------
    $('#edit_profile').on('submit', function(e) {
        $('#edit_profile button[type="submit"]').prop('disabled',true);
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
            }
        })
        e.preventDefault();
        var form = $('#edit_profile');
        var formdata = form.serialize();
        var url = 'user-update-profile';
        $.ajax({
            type: 'put',
            url: url,
            data: formdata,
            success: function(data) {
                console.log(data);
                if (data.error == true) {
                    $('.error').hide();
                    $('#edit_profile button[type="submit"]').prop('disabled',false);
                    if (data.message.name != undefined) {
                        $('.errorName').show().text(data.message.name[0]);
                    }
                    if (data.message.mobile != undefined) {
                        $('.errorMobile').show().text(data.message.mobile[0]);
                    }
                    if (data.message.gender != undefined) {
                        $('.errorGender').show().text(data.message.gender[0]);
                    }
                    if (data.message.email != undefined) {
                        $('.errorEmail').show().text(data.message.email[0]);
                    }
                } else {

                // Xóa bỏ tất cả các selected
                $("#gender_profile").find('option').removeAttr("selected");
                //selected gender
                for (var i = 1; i < 3; i++) {
                    if (data.gender==i) {
                        $('#gender_profile option[value=' +data.gender + ']').attr('selected', 'selected');
                    }
                   
                }
                    //change name view
                    $("#view_name").replaceWith("<span class=\"text-center\" id=\"view_name\">"+data.name +"</span>");
                    //change birthday view
                    if (data.birthday==null) {
                        $("#view_birthday").replaceWith("<span class=\"text-center\" id=\"view_birthday\"><em>(Chưa cập nhật)</em></span>");
                    }else{
                        $("#view_birthday").replaceWith("<span class=\"text-center\" id=\"view_birthday\">"+data.birthday +"</span>");
                    }
                    //change gender view
                    if (data.gender==1) {
                        $("#view_gender").replaceWith("<span class=\"text-center\" id=\"view_gender\">Nam</span>");
                    }else if (data.gender==2){
                        $("#view_gender").replaceWith("<span class=\"text-center\" id=\"view_gender\">Nữ</span>");
                    }
                    //change address view
                    if (data.address==null) {
                        $("#view_address").replaceWith("<span class=\"field text-center\" id=\"view_address\"><em>(Chưa cập nhật)</em></span>");
                    }else{
                        $("#view_address").replaceWith("<span class=\"field text-center\" id=\"view_address\">"+data.address+"</em></span>");
                    }
                    //change mobile view
                    $("#view_mobile").replaceWith("<span class=\"text-center\" id=\"view_mobile\">"+data.mobile +"</span>");
                    //change education info view
                    if (data.education_info==null) {
                        $("#view_education_info").replaceWith("<span class=\"text-center\" id=\"view_education_info\"><em>(Chưa cập nhật)</em></span>");
                    }else {
                        $("#view_education_info").replaceWith("<span class=\"text-center\" id=\"view_education_info\">"+data.education_info +"</span>");
                    }
                    //change work place view
                    if (data.work_place==null) {
                        $("#view_work_place").replaceWith("<span class=\"text-center\" id=\"view_work_place\"><em>(Chưa cập nhật)</em></span>");
                    }else {
                        $("#view_work_place").replaceWith("<span class=\"text-center\" id=\"view_work_place\">"+data.work_place +"</span>");
                    }
                    //change email view
                    $("#view_mail").replaceWith("<span class=\"text-center\" id=\"view_mail\">"+data.email +"</span>");
                    //change skill view
                    if (data.skill==null) {
                        $("#view_skill").replaceWith("<span class=\"text-center\" id=\"view_skill\"><em>(Chưa cập nhật)</em></span>");
                    }else {
                        $("#view_skill").replaceWith("<span class=\"text-center\" id=\"view_skill\">"+data.skill +"</span>");
                    }
                    //change positon view
                    if (data.positon==null) {
                        $("#view_position").replaceWith("<span class=\"text-center\" id=\"view_position\"><em>(Chưa cập nhật)</em></span>");
                    }else {
                        $("#view_position").replaceWith("<span class=\"text-center\" id=\"view_position\">"+data.positon +"</span>");
                    }                                                         
                    $("#name-main").replaceWith("<h4 class=\"profile-usertitle-name text-center\" id=\"name-main\">" + data.name + "</h4>");
                    if (data.skype == null) {
                        $("#sk_profile").replaceWith("<span id=\"sk_profile\"><em>(Chưa cập nhật)</em></span>");
                    } else {
                        $("#sk_profile").replaceWith("<span id=\"sk_profile\"><em>(Chưa cập nhật)</em></span>");
                        $("#sk_profile").replaceWith("<span id=\"sk_profile\">" + data.skype + "</span>");
                    }
                    if (data.facebook == null) {
                        $("#fb_profile").replaceWith("<a id=\"fb_profile\" href=\"#\" target=\"_blank\"><em>(Chưa cập nhật)</em></a>");
                    } else {
                        $("#fb_profile").replaceWith("<a id=\"fb_profile\" href=" + data.facebook + " target=\"_blank\">" + data.facebook + "</a>");
                    }
                    $("#info_profile").removeClass("active");
                    $("#view-profile").addClass("active");
                    $("#tab_1_2").removeClass("active");
                    $("#tab_1_1").addClass("active");
                    toastr["success"]("Đổi thông tin thành công !!");
                }



            },
            error: function(data) {
                console.log('msg:', data);
                toastr["error"]("Đổi thông tin không thành công");
            }
        });
    });
    // ------------------------- Edit Avatar Profile -----------------------------
    $('#edit_avatar_profile').on('submit', function(e) {
        // $('#edit_avatar_profile button[type="submit"]').prop('disabled',true);
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        })
        e.preventDefault();
        // img_upload =  new FormData($("#edit_avatar_profile")[0]);
        // console.log(img_upload);
         var file_data = $('#avatar_profile').prop('files')[0];   
        var form_data = new FormData();                  
        form_data.append('file', file_data);                       
        // var img_upload=$("#avatar_profile").val();
        var url = 'edit-avatar-profile';
        $.ajax({
            type: 'put',
            url: url,
            dataType: 'JSON',
            data: {
                    'avartar': file
                },
            success: function(data) {
                console.log(data);
                    toastr["success"]("Đổi mật khẩu thành công !!");
                }
        });
    });
    //-------------------------- End Edit Avatar Profile-------------------------- 

    //khoi tao delay time

    var delay = (function(){
      var timer = 0;
      return function(callback, ms){
        clearTimeout (timer);
        timer = setTimeout(callback, ms);
      };
    })();

    // chức năng search

    $("#search").on('keyup', function() {
        delay(function(){
            var keyword = $("#search").val();
            $.ajax({
                type: "GET",
                url: "user/search?keyword=" + keyword,
                cache: false,
                success: function(users)

                {
                    $("#repalceTable").html('');
                    $("#repalceTable").append(users);
                    
                }
            });       
        },1500);
        
        // return false;
    });

    // ------------------------- Edit password Profile ---------------------------
    $('#edit_profile_password').on('submit', function(e) {
        $('#edit_profile_password button[type="submit"]').prop('disabled',true);
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
            }
        })
        e.preventDefault();
        var form = $('#edit_profile_password');
        var formdata = form.serialize();
        var url = 'edit-password-profile';
        $.ajax({
            type: 'put',
            url: url,
            data: formdata,
            success: function(data) {
                console.log(data);
                if (data.error == true) {
                    $('#edit_profile_password button[type="submit"]').prop('disabled',false);
                    $('.error').hide();
                    if (data.message.new_password != undefined) {
                        $('.errorNewPassWord').show().text(data.message.new_password[0]);
                    }
                    if (data.message.re_new_password != undefined) {
                        $('.errorReNewPassWord').show().text(data.message.re_new_password[0]);
                    }
                } else {
                    $("#act-password").removeClass("active");
                    $("#view-profile").addClass("active");
                    $("#tab_1_1").addClass("active");
                    $('#edit_profile_password').trigger('reset');
                    toastr["success"]("Đổi mật khẩu thành công !!");
                }
            },
            error: function(data) {
                console.log('msg:', data);
                toastr["error"]("Đổi mật khẩu không thành công !!!")
            }
        });
    });
    //------------------Change password click------------------------------
    $("#act-password").on('click', function() {
       $('.error').hide();
       $('#edit_profile_password button[type="submit"]').prop('disabled',false);
    });
    //--------------------------End Edit password---------------------------------
    //-------------------------- Begin check Email profile -----------------------
    $(document).ready(function() {

        $("#email_profile").blur(function() {
            var input_email = $("#email_profile").val();
            var id_user = $('#id_login').data('id');
            $.ajax({
                type: 'get',
                url: 'check-email-update',
                data: {
                    'value': $(this).val(),
                    'id': id_user

                },
                success: function(result) {
                    console.log(result);
                    $('.errorEmail').hide();
                    if (result > 0) {
                        $('.errorEmail').show().text("Email này đã tồn tại,bạn không thể sửa với Email này!!");
                        $('#edit_profile button[type="submit"]').prop('disabled',true);

                    } else {
                        $('.errorEmail').hide();
                        $('#edit_profile button[type="submit"]').prop('disabled',false);
                    }
                }
            });

        });
    });
    //-------------------------- end check Email profile -----------------------
    //---------------------------Validate Phone profile--------------------------------
    $("#mobile_profile").blur(function() {
        var input_phone = $("#mobile_profile").val();
        var id_user = $('#id_login').data('id');
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
            }
        });
        $.ajax({
            type: 'get',
            url: 'check-phone',
            data: {
                'value': $(this).val(),
                'id': id_user
            },
            success: function(result) {
                console.log(result);
                if (result > 0) {
                    $('.errorMobile').show().text("Số điện thoại này đã tồn tại,bạn không thể sử dụng số điện thoại này!!");
                    $('#edit_profile button[type="submit"]').prop('disabled',true);
                } else {
                    $('.errorMobile').hide();
                    $('#edit_profile button[type="submit"]').prop('disabled',false);
                }
            }
        });
    });
});