import { Component, OnInit } from '@angular/core';
import { NavController, ViewController, NavParams, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { ToastAlert } from '../shared/toast';

@Component({
    selector: 'moredesc',
    templateUrl: 'more.description.html'
})
export class MoreDesc implements OnInit {

    //#region Variables
    public viewMoreDesc: any;
    public viewMoreDescTitle: any;
    //#endregion

    //#region Constructor
    constructor(public navCtrl: NavController, public viewCtrl: ViewController, public navParams: NavParams, public storage: Storage, public toast: ToastAlert, public loading: LoadingController) {
        //var viewEdit = this.navParams.get('edit');
    }
    //#endregion

    //#region OnInIt
    ngOnInit() {
        this.viewMoreDesc = this.navParams.get('data');
        this.viewMoreDescTitle = this.navParams.get('title');
        //console.log(this.viewMoreDesc, this.viewMoreDescTitle);
    }
    //#endregion

    dismiss() {
        this.viewCtrl.dismiss();
    }
}