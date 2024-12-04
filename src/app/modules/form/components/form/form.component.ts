// form.component.ts
import { Component, OnInit } from '@angular/core';
// form interface
import { FormModel } from '../../interfaces/form.interface';
// modal 
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
// breakpoints for smaller screens 
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  selectedSport: string = '';
  sports: string[] = ['Futbal', 'Volejbal', 'Plávanie', 'Badminton', 'Stolný tenis'];
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
      const formData: FormModel = this.profileForm.value;
      console.log('Forma zaslaná:', formData);
      this.openModal('Form úspešne zaslaná');
    } else {
      this.profileForm.markAllAsTouched();
      this.openModal('Forma je neplatná. Prosím skontrolujte polia.');
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

    this.dialog.open(ModalComponent, {
      width: modalWidth,
      height: modalHeight,
      data: { message } 
    });
  }
}
