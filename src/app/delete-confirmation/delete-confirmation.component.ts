import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-confirmation',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './delete-confirmation.component.html',
  styleUrl: './delete-confirmation.component.css'
})
export class DeleteConfirmationComponent {
  wantDelete = false ;

  constructor(private matdialog : MatDialogRef<DeleteConfirmationComponent>){}

  delete() {
    this.matdialog.close(true); 
  }

  cancelDelete() {
    this.matdialog.close(false) ;
  }
}
