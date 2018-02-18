import { Component, OnInit } from '@angular/core';
import { NavController, PopoverController } from 'ionic-angular';

import { PopoverPage } from '../popover/popover';

@Component({
    selector: 'page-message',
    templateUrl: 'message.html'
})
export class MessagingPage implements OnInit {

    constructor(public navCtrl: NavController, public popoverCtrl: PopoverController) { }

    ngOnInit() {

    }

    popOver(myEvent) {
        let popover = this.popoverCtrl.create(PopoverPage);
        popover.present({
            ev: myEvent
        });
    }

}
