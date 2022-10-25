import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogActivityComponent } from '../dialog-activity/dialog-activity.component';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {
  MatDialog: any;

  constructor(private matDialog: MatDialog) { }

  ngOnInit(): void {
  }

  onOpenDialogClick() {
    this.matDialog.open(DialogActivityComponent,
      {
        data: 10
      })
  }
}
