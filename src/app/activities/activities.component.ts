import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AppService } from '../app.service';

interface Activity {
  id?: number;
  contactId: string;
  activityTypeId: string;
  dueDate: number;
  title: string;
  notes: string;
}

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css'],
})
export default class ActivitiesComponent implements OnInit {
  constructor(private appService: AppService, private fb: FormBuilder) { }
  fg!: FormGroup;
  contacts: any[] = [];
  types: any[] = [];
  fullName: string = '';
  activities: any[] = [];
  activity: any = {};
  @Input() childItem: any = {};

  //get the form field as a form control. it will useful for validation and etc
  // get contactield(): FormControl {
  // return this.fg.get('firstName') as FormControl;
  // }
  get contactField(): FormControl {
    return this.fg.get('contactId') as FormControl;
  }

  get typeField(): FormControl {
    return this.fg.get('type') as FormControl;
  }

  get dueDateAddressField(): FormControl {
    return this.fg.get('dueDate') as FormControl;
  }

  get titleField(): FormControl {
    return this.fg.get('title') as FormControl;
  }

  get notesField(): FormControl {
    return this.fg.get('notes') as FormControl;
  }

  ngOnInit(): void {
    this.initForm();
    this.getContacts();
    this.getActivityTypes();
    this.getActivities();
  }

  refresh(): void {
    window.location.reload();
  }

  initForm(): void {
    let id = Date.now() * Math.random();
    this.fg = this.fb.group({
      id: [id],
      contactId: ['', [Validators.required]],
      activityTypeId: ['', [Validators.required]],
      dueDate: ['', [Validators.required]],
      title: ['', [Validators.required]],
      notes: ['', [Validators.required]],
    });
  }
  saveActivity(): void {
    console.log(this.fg);
    console.log(this.activity);

    //if form don't have any validation error this if condition will executed
    if (this.fg.valid) {

      const newActivity: Activity = {
        contactId: this.fg.value.contactId,
        activityTypeId: this.fg.value.activityTypeId,
        dueDate: this.fg.value.dueDate,
        title: this.fg.value.title,
        notes: this.fg.value.notes,
      };
      if (this.activity?.id) {
        this.appService
          .editActivity(this.activity.id, newActivity)
          .subscribe((activity: any) => this.activity.push(activity));
      } else {
        this.appService
          .addActivity(newActivity)

          .subscribe((activity: any) => this.activity.push(activity));
      }
      this.fg.reset(); //resetting the form array
      this.refresh();
    } else {
      console.log('this is invalid ');
    }
  }
  getContacts(): void {
    this.appService
      .getContacts()
      .subscribe((contact: any) => (this.contacts = contact));
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['childItem']) {
      this.getContactActivitiesbyContactID(changes['childItem'].currentValue.id)
      this.getActivity(changes['childItem'].currentValue.id);
    }
  }
  getActivities(): void {
    console.log(this.childItem);
    if (this.childItem.id) {
      this.getContactActivitiesbyContactID(this.childItem.id);
    }
    this.appService
      .getActivities()
      .subscribe((activity: any) => (this.activities = activity));
  }
  getContactActivitiesbyContactID(id: number | undefined) {
    this.appService
      .getContactActivitiesbyContactID(id)
      .subscribe((activity: any) => (this.activities = activity));
  }
  getActivityTypes(): void {
    this.appService
      .getActivityTypes()
      .subscribe((actitivityType: any) => (this.types = actitivityType));
  }
  deleteActivity(id: number | undefined) {
    this.appService.deleteActivity(id).subscribe();
    this.refresh();
  }
  getActivity(id: number | undefined) {
    this.appService
      .getActivitybyID(id)
      .subscribe((activity: any) => (this.activity = activity));
  }
}