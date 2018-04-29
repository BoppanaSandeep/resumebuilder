import { Component, OnInit } from '@angular/core';
import { NavController, PopoverController, ViewController } from 'ionic-angular';

import { PopoverPage } from '../popover/popover';
//import { TabsPage } from '../tabs/tabs';
import { ToastAlert } from '../shared/toast';
import { Urls } from '../shared/urls';
import { ChatRoomPage } from '../chat-room/chat-room';

@Component({
    selector: 'page-message',
    templateUrl: 'message.html'
})
export class MessagingPage implements OnInit {

    i = [1, 2, 3, 4, 5];
    host = new Urls().api_host + "screen.png";
    constructor(public navCtrl: NavController, public popoverCtrl: PopoverController, public toast: ToastAlert, public viewCtrl: ViewController) { }

    ngOnInit() {

    }

    GotoChatRoom(id) {
        this.navCtrl.push(ChatRoomPage, {id:id}).then(() => {
            //this.navCtrl.remove(this.navCtrl.getPrevious().index);
        }).catch(function (err) {
            this.toast.showToast('Something went Wrong, try again later!!!', 3000, 'bottom');
        });
    }

    popOver(myEvent) {
        let popover = this.popoverCtrl.create(PopoverPage);
        popover.present({
            ev: myEvent
        });
    }
}
