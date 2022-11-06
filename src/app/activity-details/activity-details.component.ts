import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AppService } from '../app.service';

interface Activity{
  id?:number;
  contact:string;
  type:string;
  dueDate:number;
  subject:string;
  notes:string;

}

@Component({
  selector: 'app-activity-details',
  templateUrl: './activity-details.component.html',
  styleUrls: ['./activity-details.component.css']
})
export class ActivityDetailsComponent implements OnInit {

  constructor(private appService: AppService, private fb:FormBuilder) { }
  fg!:FormGroup
  activities: Activity[] = []



  ngOnInit(): void {
  }

}
