<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Validator as Validator;
use App\Http\Resources\UserResource;
use App\Traits\HttpResponses;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UsersController extends Controller
{
    use HttpResponses;
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $users = User::all();

        return $this->success(UserResource::collection($users), 'Users retrieved successfully.');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $input = $request->all();
        $input['password'] = "12345678";

        $validator = Validator::make($input, [
            'name' => 'required',
            'email' => 'required',
            'rol' => 'required',
        ]);

        if ($validator->fails()) {
            return $this->error($validator->errors(), 'Validation Error.', 400);
        }
        try {
            $user = User::create([
                'name' => $input['name'],
                'email' => $input['email'],
                'rol' => $input['rol'],
                'password' => Hash::make($input['password']),
            ]);
            return $this->success(new UserResource($user), 'User created successfully.');
        } catch (QueryException $e) {
            return $this->error($e, 'Error', 404);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $user = User::find($id);

        if (is_null($user)) {
            return $this->error([], 'User not found.', 404);
        }

        return $this->success(new UserResource($user), 'User retrieved successfully.');
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $idUser
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $idUser)
    {
        $user = User::find($idUser);

        if (is_null($user)) {
            return $this->error([], 'User not found.', 404);
        }
        $input = $request->all();

        $validator = Validator::make($input, [
            'name' => 'required',
            'email' => 'required',
            'rol' => 'required',
        ]);

        if ($validator->fails()) {
            return $this->error($validator->errors(), 'Validation Error.', 400);
        }

        $user->name = $input['name'];
        $user->email = $input['email'];
        $user->rol = $input['rol'];
        $user->save();

        return $this->success(new UserResource($user), 'User updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        $user->delete();

        return $this->success([], 'User deleted successfully.');
    }
}
