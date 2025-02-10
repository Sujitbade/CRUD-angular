import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Todo } from './todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private apiUrl = "http://localhost:3000/todos"

  constructor(private http:HttpClient) { }

  getAllTodo () : Observable<Todo[]> {
    return this.http.get<Todo[]>(this.apiUrl);
  }
  addTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.apiUrl, todo);
  }
  
  updateTodo(id: number, todo: Todo): Observable<Todo> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Todo>(url, todo);
  }
  
  deleteTodo(id: number): Observable<Todo> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<Todo>(url);
  }

  updateTaskState(id: number): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}`, { completed: true });
  }
}
