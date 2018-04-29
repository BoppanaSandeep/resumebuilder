import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Urls } from '../shared/urls';

@Component({
    selector: 'page-chat-room',
    templateUrl: 'chat-room.html',
})

export class ChatRoomPage {

    host = new Urls().api_host + "screen.png";
    message = "";
    btn = this.message.trim() == "" ? false : true;
    constructor(public navCtrl: NavController, public navParams: NavParams) {
    }

    ionViewDidLoad() {
        this.navParams.get('id');
        console.log(this.navParams.get('id'));
    }

    SendMessage() {
        if (this.message) {
            console.log(this.message);
            this.message = "";
            this.btn = this.message.trim() == "" ? false : true;
        }
    }

    CheckMessage(){
        this.btn = this.message.trim() == "" ? false : true;
    }

}
