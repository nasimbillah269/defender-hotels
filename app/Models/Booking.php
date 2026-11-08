<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    //Models Information Data
    /********
     * Column:
     * 
     * id               =bigint(20):None,
     * src_id           =int(11):null,
     * name             =varchar(200):null,
     * address          =text():null,
     * history          =text():null,
     * donate_amount    =floot(10,2):0.00,
     * raised_amount    =floot(10,2):0.00,
     * created_at       =timestamp:null
     * updated_at       =timestamp:null
     * 
     * 
     ****/
     
     public function imageFile(){
    	return $this->hasOne(Media::class,'src_id')->where('src_type',9)->where('use_Of_file',1);
    }

    public function image(){
        if($this->imageFile){
            return $this->imageFile->file_url;
        }else{
            return 'public/medies/noimage.jpg';
        }
    }


    public function category(){
        return $this->belongsTo(Post::class,'category_id');
    }
    

}
