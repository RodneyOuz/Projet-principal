<?php

namespace App\Http\Controllers;

use App\Dog;
use App\User;
use GenTux\Jwt\JwtToken;
use Illuminate\Hashing\BcryptHasher;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Illuminate\Http\Request;
use App\Utils;


class UserController extends Controller {

  private function selfOrAdmin($payload, User $user){
    return $payload['context']['isAdmin'] || $payload['sub'] === $user->id;
  }

  private function isAdmin($payload){
    return $payload['context']['isAdmin'];
  }

  public function login(JwtToken $jwt, Request $request) {
    try {
      $this->validate($request, [
        'email' => 'required|email',
        'password' => 'required'
      ]);
      $user = User::where('email', $request->json()->get('email'))->first();
      $password = $request->json()->get('password');
      if (!Hash::check($password, $user->password)) {
        return response()->json(['error' => 'Invalid credentials']);
      }
      $token = $jwt->createToken($user);
      return response()->json(['token' => $token]);
    } catch (ValidationException $e) {
      return response()->json(['error' => 'Invalid user data']);
    }
  }

  public function signup(JwtToken $jwt, Request $request) {
    try {
      $this->validate($request, [
        'email' => 'required|email|unique:users',
        'password' => 'required',
        'displayName' => 'required',
        'photoURL' => 'required'
      ]);
      $password = $request->json()->get('password');
      if(strlen($password) < 4){
        return response()->json(['error' => 'Invalid user data']);
      }
      $req = $request->json()->all();
      $user = User::create($req);
      $password = (new BcryptHasher)->make($password);
      $user->password = $password;
      $user->save();
      // TODO: Secret should be a env variable
      $token = $jwt->createToken($user);
      return response()->json(['token' => $token]);
    } catch (ValidationException $e) {
      return response()->json(['error' => 'Invalid user data']);
    }
  }

  public function resetPassword(JwtToken $jwt, Request $request, $id){
    $user = User::find($id);
    $payload = Utils::getPayload($jwt, $request);
    if(!$this->isAdmin($payload)){
      return response()
        ->json(["error" => "Unauthorized action"]);
    }
    $password = $request->json()->get('password');
    $user->password = (new BcryptHasher)->make($password);
    $user->save();
    return response()
      ->json(["message" => "Password updated with success"]);
  }

  public function update(JwtToken $jwt, Request $request, $id){
   $user = User::find($id);
   $payload = Utils::getPayload($jwt, $request);
   if(!$this->selfOrAdmin($payload, $user)){
     return response()
       ->json(["error" => "Unauthorized action"]);
   }
   $password = $request->json()->get('password');
   $oldPassword = $request->json()->get('oldPassword');
   $displayName = $request->json()->get('displayName');
   $email = $request->json()->get('email');

   if($password && $oldPassword){
     if (Hash::check($oldPassword, $user->password)) {
       $user->password = (new BcryptHasher)->make($password);
     }
   }

   $user->displayName = Utils::Either($displayName, $user->displayName);
   $user->email = Utils::Either($email, $user->email);
   $user->save();
   return response()
     ->json($user);
  }

  public function delete(JwtToken $jwt, Request $request, $id){
    $payload = Utils::getPayload($jwt, $request);
    $user = User::find($id);
    if(!$this->selfOrAdmin($payload, $user)){
      return response()
        ->json(["error" => "Unauthorized action"]);
    }
    Dog::where('user_id', $user->id)->delete();
    $user->delete();
    dd('dead');
    return response()
      ->json(["message" => "Profile deleted with success"]);
  }

  public function show($id) {
    $user = User::find($id);
    $user->dogs;
    return response()->json($user);
  }

  public function getAll(Request $request, JwtToken $jwt){
    $payload = Utils::getPayload($jwt, $request);
    if(!$this->isAdmin($payload)){
      return response()
        ->json(["error" => "Unauthorized action"]);
    }
    $users = User::all();
    return response()->json($users);
  }

  public function create(Request $request) {
    $req = $request->json()->all();
    $user = User::create($req);
    $user->save();
    return $user->toJson();
  }
}