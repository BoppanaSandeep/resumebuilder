import { Component, OnInit } from '@angular/core';
import { NavController, PopoverController } from 'ionic-angular';

import { PopoverPage } from '../popover/popover';
import { TabsPage } from '../tabs/tabs';
import { ToastAlert } from '../shared/toast';

@Component({
    selector: 'page-message',
    templateUrl: 'message.html'
})
export class MessagingPage implements OnInit {

    i=[1,2,3,4,5];

    constructor(public navCtrl: NavController, public popoverCtrl: PopoverController, public toast: ToastAlert) { }

    ngOnInit() {

    }

    popOver(myEvent) {
        let popover = this.popoverCtrl.create(PopoverPage);
        popover.present({
            ev: myEvent
        });
    }

    swipeEvent(e) {
        //console.log(e);
        if (e.direction == 4) { //messaging
            this.navCtrl.push(TabsPage, { tabIndex: 1 }).then(() => {
                this.navCtrl.remove(this.navCtrl.getPrevious().index);
            }).catch(function (err) {
                this.toast.showToast('Something went Wrong, try again later!!!', 3000, 'bottom');
            });
            //this.toast.showToast('right -> left', 2000, 'bottom');
        } else if (e.direction == 2) { //job posts
            this.navCtrl.push(TabsPage, { tabIndex: 0 }).then(() => {
                this.navCtrl.remove(this.navCtrl.getPrevious().index);
            }).catch(function (err) {
                this.toast.showToast('Something went Wrong, try again later!!!', 3000, 'bottom');
            });
            //this.toast.showToast('left -> right', 2000, 'bottom');
        }
    }
}
