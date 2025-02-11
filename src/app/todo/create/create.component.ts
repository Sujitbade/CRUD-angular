import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TodoService } from '../todo.service';
import { Todo } from '../todo';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  standalone: false,
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {

  todoForm: FormGroup;
todos: any;

  constructor(private todoService: TodoService, private toastr:ToastrService, private router:Router) {
    this.todoForm = new FormGroup({
      task: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    });
  }

  onSave() {
    if (this.todoForm.invalid) {
      alert('Please fill in all required fields.');
      return;
    }

    const todo: Todo = {
      ...this.todoForm.value,
      completed:false
    };
    

    this.todoService.addTodo(todo).subscribe({
      next: () => {
        this.todoForm.reset();
        this.router.navigate(['home']);
        this.toastr.success('To-Do task added successfully');
      },
      error: (err: any) => {
        console.error('Error updating To-Do:', err);
        this.toastr.warning('To-Do error');
      }
    });
  }
}
