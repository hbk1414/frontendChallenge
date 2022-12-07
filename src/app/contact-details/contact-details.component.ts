import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  FormsModule
} from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { nameValidator } from '../../app/validator/nameValidator';

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
  styleUrls: ['./contact-details.component.css'],
})
export class ContactDetailsComponent implements OnInit {
  router: any;
  constructor(private appService: AppService, private fb: FormBuilder, router: Router) { }
  fg!: FormGroup;
  contacts: Contact[] = [];
  contact: any = {};

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

  async ngOnInit() {
    this.initForm();
    this.getContacts();
  }

  //form init. here we create the reactive form. https://angular.io/guide/reactive-forms
  initForm(): void {
    let id = Date.now() * Math.random();
    this.fg = this.fb.group({
      id: [id],
      firstName: ['', [Validators.required, nameValidator()]],
      lastName: ['', [Validators.required, nameValidator()]],
      emailAddress: ['', [Validators.required, Validators.email]],
      address1: ['', [Validators.required]],
      address2: ['', [Validators.required]],
      city: ['', [Validators.required]],
      postCode: ['', [Validators.required]],
    });
  }

  //save function
  async saveContact() {
    console.log(this.fg);
    console.log(this.contact);

    //if form doesn't have any validation error this if condition will executed
    if (this.fg.valid) {

      const newContact: Contact = {
        firstName: this.fg.value.firstName,
        lastName: this.fg.value.lastName,
        emailAddress: this.fg.value.emailAddress,
        address1: this.fg.value.address1,
        address2: this.fg.value.address2,
        city: this.fg.value.city,
        postCode: this.fg.value.postCode,
      };
      if (this.contact?.id) {
        this.appService
          .editContacts(this.contact.id, newContact).subscribe();
      } else {
        this.appService
          .addContacts(newContact).subscribe();
      }
      this.fg.reset(); //resetting the form array
      await this.refresh();
    } else {
      console.log('this is invalid ');
    }
  }

  // refresh() {
  //   this.router.navigate([this.router.url])
  // }

  refresh(): void {
    window.location.reload();
  }

  async getContacts(): Promise<void> {
    await this.appService
      .getContacts()
      .subscribe((contacts: any) => (this.contacts = contacts));
  }

  edit(id: number): void {
    const data = this.contacts[id];
    this.fg.patchValue(data);
    this.refresh();
  }

  getContact(id: number | undefined) {
    this.appService
      .get(id)
      .subscribe((contact: any) => (this.contact = contact));
  }

  selectContact(contact: Contact) {
    this.contact = contact;
  }

  deleteContact(id: number | undefined) {
    this.appService.deleteContact(id).subscribe();
    this.refresh();
  }
}
