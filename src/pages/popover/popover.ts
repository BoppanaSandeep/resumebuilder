import { MyApp } from './../../app/app.component';
import { Component, OnInit } from '@angular/core';
import { NavController, ViewController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ToastAlert } from '../shared/toast';

@Component({
    selector: 'page-popover',
    templateUrl: 'popover.html'
})

export class PopoverPage implements OnInit {
    constructor(public viewCtrl: ViewController, public navCtrl: NavController, public storage: Storage, public loading: LoadingController, public toast: ToastAlert) { }

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
        this.navCtrl.push(MyApp).then(() => {
            this.navCtrl.remove(this.navCtrl.getPrevious().index);
        }).catch(function (err) {
        });
        loader.dismiss();//Loading dismiss
    }
}