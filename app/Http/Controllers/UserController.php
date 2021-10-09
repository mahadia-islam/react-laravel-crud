<?php

namespace App\Http\Controllers;

use App\Models\User;
use Exception;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $user = User::all();
        return response()->json($user);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try{
            $user = User::create([
                "name" => $request->username,
                "email" => $request->email,
                "password" => $request->password
            ]);
            return response()->json([
                "status" => 200,
                "message"=> "user added successfully",
                "success" => true
            ]);
        }catch(Exception $e){
            return response()->json([
                "status" => 500,
                "message" => $e->getMessage(),
                "success" => false
            ]);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($user)
    {
        $editUser = User::find($user);
        return response()->json([
            "user" => $editUser
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $user)
    {
        try{
            $user = User::where('id', $user)->update([
                "name" => $request->name,
                "email" => $request->email,
                "password" => $request->password
            ]);

            return response()->json([
                "status" => 200,
                "message" => "user updated successfully",
                "success" => true
            ]);
        }catch(Exception $e){
            return response()->json([
                "status" => 500,
                "message" => "user updated failed",
                "success" => false
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($user)
    {
        try{
            $findUser = User::find($user);
            $findUser->delete();
            return response()->json([
                "message" => "user deleted successfully",
                "success" => true,
                "status" => 200
            ]);
        }catch(Exception $e){
            return response()->json([
                "message" => "user delete failed",
                "success" => false,
                "status" => 500
            ]);
        }
    }
}
