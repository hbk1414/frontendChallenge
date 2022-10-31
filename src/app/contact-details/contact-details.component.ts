import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../app.service';


//interface for Contact
interface Contact {
  id?: number;
  firstName: string;
  lastName: string;
  emailAddress: string;
  address1: string;
  address2: string;
  city: string;
  postCode: string;
}

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css']
})
export class ContactDetailsComponent implements OnInit {
  constructor(private appService: AppService, private fb: FormBuilder) { }
  fg!: FormGroup;
  contacts: Contact[] = []
  contact: any = undefined
  update: boolean = false
  save: boolean = true

  //get the form field as a form control. it will useful for validation and etc
  get firstNameField(): FormControl {
    return this.fg.get('firstName') as FormControl;
  }

  get lastNameField(): FormControl {
    return this.fg.get('lastName') as FormControl;
  }

  get emailAddressField(): FormControl {
    return this.fg.get('emailAddress') as FormControl;
  }

  get address1Field(): FormControl {
    return this.fg.get('address1') as FormControl;
  }

  get address2Field(): FormControl {
    return this.fg.get('address2') as FormControl;
  }

  get postCodeField(): FormControl {
    return this.fg.get('postCode') as FormControl;
  }


  ngOnInit(): void {
    this.initForm();
    this.getContacts();
  }

  //form init. here we create the reactive form. https://angular.io/guide/reactive-forms
  initForm(): void {
    let id = Date.now() * Math.random();
    this.fg = this.fb.group({
      id: [id],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      emailAddress: ['', [Validators.required, Validators.email]],
      address1: ['', [Validators.required]],
      address2: ['', [Validators.required]],
      city: ['', [Validators.required]],
      postCode: ['', [Validators.required]],
    });
  }

  //save function
  saveContact(): void {
    console.log(this.fg);
    console.log(this.contact);

    //if form don't have any validation error this if condition will executed
    if (this.fg.valid) {
      const index = this.contacts.findIndex(
        (item) => item.id === this.fg.value.id
      );
      console.log(index);
      const newContact: Contact = {
        firstName: this.fg.value.firstName,
        lastName: this.fg.value.lastName,
        emailAddress: this.fg.value.emailAddress,
        address1: this.fg.value.address1,
        address2: this.fg.value.address2,
        city: this.fg.value.city,
        postCode: this.fg.value.postCode

      };
      if (this.contact.id) {
        this.appService
          .editContacts(this.contact.id, newContact)

          .subscribe((contact: any) => this.contacts.push(contact));

      } else {
        this.appService
          .addContacts(newContact)

          .subscribe((contact: any) => this.contacts.push(contact));
      }
      this.fg.reset(); //resetting the form array
      this.getContacts();
    } else {
      console.log("this is invalid ");

    }
  }

  getContacts(): void {
    this.appService.getContacts()
      .subscribe((contact: any) => (this.contacts = contact));
  }

  clear() {
    this.fg.reset()
  }

  edit(index: number): void {
    const data = this.contacts[index]
    this.fg.patchValue(data)
    this.update = true
    this.save = false
  }
  delete(index: number): void {
    this.contacts.splice(index, 1)
  }

  getContact(id: number | undefined) {
    this.appService.get(id)
      .subscribe((contact: any) => (this.contact = contact))
  }

  deleteContact(id: number | undefined) {
    this.appService.deleteContact(id)
      .subscribe()
    this.getContacts()
  }



}
