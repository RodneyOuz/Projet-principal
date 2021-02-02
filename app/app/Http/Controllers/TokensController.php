<?php

namespace App\Http\Controllers;

use GenTux\Jwt\JwtToken;

class TokensController extends Controller {
  /**
   * Create a new controller instance.
   *
   * @return void
   */
  public function __construct() {
    //
  }

  public function create(JwtToken $jwt){
    $user = User::find(1);
    $token = $jwt->createToken($user);

    return $token->payload();
  }

  //
}
