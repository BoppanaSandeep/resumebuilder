import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';

@Injectable()
export class ToastAlert {
    constructor(public toastCtrl: ToastController) { }

    showToast(msg: string, duration: number, position: string) {
        let toast = this.toastCtrl.create({
            message: msg,
            duration: duration,
            position: position
            //showCloseButton: true,
            //closeButtonText: 'Ok',
            //cssClass: 'color'
        });

        toast.present(toast);
    }
}