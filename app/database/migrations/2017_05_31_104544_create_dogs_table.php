<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDogsTable extends Migration {
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up() {
    if (Schema::hasTable('dogs')) return;
    Schema::create('dogs', function (Blueprint $table) {
      $table->increments('id');
      $table->string('displayName');
      $table->string('photoURL');
      $table->integer('breed_id')->unsigned();
      $table->integer('user_id')->unsigned();
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down() {
    Schema::dropIfExists('dogs');
  }
}
