<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use App\project;
use App\User;
use App\member_link;
use App\column;
use App\ticket;
use App\ticket_assignee;
use App\sprint;


class TicketController extends Controller{

    public function createTicket(Request $request){
        $rUser = $request->user();
        

        if(!in_project($rUser->id, $request->project_id)){
            return response()->json(['message'=>"You don't have the rights to visit this page", "proj"=>$request->project_id], 403);
        }

        $request->validate([
            'title' => 'required|string',
            'description' => 'required|string',
            'priority' => 'string',
            'project_id' => 'required|integer',
            'storypoints' => 'required|integer'
        ]);

        $lastTicket = ticket::where('project_fk_id', '=', $request->project_id)->orderBy('ticketNumber', 'desc')->first();
        $lastTicketNum = ($lastTicket === null) ? 0 : intval($lastTicket->ticketNumber);

        $backlog = column::where('project_fk_id', '=', $request->project_id)->where('type', '=', 'backlog')->first();
        $sprint = sprint::where('project_fk_id', '=', $request->project_id)->where('sprintNumber', '=', 0)->first();


        // return response()->json(["backlog"=>$backlog]);

        $ticket = new ticket([
            'ticketTitle'=>$request->title,
            'ticketDescription'=>$request->description,
            'priority'=>$request->priority,
            'status'=>'backlog',
            'storyPoints'=>$request->storypoints,
            'ticketNumber' => $lastTicketNum+1,
            'project_fk_id' => $request->project_id,
            'column_fk_id' => $backlog->column_id,
            'sprint_fk_id'=> $sprint->sprint_id,
            'created_by' => $rUser->id,

        ]);
        $ticket->save();

        $ticket_id = $ticket->id;

        foreach($request->assignees as $assignee){
            $ta = new ticket_assignee([
                "ticket_fk_id"=>$ticket_id,
                "user_fk_id"=>$assignee,
            ]);

            $ta->save();
        }

        return response()->json(['message'=>'ticket successfully created'], 200);

    }

    public function updateTicket(Request $request){
        $rUser = $request->user();
        if(!in_project($rUser->id, $request->project_id)){
            return response()->json(['message'=>"You don't have the rights to visit this page"], 403);
        }

        $request->validate([
            'title' => 'required|string',
            'description' => 'required|string',
            'priority' => 'boolean',
            'project_id' => 'required|integer',
            'storypoints' => 'required|integer'
        ]);

        ticket::where('ticket_id', '=', $request->ticket_id)->update([
            'ticketTitle'=>$request->title,
            'ticketDescription'=>$request->description,
            'priority'=>$request->priority,
            'storyPoints'=>$request->storypoints,
        ]);


        return response()->json(['message'=>'ticket successfully updated'], 200);
    }

    public function deleteTicket(Request $request){
        $rUser = $request->user();
        if(!in_project($rUser->id, $request->project_id)){
            return response()->json(['message'=>"You don't have the rights to visit this page"], 403);
        }

        $assigneeLink = ticket_assignee::where('ticket_fk_id', '=', $request->ticket_id)->get();

        foreach($assigneeLink as $assignee){
            $assignee->forceDelete();
        }

        $ticket = ticket::where('ticket_id', '=', $request->ticket_id)->get()->forceDelete();

        return response()->json(['message'=>'ticket successfully deleted'], 200);

    }

    public function addAssignee(Request $request){
        $rUser = $request->user();
        if(!in_project($rUser->id, $request->project_id)){
            return response()->json(['message'=>"You don't have the rights to visit this page"], 403);
        }

        $assigneeLink = ticket_assignee::where('ticket_fk_id', '=', $request->ticket_id)->get();

        foreach($assigneeLink as $assignee){
            if($assignee->id === $request->assignee){
                return response()->json(['message'=>'user is already an assignee'], 409);
            }
        }

        $assignee = new ticket_assignee(
            [
            "ticket_fk_id"=>$request->ticket_id,
            "user_fk_id"=>$request->assignee
            ]
        );

        $assignee->save();

        return response()->json(['message'=>"Assignee succesfully added"], 200);

    }

    public function removeAssignee(Request $request){
        $rUser = $request->user();
        if(!in_project($rUser->id, $request->project_id)){
            return response()->json(['message'=>"You don't have the rights to visit this page"], 403);
        }

        ticket_assignee::where('user_fk_id', '=', $request->assignee)->get()->forceDelete();
        return response()->json(['message'=>"Assignee succesfully added"], 200);

    }


    public function getTickets(Request $request){
        $rUser = $request->user();
        $ticketData = null;

        if(!in_project($rUser->id, $request->project_id)){
            return response()->json(['message'=>"You don't have the rights to visit this page"], 403);
        }

        $tickets = ticket::where('project_fk_id', '=', $request->project_id)->get();
        
        if($tickets === null){
            

        }

        foreach($tickets as &$ticket){
            $ticketAssignees = array();
            $assignees = ticket_assignee::where('ticket_fk_id', '=', $ticket->ticket_id)->get();
            foreach($assignees as $assignee){
                $ticketAssignees[] = User::find($assignee->user_fk_id);
            }
            $ticket["assignees"] = $ticketAssignees;
            $ticketData[] = $ticket;

        }


        return response()->json(["tickets"=>$tickets], 200);

    }


    public function getTicket(Request $request){
        $rUser = $request->user();
        $ticketData = [];
    
        if(!in_project($rUser->id, $request->project_id)){
            return response()->json(['message'=>"You don't have the rights to visit this page"], 403);
        }
    
        $ticket = ticket::where('project_fk_id', '=', $request->project_id)->get();
        
        if($ticket === null){
            return response()->json(['message'=>"Ticket not found"], 404);
        }
    
        $assignees = ticket_assignee::where('ticket_fk_id', '=', $ticket->ticket_id)->get();
    
        $ticketAssignees = array();
    
        foreach($assignees as &$assignee){
                $ticketAssignees[] = User::find($assignee->user_fk_id);
            
            $ticket["assignees"] = $ticketAssignees;
            
        }
    
        
        $ticket["assignees"] = $ticketAssignees;
    
        return response()->json(["ticket"=>$ticket], 200);
    
    }
    
}


