import { Injectable } from '@angular/core';
import { LoadingController } from 'ionic-angular';

@Injectable()
export class Loading {
    constructor(public loadingCtrl: LoadingController) {
    }

    presentLoading() {
        let loader = this.loadingCtrl.create({
            content: "Please wait..."
            //duration: 3000
        });

        loader.present();
    }
}