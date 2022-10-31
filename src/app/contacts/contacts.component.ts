import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

//interface for Contact
interface Contact {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  address1: string;
  address2: string;
  city: string;
  zipCode: string;
}



@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})

export class ContactsComponent implements OnInit {
  fg!: FormGroup;
  contacts: any[] = []
  update: boolean = false
  save: boolean = true

  //get the form field as a form control. it will useful for validation and etc
  get firstNameField(): FormControl {
    return this.fg.get('firstName') as FormControl;
  }

  get lastNameField(): FormControl {
    return this.fg.get('lastName') as FormControl;
  }

  get emailField(): FormControl {
    return this.fg.get('email') as FormControl;
  }

  get address1Field(): FormControl {
    return this.fg.get('address1') as FormControl;
  }

  get address2Field(): FormControl {
    return this.fg.get('address2') as FormControl;
  }

  get zipCodeField(): FormControl {
    return this.fg.get('zipCode') as FormControl;
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
  }

  //form init. here we create the reactive form. https://angular.io/guide/reactive-forms
  initForm(): void {
    let id = Date.now() * Math.random();
    this.fg = this.fb.group({
      id: [id],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      address1: ['', [Validators.required]],
      address2: ['', [Validators.required]],
      city: ['', [Validators.required]],
      zipCode: ['', [Validators.required]],
    });
  }

  // //save function
  // saveContact(): void {
  //   console.log(this.fg);
  //   //if form don't have any validation error this if condition will executed
  //   if (this.fg.valid) {
  //     const index = this.contacts.findIndex(
  //       (item) => item.id === this.fg.value.id
  //     );
  //     console.log(index);
  //     if (index != -1) {
  //       this.contacts[index].firstName = this.fg.value.firstName;
  //       this.contacts[index].lastName = this.fg.value.lastName;
  //       this.contacts[index].email = this.fg.value.email;
  //       this.contacts[index].address1 = this.fg.value.address1;
  //       this.contacts[index].address2 = this.fg.value.address2;
  //       this.contacts[index].city = this.fg.value.city;
  //       this.contacts[index].zipCode = this.fg.value.zipCode;
  //     } else {
  //       this.contacts.push(this.fg.value); //put the form value into contact array
  //     }
  //     this.fg.reset(); //resetting the form array
  //   }
  // }

  // clear() {
  //   this.fg.reset()
  // }

  // edit(index: number): void {
  //   const data = this.contacts[index]
  //   this.fg.patchValue(data)
  //   this.update = true
  //   this.save = false
  // }
  // delete(index: number): void {
  //   this.contacts.splice(index, 1)
  // }








}


