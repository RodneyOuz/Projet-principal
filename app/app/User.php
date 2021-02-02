<?php

namespace App;

use GenTux\Jwt\JwtPayloadInterface;
use Illuminate\Auth\Authenticatable;
use Laravel\Lumen\Auth\Authorizable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;

class User extends Model implements AuthenticatableContract, AuthorizableContract, JwtPayloadInterface {
  use Authenticatable, Authorizable;

  public function getPayload(){
    return [
      'sub' => $this->id,
      'exp' => time() + 7200,
      'context' => [
        'email' => $this->email,
        'isAdmin' => $this->isAdmin
      ]
    ];
  }

  public function dogs(){
    return $this->hasMany('App\Dog');
  }

  /**
   * The attributes that are mass assignable.
   *
   * @var array
   */
  protected $fillable = [
    'displayName', 'email', 'photoURL'
  ];

  /**
   * The attributes excluded from the model's JSON form.
   *
   * @var array
   */
  protected $hidden = [
    'password'
  ];
}
