import { Component, OnInit } from '@angular/core';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { CommunicatorService } from '../communicator.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatInputModule, MatDatepickerModule, MatIconModule, MatNativeDateModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent  {

  minDate : Date ;
  selectedDate$ : Observable<string | null> ;

  constructor(private commService: CommunicatorService) {
    this.minDate = new Date(); 
    this.selectedDate$ = this.commService.selectedDate$ ;
  }

 ondatechange(event: any) {
    const date : Date = event.target.value ; 
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Add 1 because months are 0-indexed
    const day = date.getDate().toString().padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;
    this.commService.signalchange(formattedDate) ;

    
    
 }
}
