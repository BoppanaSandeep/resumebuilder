import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
//import { DatePipe } from '@angular/common';

@Component({
    selector: 'page-jobpost-details',
    templateUrl: 'jobpost-details.html',
})
export class JobpostDetailsPage {

    public moredetails;
    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.moredetails = this.navParams.get('moredata');
        console.log(this.moredetails);
    }

    ionViewDidLoad() {

    }

    DisplayTodayAndYesterday(days) {
        if (days == 0) {
            return 'Today';
        } else if (days == 1) {
            return 'Yesterday';
        } else {
            return days + "d ago";
        }
    }

}
