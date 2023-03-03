import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { nameValidator } from '../../app/validator/nameValidator';
import { postCodeValidator } from '../../app/validator/postCodeValidator';
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

declare var window: any;

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css'],
})
export class ContactDetailsComponent implements OnInit {
  formModal: any;
  router: any;
  searchText: any;
  firstName: string | undefined;
  lastName: string | undefined;
  activities: any;
  fg!: FormGroup;
  contactDisplay: Contact[] = [];
  @Input() contacts: Contact[] = [];
  @Input() contact: any = {};

  constructor(private appService: AppService, private fb: FormBuilder) {}

  async ngOnInit() {
    this.initForm();
    this.getContacts();
    this.formModal = new window.bootstrap.Modal(
      document.getElementById('exampleModal')
    );
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
      postCode: ['', [Validators.required, postCodeValidator()]],
    });
  }

  onChange(val: Event) {
    const name = (val.target as HTMLInputElement).value;
    this.contactDisplay = this.contacts.filter((contact) => {
      return contact.firstName.toLowerCase().startsWith(name.toLowerCase());
    });
    console.log('search', this.contactDisplay);
  }

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

  openModal() {
    this.formModal.show();
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
          .editContacts(this.contact.id, newContact)
          .subscribe((contact: any) => {
            this.contacts = this.contacts.filter(
              (contact) => contact.id !== this.contact.id
            );
            this.contacts.push(contact);
          });
      } else {
        this.appService
          .addContacts(newContact)
          .subscribe((contact: any) => this.contacts.push(contact));
      }
      this.fg.reset(); //resetting the form array
    } else {
      console.log('this is invalid ');
    }
  }

  async getContacts(): Promise<void> {
    this.contacts = (await lastValueFrom(
      this.appService.getContacts()
    )) as Contact[];
    this.contactDisplay = this.contacts;
  }

  edit(id: number): void {
    const data = this.contacts[id];
    this.fg.patchValue(data);
  }

  async getContact(id: number | undefined) {
    this.contact = await lastValueFrom(this.appService.get(id));
    this.activities = await lastValueFrom(
      this.appService.getContactActivitiesbyContactID(id)
    );
  }

  deleteContact(id: number | undefined) {
    this.appService.deleteContact(id).subscribe();
    this.contacts = this.contacts.filter((contact) => contact.id !== id);
    this.contact = null;
    this.fg.reset();
  }
}
