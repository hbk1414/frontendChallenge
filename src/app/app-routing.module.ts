import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import ActivitiesComponent from './activities/activities.component';
import { ContactsComponent } from './contacts/contacts.component';

const routes: Routes = [
  { path: 'contacts', component: ContactsComponent },
  { path: 'activities', component: ActivitiesComponent },
  { path: '**', component: ContactsComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      // onSameUrlNavigation: 'ignore',  // default behavior
      onSameUrlNavigation: 'reload'
    })],

  exports: [RouterModule]
})
export class AppRoutingModule { }


