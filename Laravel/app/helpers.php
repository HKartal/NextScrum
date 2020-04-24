<?php
    use App\member_link;
    use App\project;


function in_project($user_id, $project_id){
    $project = project::where('project_id', '=', $project_id)->first();
    
    if($project === null) return false;

    if($project->created_by === $user_id) return true;

    $members = member_link::where('project_fk_id', '=', $project_id)->where('user_fk_id', '=', $user_id)->get();

    if($members->isEmpty()) return false;

    return true;

}
