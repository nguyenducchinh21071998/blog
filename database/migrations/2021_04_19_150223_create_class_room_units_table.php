<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateClassRoomUnitsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('class_room_units', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->integer('unit')->comment("buoi thu")->nullable();
            $table->integer('class_room_id');
            $table->integer('course_id');
            $table->string('status_class_unit')->default(1)->comment("1: chưa diễn ra, 2: đang diễn ra, 3: đã kết thúc");
            $table->dateTime('start_date')->comment("ngày bắt đầu");
            $table->string('note')->nullable();
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
        Schema::dropIfExists('class_room_units');
    }
}
