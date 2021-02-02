<?php

namespace App\Http\Controllers;

use App\Dog;
use App\Utils;
use GenTux\Jwt\JwtToken;
use Illuminate\Validation\ValidationException;
use Illuminate\Http\Request;


class DogController extends Controller {

  public function isOwnerOrAdmin($payload, Dog $dog){
    return $payload['context']['isAdmin'] || $dog->user_id === $payload['sub'];
  }

  public function show($id) {
    $dog = Dog::find($id);
    $dog->breed;
    $dog->user;
    return response()->json($dog);
  }

  public function getAll(Request $request){
    $dogs = null;
    $user_id = $request->input('user_id');
    $breed_id = $request->input('breed_id');
    if($user_id && $breed_id){
      $dogs = Dog::where('user_id', $user_id)
        ->where('breed_id', $breed_id)
        ->get();
    }
    else if($user_id){
      $dogs = Dog::where('user_id', $user_id)->get();
    } else if ($breed_id){
      $dogs = Dog::where('breed_id', $breed_id)->get();
    } else {
      $dogs = Dog::all();
    }
    foreach ($dogs as $dog){
      $dog->breed;
    }
    return response()->json($dogs);
  }

  /**
   * Only the owner of the ressource and the admins are able
   * to udpate said ressource
   */
  public function updateDog(JwtToken $jwt, Request $request, $id){
    $payload = Utils::getPayload($jwt, $request);
    $dog = Dog::find($id);
    if(!$this->isOwnerOrAdmin($payload, $dog)){
      return response()
        ->header('Status', '401')
        ->json(["error" => "Unauthorized action"]);
    }
    $dog->displayName = $request->json()->get('displayName');
    $dog->photoURL = $request->json()->get('photoURL');
    $dog->breed_id = $request->json()->get('breed_id');
    $dog->save();
    return response()->json($dog);
  }

  public function deleteDog(JwtToken $jwt, Request $request, $id){
    $payload = Utils::getPayload($jwt, $request);
    $dog = Dog::find($id);
    if(!$this->isOwnerOrAdmin($payload, $dog)){
      return response()
        ->header('Status', '401')
        ->json(["error" => "Unauthorized action"]);
    }
    $dog->delete();
    return response()->json(["message" => "Dog deleted with success"]);
  }

  public function create(JwtToken $jwt, Request $request) {
    try {
      $this->validate($request, [
        'displayName' => 'required',
        'photoURL' => 'required',
        'breed_id' => 'required'
      ]);
      $payload = Utils::getPayload($jwt, $request);
      $user_id = $payload['sub'];
      $req = $request->json()->all();
      //dd($req);
      $dog = Dog::create($req);
      $dog->user_id = $user_id;
      $dog->save();
      return response()->json($dog);
    } catch(ValidationException $e){
      return response()->json(['error' => 'Invalid dog data']);
    }
  }
}