import { Component, OnInit } from '@angular/core';
import { NavController, PopoverController, ViewController } from 'ionic-angular';

import { PopoverPage } from '../popover/popover';
//import { TabsPage } from '../tabs/tabs';
import { ToastAlert } from '../shared/toast';

@Component({
    selector: 'page-jobs',
    templateUrl: 'jobs.html'
})
export class JobsPage implements OnInit {

    i=[1,2,3,4,5];

    constructor(public navCtrl: NavController, public popoverCtrl: PopoverController, public toast: ToastAlert, public viewCtrl: ViewController) {

    }

    ngOnInit() {

    }

    popOver(myEvent) {
        let popover = this.popoverCtrl.create(PopoverPage);
        popover.present({
            ev: myEvent
        });
    }
}
