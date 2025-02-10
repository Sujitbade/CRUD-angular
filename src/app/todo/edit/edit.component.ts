import { Component } from '@angular/core';
import {ToastrService} from 'ngx-toastr'
import { TodoService } from '../todo.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Todo } from '../todo';

@Component({
  selector: 'my-app',
  standalone: false,
  templateUrl: './edit.component.html',
  styleUrls: [ './edit.component.css' ]
})
export class EditComponent  {

  editedTodo : FormGroup;


  constructor(private todoService:TodoService){
    this.editedTodo = new FormGroup({
      task:new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    });
  }

  onSave(){
    if(this.editedTodo.invalid){
      alert('Please fill in all required fileds.')
      return;
    }
  }
}

