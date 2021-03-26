<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTeacherClassReplacesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('teacher_class_replaces', function (Blueprint $table) {
            $table->id();
            $table->integer('class_room_id');
            $table->integer('teacher_id')->comment('giao vien yeu cau day thay');
            $table->integer('teacher_replace_id')->comment('giao vien duoc yeu cau day thay');
            $table->integer('user_confirm_id')->comment('admin xac nhan day thay')->nullable();
            $table->integer('status')->comment('trạng thái: 1: yêu cầu dạy thay, 2: giao viên dạy thay xác nhận, 3: admin xác nhận')->default(1);
            $table->date('replacement_day')->comment('ngay day thay');
            $table->string('reason');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('teacher_class_replaces');
    }
}
