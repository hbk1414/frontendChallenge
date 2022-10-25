import { Component, Inject, INJECTOR, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-activity',
  templateUrl: './dialog-activity.component.html',
  styleUrls: ['./dialog-activity.component.css']
})
export class DialogActivityComponent implements OnInit {
  name!: FormControl;

  constructor(@Inject(MAT_DIALOG_DATA) public data: number) { }

  ngOnInit(): void {
  }

}
