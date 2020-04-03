<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use App\project;
class ProjectController extends Controller{

    public function create(Request $request){
        $creator = $request->user();
        $creator_id = $creator["id"];
        $request->validate([
            'name' => 'required|string'
        ]);
       
        $user = auth()->user();
        $project = new project([
            "projectName"=>$request->name,
            "created_by"=>$user->id
        ]);

       
        $project->save();
        $id = $project->id;
        return response()->json(["message"=>"Project created!", "project_id"=>$id]);

    }

    public function invite(Request $request){
        $creator = $request->user();
        $creator_id = $creator->id;
        $project_id = $request->project_id;
       
        
        $project = project::where('project_id', $project_id)->where('created_by', $creator_id)->first();
        if($project === null){
            return response()->json(['message'=>'project not found'], 404);
        }

        return response()->json(['project'=>$project, 'id'=>$project_id]);
    }

}