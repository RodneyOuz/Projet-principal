<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBreedsTable extends Migration {
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up() {
    if (Schema::hasTable('breeds')) return;
    Schema::create('breeds', function (Blueprint $table) {
      $table->increments('id')->unsigned();
      $table->string('name');
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down() {
    Schema::dropIfExists('breeds');
  }
}
