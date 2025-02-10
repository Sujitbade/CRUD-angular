import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';
import { Todo } from '../todo';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  todos: Todo[] = [];

  constructor(private todoService: TodoService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.todoService.getAllTodo().subscribe((result) => {
      this.todos = result;
    });
  }

  onRemove(id: number): void {
    if (confirm("Are you sure you want to delete this todo?")) {
      this.todoService.deleteTodo(id).subscribe({
        next: () => {
          this.todos = this.todos.filter(todo => todo.id !== id);
          this.toastr.success('Sucessfully deleted the task', 'Sucess', {
           timeOut: 3000,
         });
        },
        error: () => {
          this.toastr.error('Failed to delete todo');
        }
      });
    }
  }

  onCompleted(id: number): void {
    if (confirm("Do you want to mark this task as complete?")) {
      this.todoService.updateTaskState(id).subscribe({
        next: () => {
          this.todoService.getAllTodo().subscribe({
            next: (result) => {
              this.todos = result;
              this.toastr.success('Todo marked as complete');
            },
            error: () => {
              this.toastr.error('Failed to fetch updated todos');
            }
          });
        },
        error: () => {
          this.toastr.error('Failed to mark todo as complete');
        }
      });
    }
  }
}
