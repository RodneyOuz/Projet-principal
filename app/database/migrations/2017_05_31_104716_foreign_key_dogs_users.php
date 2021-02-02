<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ForeignKeyDogsUsers extends Migration {
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up() {
    Schema::table('dogs', function (Blueprint $table) {
      $table->foreign('breed_id')
        ->references('id')->on('breeds');
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down() {
    Schema::table('dogs', function(Blueprint $table){
      $table->dropForeign('dogs_breed_id_foreign');
    });
  }
}
