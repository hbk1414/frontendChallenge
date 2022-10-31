import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactsComponent } from './contacts/contacts.component';
import { HttpClientModule } from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button'
import { ActivityComponent } from './activity/activity.component';
import { DataTableComponent } from './data-table/data-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort'
import { MatDialogModule } from '@angular/material/dialog';
import { DialogActivityComponent } from './dialog-activity/dialog-activity.component';
import { ContactDetailsComponent } from './contact-details/contact-details.component';
import { ActivitiesComponent } from './activities/activities.component';
import { ActivityDetailsComponent } from './activity-details/activity-details.component'


@NgModule({
  declarations: [
    AppComponent,
    ContactsComponent,
    ActivityComponent,
    DataTableComponent,
    DialogActivityComponent,
    ContactDetailsComponent,
    ActivitiesComponent,
    ActivityDetailsComponent
  ],
  entryComponents: [
    DialogActivityComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
