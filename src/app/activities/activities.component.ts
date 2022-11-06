import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppService } from '../app.service';



interface Activity {
  id?: number;
  contact: string;
  type: string;
  dueDate: number;
  title: string;
  notes: string;

}

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css']
})


export default class ActivitiesComponent implements OnInit {
  constructor(private appService: AppService, private fb: FormBuilder) { }
  fg!: FormGroup
  contacts: any[] = []
  types: any[] = []
  activities: Activity[] = []
  activity: any = undefined


  //get the form field as a form control. it will useful for validation and etc
  // get contactield(): FormControl {
  //   return this.fg.get('firstName') as FormControl;
  // }
  get contactField(): FormControl {
    return this.fg.get('contact') as FormControl;
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


  initForm(): void {
    let id = Date.now() * Math.random();
    this.fg = this.fb.group({
      id: [id],
      contact: ['', [Validators.required]],
      type: ['', [Validators.required]],
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
      const index = this.activities.findIndex(
        (item) => item.id === this.fg.value.id
      );
      console.log(index);
      const newActivity: Activity = {
        contact: this.fg.value.contact,
        type: this.fg.value.type,
        dueDate: this.fg.value.dueDate,
        title: this.fg.value.title,
        notes: this.fg.value.notes

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
      this.getActivities();
    } else {
      console.log("this is invalid ");

    }
  }
  getContacts(): void {
    this.appService.getContacts()
      .subscribe((contact: any) => (this.contacts = contact));
  }
  getActivities(): void {
    this.appService.getActivities()
      .subscribe((activity: any) => (this.activities = activity));
  }
  getActivityTypes(): void {
    this.appService.getActivityTypes()
      .subscribe((actitivityType: any) => (this.types = actitivityType));
  }
  deleteActivity(id: number | undefined) {
    this.appService.deleteActivity(id)
      .subscribe()
    this.getActivities()
  }
  getActivity(id: number | undefined) {
    this.appService.getActivitybyID(id)
      .subscribe((activity: any) => (this.activity = activity))
  }

}

