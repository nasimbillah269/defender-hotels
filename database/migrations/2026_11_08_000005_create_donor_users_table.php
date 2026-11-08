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
        Schema::create('donor_users', function (Blueprint $table) {
            $table->charset = 'utf8mb4';
            $table->collation = 'utf8mb4_general_ci';

            $table->integer('id', true);
            $table->integer('src_id')->nullable();
            $table->integer('purpose_id')->nullable();
            $table->string('name', 200)->nullable();
            $table->text('address')->nullable();
            $table->text('history')->nullable();
            $table->float('donate_amount', 10, 2)->default(0);
            $table->float('raised_amount', 10, 2)->default(0);
            $table->string('status', 20)->default('pending')->comment('pending, proceeding, completed, cancelled');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('donor_users');
    }
};
