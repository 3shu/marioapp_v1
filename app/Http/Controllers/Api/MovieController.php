<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Movie;
use Illuminate\Support\Facades\Validator as Validator;
use App\Http\Resources\MovieResource;
use App\Traits\HttpResponses;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Auth;

class MovieController extends Controller
{
    use HttpResponses;
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $id = Auth::id();
        // $movies = Movie::all();
        $movies = Movie::where('user_id', $id)->get();

        return $this->success(MovieResource::collection($movies), 'Movies retrieved successfully.');
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
        $id = Auth::id();
        $input['user_id'] = $id;

        $validator = Validator::make($input, [
            'title' => 'required',
            'overview' => 'required',
            'poster' => 'required',
            'id_movie' => 'required',
        ]);

        if($validator->fails()){
            return $this->error($validator->errors(),'Validation Error.',400);
        }
        try {
            $movie = Movie::create($input);
            return $this->success(new MovieResource($movie), 'Movie created successfully.');
        } catch (QueryException $e)
        {
            return $this->error($e,'Error', 404);
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
        $movie = Movie::find($id);

        if (is_null($movie)) {
            return $this->error([],'Movie not found.',404);
        }

        return $this->success(new MovieResource($movie), 'Movie retrieved successfully.');
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $idMovie
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $idMovie)
    {
        $movie = Movie::find($idMovie);

        if (is_null($movie)) {
            return $this->error([],'Movie not found.',404);
        }
        $input = $request->all();
        $id = Auth::id(); $id;
        $validator = Validator::make($input, [
            'title' => 'required',
            'overview' => 'required',
            'poster' => 'required',
            'id_movie' => 'required',
        ]);

        if($validator->fails()){
            return $this->error($validator->errors(),'Validation Error.',400);
        }

        $movie->title = $input['title'];
        $movie->overview = $input['overview'];
        $movie->poster = $input['poster'];
        $movie->view = $input['view'];
        if (isset($input['comment']) && $input['comment'] <> '') {
            $movie->comment = $input['comment'];
        }
        $movie->id_movie = $input['id_movie'];
        $movie->user_id = $id;
        $movie->save();

        return $this->success(new MovieResource($movie), 'Movie updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Movie $movie)
    {
        $movie->delete();

        return $this->success([], 'Movie deleted successfully.');
    }
}
