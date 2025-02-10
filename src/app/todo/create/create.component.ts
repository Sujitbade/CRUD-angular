import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TodoService } from '../todo.service';
import { Todo } from '../todo';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create',
  standalone: false,
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'] // Corrected property name
})
export class CreateComponent {

  todoForm: FormGroup;

  constructor(private todoService: TodoService) {
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
    

    this.todoService.addTodo(todo).subscribe(() => {
      this.todoForm.reset();
    });
  }
}
