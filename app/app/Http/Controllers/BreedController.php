<?php

namespace App\Http\Controllers;

use App\Breed;
use App\Dog;
use App\Utils;
use GenTux\Jwt\JwtToken;
use Illuminate\Validation\ValidationException;
use Illuminate\Http\Request;
use Mockery\Exception;


class BreedController extends Controller {

  public function isAdmin($payload){
    return $payload['context']['isAdmin'];
  }

  public function show($id) {
    $breed = Breed::find($id);
    return response()->json($breed);
  }

  public function getAll(){
    $breed = Breed::all();
    return response()->json($breed);
  }

  /*
   * Anyone can update the breeds names
   */
  public function update(Request $request, $id){
    $breed = Breed::find($id);
    $breed->name = $request->json()->get('name');
    $breed->save();
    return response()->json($breed);
  }

  /**
   * Only allow admins to delete dog breeds
   */
  public function delete(JwtToken $jwt, Request $request, $id){
    $payload = Utils::getPayload($jwt, $request);
    $breed = Breed::find($id);
    //dd($this->isAdmin($payload));
    if(!$this->isAdmin($payload)){
      return response()
        ->header('Status', '401')
        ->json(["error" => "Unauthorized action"]);
    }
    Dog::where('breed_id', $id)->delete();
    $breed->delete();
    return response()->json(["message" => "Breed deleted with success"]);
  }

  public function create(Request $request) {
    try {
      $this->validate($request, [
        'name' => 'required',
      ]);
      $req = $request->json()->all();
      $breed = Breed::create($req);
      $breed->save();
      return response()->json(["data" => $breed]);
    } catch(ValidationException $e){
      return response()->json(['error' => 'Invalid Breed data']);
    }
  }
}