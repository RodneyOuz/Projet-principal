<?php

namespace App\Http\Middleware;

use Closure;
use GenTux\Jwt\GetsJwtToken;
use GenTux\Jwt\JwtToken;

class JWTMiddleWare {

  private $jwt;

  function __construct(JwtToken $jwt) {
    $this->jwt = $jwt;
  }

  public function handle($request, Closure $next, $guard = null) {
    $token = $request->headers->get('Authorization');
    $isValid = $this->jwt->setSecret('yolo')->setToken($token)->validate();
    if($isValid){
      return $next($request);
    }
    return response()->json(["message" => "Invalid token"]);
  }
}
