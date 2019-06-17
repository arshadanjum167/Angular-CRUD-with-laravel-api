import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { HttpHeaders } from '@angular/common/http'

import { Observable } from 'rxjs'
import { catchError } from 'rxjs/operators'

import { Task } from './task'
import { HttpErrorHandler, HandleError } from '../http-error-handler.service'

@Injectable()
export class TasksService {
  private handleError: HandleError

  constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('TasksService')
  }

  getTasks(): Observable<Task[]> {
    return this.http
      .get<Task[]>('api/tasks')
      .pipe(catchError(this.handleError('getTasks', [])))
  }

  addTask(task: Task): Observable<Task> {
    return this.http
      .post<Task>('api/tasks', task)
      .pipe(catchError(this.handleError('addTask', task)))
  }

  
  deleteTask(task: Task): Observable<Task> {
    return this.http
      .post<Task>(`api/deletetask/${task.id}`, task)
      .pipe(catchError(this.handleError('updateTask', task)))
  }

  updateTask(task: Task): Observable<Task> {
    return this.http
      .post<Task>(`api/updatetask/${task.id}`, task)
      .pipe(catchError(this.handleError('updateTask', task)))
  }
}