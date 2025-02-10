import { Component, OnInit } from '@angular/core';
import {ToastrService} from 'ngx-toastr'
import { TodoService } from '../todo.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Todo } from '../todo';
import { ActivatedRoute, Router } from '@angular/router';
import { __param } from 'tslib';

@Component({
  selector: 'my-app',
  standalone: false,
  templateUrl: './edit.component.html',
  styleUrls: [ './edit.component.css' ]
})
export class EditComponent implements OnInit {

  editedTodo : FormGroup;

  todos : Todo ={
    id: 0,
    task:"",
    description:"",
    completed: false
  }

  constructor(private todoService:TodoService , private router:Router, private route:ActivatedRoute, private toastr:ToastrService){
    this.editedTodo = new FormGroup({
      task:new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    });
  }
  ngOnInit(): void {
    //Getting the id from the route
    const id = this.route.paramMap.subscribe((params)=>{
      let id = String(params.get('id'));
      //Passing the id from the route to get method
      this.getById(id);
    })
  }

  getById(id:string){
    this.todoService.getTodobyId(id).subscribe((result)=>{
      this.todos = result;
      console.log(this.todos)
    })   
  }




  update() {
    if (!this.editedTodo || this.editedTodo.invalid) {
      alert('Please fill in all required fields.');
      return;
    }
  
    const todo: Todo = { ...this.editedTodo.value };
  

    const id = this.todos.id;
    this.todoService.updateTodo(id, todo).subscribe({
      next: () => {
        this.editedTodo.reset();
        this.router.navigate(['home'])
        this.toastr.success('To-Do updated successfully');
      },
      error: (err) => {
        console.error('Error updating To-Do:', err);
        this.toastr.warning('To-Do error');
      },
    });
  }
  

  cancel(){
    this.router.navigate(['home'])
  }
}

