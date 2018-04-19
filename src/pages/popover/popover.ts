import { MyApp } from './../../app/app.component';
import { Component, OnInit } from '@angular/core';
import { NavController, ViewController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { BackgroundMode } from '@ionic-native/background-mode';

import { ToastAlert } from '../shared/toast';

@Component({
    selector: 'page-popover',
    templateUrl: 'popover.html'
})

export class PopoverPage implements OnInit {
    constructor(public viewCtrl: ViewController, public navCtrl: NavController, public storage: Storage, public loading: LoadingController, public toast: ToastAlert, public backgroundMode: BackgroundMode) { }

    ngOnInit() {

    }

    logout() {
        //Loading..
        let loader = this.loading.create({
            spinner: 'dots',
            content: "Please wait...",
            duration: 2000
        });
        loader.present();
        this.viewCtrl.dismiss();
        this.storage.clear();
        this.backgroundMode.disable();
        this.navCtrl.push(MyApp).then(() => {
            this.navCtrl.remove(this.navCtrl.getPrevious().index);
        }).catch(function (err) { });
        loader.dismissAll();//Loading dismiss
    }
}