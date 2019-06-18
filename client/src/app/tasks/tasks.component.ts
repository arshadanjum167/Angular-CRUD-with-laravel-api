import { Component, OnInit } from '@angular/core'

import { Task } from './task'
import { TasksService } from './tasks.service'

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  providers: [TasksService]
})
export class TasksComponent implements OnInit {
  tasks: Task[]
  editTask: Task
  fileData: File = null;

  constructor(private taskService: TasksService) {}

  ngOnInit() {
    this.getTasks()
    // console.log(this);
  }

  getTasks(): void {
    this.taskService.getTasks().subscribe(tasks => (this.tasks = tasks))
  }
  fileProgress(fileInput: any) {
    // console.log('l');
    this.fileData = <File>fileInput.target.files[0];
    
  }
  onSubmit(form) {
    
    if(form.value.title!='')
    {
      const formData = new FormData();
      formData.append('image', this.fileData);
      formData.append('title', form.value.title);
      // console.log(this.fileData);
      // this.http.post('url/to/your/api', formData)
      //   .subscribe(res => {
      //     console.log(res);
      //     alert('SUCCESS !!');
      //   })
      //const newTask: Task = formData as Task
      this.taskService.addTask(formData).subscribe()
      this.getTasks();
      
      //console.log(form);
    }
}
  add(title: string): void {
    this.editTask = undefined
    title = title.trim()
    if (!title) {
      return
    }

    const newTask: Task = { title } as Task
    this.taskService.addTask(newTask).subscribe(task => this.tasks.push(task))
  }

//   delete(task: Task): void {
//     this.tasks = this.tasks.filter(h => h !== task)
//     this.taskService.deleteTask(task.id).subscribe()
//   }

  edit(task) {
    this.editTask = task
  }

  update() {
    if (this.editTask) {
      this.taskService.updateTask(this.editTask).subscribe(task => {
        const ix = task ? this.tasks.findIndex(h => h.id === task.id) : -1
        if (ix > -1) {
          this.tasks[ix] = task
        }
      })
      this.editTask = undefined
      this.getTasks()
    }
  }
  delete(task) {
    //   console.log(task.id);
    //   this.tasks = this.tasks.filter(h => h !== task)
      var a=confirm('Do you want to delete this record?');
      if(a)
      {
        this.taskService.deleteTask(task).subscribe()
        this.getTasks()
      }
    }
  
}