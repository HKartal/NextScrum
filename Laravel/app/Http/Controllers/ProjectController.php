<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use App\project;
use App\User;
use App\member_link;
use App\column;
use App\sprint;

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
        $project_id = $project->id;

        $backlog = new column([
            'columnName' => 'backlog',
            'position' => 0,
            'type' => 'backlog',
            'visible' => true,
            'project_fk_id' => $project_id
        ]);

        $todo = new column([
            'columnName' => 'todo',
            'position' => 1,
            'type' => 'todo',
            'visible' => true,
            'project_fk_id' => $project_id
        ]);

        $doing = new column([
            'columnName' => 'in progress',
            'position' => 2,
            'type' => 'doing',
            'visible' => true,
            'project_fk_id' => $project_id
        ]);

        $done = new column([
            'columnName' => 'done',
            'position' => 3,
            'type' => 'done',
            'visible' => true,
            'project_fk_id' => $project_id
        ]);

        $sprint = new sprint([
            'sprintNumber'=>0,
            'sprintDuration'=>14,
            'project_fk_id'=>$project_id
        ]);

        $backlog->save();
        $todo->save();
        $doing->save();
        $done->save();
        $sprint->save();

        return response()->json(["message"=>"Project created!", "project_id"=>$project_id]);

    }

    public function invite(Request $request){
        $creator = $request->user();
        $creator_id = $creator->id;
        $project_id = $request->project_id;
        $toInvite = $request->toInvite;

        $userToInvite = user::find($toInvite);

        
        
        $project = project::where('project_id', $project_id)->where('created_by', $creator_id)->first();
        if($project === null){
            return response()->json(['message'=>'project not found'], 404);
        }

        if($userToInvite === null){
            return response()->json(['message'=>'user not found'], 404);
        }

        $members = member_link::where('project_fk_id', '=', $project_id)->get();

        foreach($members as $member){
            if($member->user_fk_id === $toInvite){

                return response()->json(["message"=>"user already invited"], 409);
            }
        }

        $userInf = user::find($creator_id);

         $link = new member_link([
            "project_fk_id" => $project->project_id,
            "user_fk_id" => $userToInvite->id,
            "accepted" => false,
        ]);
        
        $link->save();

        return response()->json(['project'=>$project, 'id'=>$project_id, "creator_info"=>$userInf, "toInvite"=>$userToInvite, "members"=>$members]);
    }

    public function deleteInvite(Request $request){

        $request->validate([
            'toRemove' => 'required|int',
            'project_id' => 'required|int',
        ]);

        $creator = $request->user();
        $creator_id = $creator->id;
        $toRemove = $request->toRemove;
        $project_id = $request->project_id;

        member_link::where('user_fk_id', '=', $toRemove)->where('project_fk_id', '=', $project_id)->forceDelete();

        return response()->json(['message'=>'invite deleted'], 200);
    }

    public function acceptInvite(Request $request){
        $project_id = $request->project_id;
        $rUser = $request->user();


        $members = member_link::where('project_fk_id', '=', $project_id)->where('user_fk_id', '=', $rUser->id)->where('accepted', '=', 0)->get();
        if($members->isEmpty()){
            return response()->json(['message'=>"invite not found"], 404);
        }

        member_link::where('project_fk_id', '=', $project_id)->where('user_fk_id', '=', $rUser->id)->update(['accepted'=>1]);

        return response()->json(["message"=>"invite accepted"], 200);


    }

    public function declineInvite(Request $request){
        $project_id = $request->project_id;
        $rUser = $request->user();


        $members = member_link::where('project_fk_id', '=', $project_id)->where('user_fk_id', '=', $rUser->id)->where('accepted', '=', 0)->get();
        if($members->isEmpty()){
            return response()->json(['message'=>"invite not found"], 404);
        }

        member_link::where('project_fk_id', '=', $project_id)->where('user_fk_id', '=', $rUser->id)->forceDelete();

        return response()->json(["message"=>"invite declined"], 200);


    }

    public function getMembers(Request $request){
        $project_id = $request->project_id;
        $rUser = $request->user();
        $memberData = array();


        if(!in_project($rUser->id, $request->project_id)){
            return response()->json(['message'=>"You don't have the rights to visit this page"], 403);
        }

        $creator = project::where('project_id', '=', $project_id)->first()->created_by;

        $memberData[] =  User::find($creator);

        $members = member_link::where('project_fk_id', '=', $project_id)->get();
       
        foreach($members as $member){
            $memberData[] = User::find($member->user_fk_id);
        }
      


        return response()->json(["members"=>$memberData], 200);


    }

}