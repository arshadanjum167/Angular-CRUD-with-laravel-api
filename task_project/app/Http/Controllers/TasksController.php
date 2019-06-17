<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Tasks;

class TasksController extends Controller
{
    //
    public function index()
    {
        return Tasks::where(['is_deleted'=>0])->get();
    }
 
    public function show($id)
    {
        return Tasks::find($id);
    }
    public function store(Request $request)
    {
        return Tasks::create($request->all());
    }
    public function update(Request $request, $id)
    {
        $task = Tasks::findOrFail($id);
        $task->update($request->all());
        return $task;
    }
    public function delete(Request $request, $id)
    {
        $task = Tasks::findOrFail($id);
        $task->is_deleted=1;
        $task->save();
        return 204;
    }
}
