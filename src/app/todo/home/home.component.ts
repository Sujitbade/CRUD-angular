import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';
import { Todo } from '../todo';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationModalService } from '../confirmation-modal/confirmation-modal.service';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  todos: Todo[] = [];

  constructor(private todoService: TodoService, private toastr: ToastrService, private confirmationDialogService:ConfirmationModalService) {}

  ngOnInit(): void {
    this.todoService.getAllTodo().subscribe((result) => {
      this.todos = result;
    });
  }

  onRemove(id: number): void {
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

  openConfirmationDialog(id: number) {
    this.confirmationDialogService
      .confirm('Complete Task', 'Are you sure you want to mark the task as completed?')
      .then((confirmed) => {
        if (confirmed) {
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
        } else {
          console.log("User dismissed");
        }
      })
      .catch(() => console.log("Modal dismissed unexpectedly"));
  }
}
