import { Component, EventEmitter, Input,OnInit,Output } from '@angular/core';

@Component({
  selector: 'app-confirmation-modal',
  standalone: false,
  templateUrl: './confirmation-modal.component.html',
  styleUrl: './confirmation-modal.component.css'
})
export class ConfirmationModalComponent implements OnInit{
  @Input() showModal: boolean = false;
  @Input() title: string = '';
  @Input() message: string = '';
  @Input() btnOktext: string = '';
  @Input() btnCancel: string = '';

  @Output() confirmEvent = new EventEmitter<void>();
  @Output() cancelEvent = new EventEmitter<void>();

  ngOnInit(): void {
  }

  confirm(){
    this.confirmEvent.emit();
  }

  cancel(){
    this.cancelEvent.emit()
  }
}
