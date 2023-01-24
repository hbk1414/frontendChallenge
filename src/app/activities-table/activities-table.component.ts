import { Component, OnInit, Input } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-activities-table',
  templateUrl: './activities-table.component.html',
  styleUrls: ['./activities-table.component.css']
})
export class ActivitiesTableComponent implements OnInit {

  constructor() { }

  @Input() title: string | undefined;
  @Input() type: string | undefined;
  @Input() dueDate: string | undefined;

  ngOnInit(): void {

  }

}
