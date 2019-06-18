<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\Tasks;

class TasksController extends Controller
{
    //
    public function index()
    {
        return Tasks::where(['is_deleted'=>0])->orderBy('id','desc')->get();
    }
 
    public function show($id)
    {
        return Tasks::find($id);
    }
    public function store(Request $request)
    {
        //return Tasks::create($request->all());
        // dd($request->title);
        $task=new Tasks;
        $task->title=$request->title;
        
       // dd($request->file('image'));
    //     $uploadedFile = $request->file('image');
    //     $filename = time().$uploadedFile->getClientOriginalName();

    //   Storage::disk('local')->putFileAs(
    //     'files/'.$filename,
    //     $uploadedFile,
    //     $filename
    //   );
        if($request->file('image'))
        {
            $files = $request->file('image');
           $destinationPath = 'public/image/'; // upload path
           $profileImage = date('YmdHis') . "." . $files->getClientOriginalExtension();
           $files->move($destinationPath, $profileImage);

      
            $task->image = asset($destinationPath.$profileImage);
        }

        $task->save();
        return $task;
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
