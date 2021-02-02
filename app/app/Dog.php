<?php

namespace App;

use Illuminate\Auth\Authenticatable;
use Laravel\Lumen\Auth\Authorizable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;

class Dog extends Model implements AuthenticatableContract, AuthorizableContract {
  use Authenticatable, Authorizable;

  public function breed(){
    return $this->belongsTo('App\Breed');
  }

  public function user(){
    return $this->belongsTo('App\User');
  }

  protected $fillable = [
    'displayName', 'photoURL', 'breed_id', 'user_id'
  ];
}
