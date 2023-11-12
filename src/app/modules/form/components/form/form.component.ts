import { Component, OnInit } from '@angular/core';
// modal import 
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent implements OnInit {

  selectedSport: string = '';
  sports: string[] = ['Football', 'Volleyball', 'Swimming', 'Badminton', 'Table Tennis'];
  profileForm!: FormGroup;

  constructor(private fb: FormBuilder, public dialog: MatDialog, private breakpointObserver: BreakpointObserver) {}

  ngOnInit() {
    this.profileForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(25)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      age: [null, [Validators.required, Validators.min(0)]],
      prevAttended: [false],
      sport: ['', [Validators.required]],
      comment: ['', [Validators.maxLength(4000)]],
    });
  }

  onSubmit() {
    if (this.profileForm.valid) {
      // Form is valid, submit the form
      console.log('Form submitted:', this.profileForm.value);
      this.openModal('Form submitted successfully');
    } else {
      // Form is invalid, show an error 
      this.profileForm.markAllAsTouched();
      this.openModal('Form is invalid. Please check the fields.');
    }
  }
  
  openModal(message: string) {
    let modalWidth = '500px';
    let modalHeight = '100px';
  
    // Config for small screens
    if (this.breakpointObserver.isMatched(Breakpoints.Small)) {
      modalWidth = '90%';
      modalHeight = '90%';
    }
  
    const dialogRef = this.dialog.open(ModalComponent, {
      width: modalWidth,
      height: modalHeight,
      data: { message } 
    });
  }
  
}
