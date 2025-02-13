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
  isModalOpen: boolean = false;
  modalTitle: string = "";
  modalMessage : string = "";
  modalCancelText : string ="";
  modalConfirmText : string ="";
  actionId : number = 0;
  selectedId? : number;

  todos: Todo[] = [];

  constructor(private todoService: TodoService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.todoService.getAllTodo().subscribe((result) => {
      this.todos = result;
    });
  }

  openModal(action:number, title: string, message : string, btnCancel:string, btnOktext:string, id?:number){
    this.actionId = action;
    this.modalTitle = title;
    this.modalMessage = message;
    this.modalCancelText = btnCancel;
    this.modalConfirmText = btnOktext;
    this.selectedId= id;
    this.isModalOpen = true;
  }

  closeModal(){
    this.isModalOpen = false;
  }
  
  handleConfirm() {
    this.isModalOpen = false;

    if (this.actionId === 1 && this.selectedId){
      this.todoService.updateTaskState(this.selectedId).subscribe({
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
    }else if(this.actionId ===2 && this.selectedId){
      this.todoService.deleteTodo(this.selectedId).subscribe({
        next: () => {
          this.todos = this.todos.filter(todo => todo.id !== this.selectedId);
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
  }