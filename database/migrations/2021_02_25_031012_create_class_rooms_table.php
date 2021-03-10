<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateClassRoomsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('class_rooms', function (Blueprint $table) {
            $table->id();
            $table->integer('course_id');
            $table->integer('teacher_id');
            $table->string('name');
            $table->string('class')->comment("lop")->nullable();
            $table->string('type_class')->comment("1: thực hành, 2: lí thuyết");
            $table->string('status_class')->comment("1: chưa diễn ra, 2: đang diễn ra, 3: đã kết thúc");
            $table->string('department_id')->comment("phòng học");
            $table->string('semester_id')->comment("học ki");
            $table->string('schedule')->comment("lich hoc");
            $table->date('start_date')->comment("ngày bắt đầu");
            $table->date('end_date')->comment("ngày kết thúc");
            $table->string('total_student')->comment("tổng số học viên cho lớp học");
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
        Schema::dropIfExists('class_rooms');
    }
}
