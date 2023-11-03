<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTblBiddinginfoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tbl_biddinginfo', function (Blueprint $table) {
            $table->id();
            $table->string('address');
            $table->unsignedBigInteger('bidding_brgy_fk');
            $table->foreign('bidding_brgy_fk')->references('id')->on('tbl_barangay_coordinates')->onDelete('cascade')->onUpdate('cascade');
            $table->unsignedBigInteger('bidding_item_fk');
            $table->foreign('bidding_item_fk')->references('id')->on('tbl_biddingitem')->onDelete('cascade')->onUpdate('cascade');
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
        Schema::dropIfExists('tbl_biddinginfo');
    }
}
