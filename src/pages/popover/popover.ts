import { Component, OnInit } from '@angular/core';
import { NavController, ViewController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { LoginPage } from '../login/login';

@Component({
    selector: 'page-popover',
    templateUrl: 'popover.html'
})

export class PopoverPage implements OnInit {
    constructor(public viewCtrl: ViewController, public navCtrl: NavController, public storage: Storage, public loading: LoadingController) { }

    ngOnInit() {

    }

    logout() {
        //Loading..
        let loader = this.loading.create({
            content: "Please wait...",
            duration: 2000
        });
        loader.present();
        this.viewCtrl.dismiss();
        this.storage.clear();
        this.navCtrl.setRoot(LoginPage);
        //window.location.reload();
        this.navCtrl.popToRoot();
        loader.dismiss();//Loading dismiss
    }
}