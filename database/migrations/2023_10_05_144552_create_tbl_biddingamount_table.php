<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTblBiddingamountTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tbl_biddingamount', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('bidding_amt_fk');
            $table->foreign('bidding_amt_fk')->references('id')->on('tbl_biddingitem')->onDelete('cascade')->onUpdate('cascade');
            $table->double('amount_bidding',10,2);
            $table->unsignedBigInteger('bidding_item_user_fk');
            $table->foreign('bidding_item_user_fk')->references('id')->on('users')->onDelete('cascade')->onUpdate('cascade');
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
        Schema::dropIfExists('tbl_biddingamount');
    }
}
