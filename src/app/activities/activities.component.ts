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

declare var window: any

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css'],
})
export default class ActivitiesComponent implements OnInit {
  constructor(private appService: AppService, private fb: FormBuilder) { }
  formModal: any
  fg!: FormGroup;
  @Input() title: string | undefined;
  @Input() type: string | undefined;
  @Input() dueDate: string | undefined;

  @Input() contacts: any[] = [];
  @Input() types: any[] = [];
  @Input() fullName: string = '';
  @Input() activities: any[] = [];
  @Input() activity: any = {};
  @Input() childItem: any = {};

  //get the form field as a form control. it will useful for validation and etc

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
    this.formModal = new window.bootstrap.window(
      document.getElementById("exampleModal")
    )

  }

  openModal() {
    this.formModal.show()
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
    console.log('saving activity');

    console.log(this.fg);
    console.log(this.activity);

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
          .subscribe((activity: any) => {
            this.activities = this.activities.filter(activity => activity.id !== this.activity.id);
            this.activities.push(activity);
          }); console.log("already exists");
      } else {
        this.appService
          .addActivity(newActivity)

          .subscribe((activity: any) => this.activities.push(activity));
      } console.log('added new activity')
      this.fg.reset(); //resetting the form array
    } else {
      console.log('this is invalid ');
    }
  }
  getContacts(): void {
    this.appService
      .getContacts()
      .subscribe((contacts: any) => (this.contacts = contacts));
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['childItem']) {
      this.getContactActivitiesbyContactID(changes['childItem'].currentValue.id)
      // this.getActivity(changes['childItem'].currentValue.id);
      this.getContacts();
    }
  }
  getActivities(): void {
    console.log(this.childItem);
    if (this.childItem.id) {
      this.getContactActivitiesbyContactID(this.childItem.id);
    }
    this.appService
      .getActivities()
      .subscribe((activities: any) => (this.activities = activities));
  }
  getContactActivitiesbyContactID(id: number | undefined) {
    this.appService
      .getContactActivitiesbyContactID(id)
      .subscribe((activities: any) => (this.activities = activities));
  }
  getActivityTypes(): void {
    this.appService
      .getActivityTypes()
      .subscribe((actitivityType: any) => (this.types = actitivityType));
  }
  deleteActivity(id: number | undefined) {
    this.appService.deleteActivity(id).subscribe();
    this.activities = this.activities.filter(activity => activity.id !== id);
    this.activity = null;
    this.fg.reset();
  }
  getActivity(id: number | undefined) {
    this.appService
      .getActivitybyID(id)
      .subscribe((activity: any) => (this.activity = activity));
  }
}