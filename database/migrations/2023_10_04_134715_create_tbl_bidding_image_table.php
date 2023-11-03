<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTblBiddingImageTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tbl_bidding_image', function (Blueprint $table) {
            $table->id();
            $table->string('image',191);
            $table->unsignedBigInteger('item_fk');
            $table->foreign('item_fk')->references('id')->on('tbl_biddingitem')->onUpdate('cascade')->onDelete('cascade');
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
        Schema::dropIfExists('tbl_bidding_image');
    }
}
