import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AppService {

    constructor(private http: HttpClient) { }

    rootURL = '/api/v1';

    getContacts() {
        return this.http.get(this.rootURL + '/contacts');
    }

    get(id: number | undefined) {
        return this.http.get(`${this.rootURL}/contacts/${id}`);
    }

    addContacts(contact: any) {
        return this.http.post(this.rootURL + '/contacts', contact);
    }


    editContacts(id: string, contact: any) {
        return this.http.put(`${this.rootURL}/contacts/${id}`, contact);
    }

    deleteContact(id: number | undefined) {
        return this.http.delete(`${this.rootURL}/contacts/${id}`);
    }
    getActivityTypes() {
        return this.http.get(this.rootURL + '/activities/types');
    }

    addActivity(activity: any) {
        return this.http.post(this.rootURL + '/activities', activity);
    }

    editActivity(id: string, activity: any) {
        return this.http.put(`${this.rootURL}/activities/${id}`, activity);
    }

    deleteActivity(id: number | undefined) {
        return this.http.delete(`${this.rootURL}/activities/${id}`);
    }
    getActivities() {
        return this.http.get(this.rootURL + '/activities');
    }
    getActivitybyID(id: number | undefined) {
        return this.http.get(`${this.rootURL}/activities/${id}`);
    }
    getContactActivitiesbyContactID(id: number | undefined) {
        return this.http.get(`${this.rootURL}/contacts/${id}/activities`);
    }



}