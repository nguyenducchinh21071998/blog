<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class UserClassRoom extends Model
{
    use SoftDeletes;

    /**
     * The attributes that should be mutated to dates.
     *
     * @var array
     */
    protected $dates = ['deleted_at'];
    
    /**
     * The attributes that are mass assignable.
     *UserClassRoom
     * @var array
     */
    protected $fillable = [
        'class_room_id', 'user_id', 'type', 'class_room_unit_id'
    ];
    // public $timestamps = false;
    
    public function user()
    {
        return $this->belongsTo('App\Models\User', 'user_id');
    }    
// get list manager by class
    public static function manager_class($id_classRoom){
    	$list_manager=UserClassRoom::where('class_room_id',$id_classRoom)->orderBy('class_room_id','desc')->paginate(env('PAGES'));
    	return $list_manager;
    }
// search add manager class
    public static function search_add_user_class($keyword){
        if ($keyword=="") {
          $finder = User::select('name','id','email','mobile')->offset(10)
                ->limit(5)
                ->get();
        }else{
            $finder = User::where('name', 'LIKE', "%" . $keyword. "%")
                    ->orWhere('mobile', 'LIKE', "%" . $keyword . "%")
                    ->orWhere('email', 'LIKE', "%" . $keyword . "%")
                    ->orderBy('id', 'desc')
                    ->select('id','name','mobile')->get();
        }
    return $finder;
    } 
// check exits manager class
    public static function check_manager_class($class_room_id,$manager_id){
        $check=UserClassRoom::where('class_room_id',$class_room_id)->where('user_id',$manager_id)->count();
        return $check ;  
    }
// add user class roomư
    public static function add_manager_class_room($class_room_id,$manager_id,$type_manager){
        $manager =new UserClassRoom;
        $manager->class_room_id=$class_room_id;
        $manager->user_id=$manager_id;
        $manager->type=$type_manager;
        $manager->save();
        return $manager;       
    }
}
