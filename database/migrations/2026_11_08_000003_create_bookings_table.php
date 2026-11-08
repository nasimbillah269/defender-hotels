<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('bookings', function (Blueprint $table) {
            $table->charset = 'utf8mb4';
            $table->collation = 'utf8mb4_general_ci';

            $table->integer('id', true);
            $table->integer('src_id')->nullable();
            $table->string('name', 200)->nullable();
            $table->date('booking_date')->nullable();
            $table->string('mobile', 100)->nullable();
            $table->string('email', 100)->nullable();
            $table->text('address')->nullable();
            $table->integer('quantity')->default(0);
            $table->integer('category_id')->nullable();
            $table->float('amount', 10, 2)->default(0);
            $table->float('booking_amount', 10, 2)->default(0);
            $table->float('total_amount', 10, 2)->default(0);
            $table->string('payment_method', 100)->nullable();
            $table->string('nid_number', 100)->nullable();
            $table->text('bank_details')->nullable();
            $table->tinyInteger('type')->default(0)->comment('0=booking');
            $table->string('status', 20)->default('temp')->comment('temp, pending, active, cancelled');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};
