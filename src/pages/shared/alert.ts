import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AlertController } from 'ionic-angular';

import { Urls } from './urls';
import { ToastAlert } from './toast';

@Injectable()
export class ConfirmationAlerts {
    public headers = new Headers();
    public url = new Urls();

    constructor(private alertCtrl: AlertController, public http: Http, public toast: ToastAlert) {

    }

    presentAlert() {
        let alert = this.alertCtrl.create({
            title: 'Low battery',
            subTitle: '10% of battery remaining',
            buttons: ['Dismiss']
        });
        alert.present();
    }

    presentConfirm() {
        let alert = this.alertCtrl.create({
            title: 'Confirm purchase',
            message: 'Do you want to buy this book?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Buy',
                    handler: () => {
                        console.log('Buy clicked');
                    }
                }
            ]
        });
        alert.present();
    }

    presentPrompt(title: any, msg: string, name: string, placeholder: string, button1: string, button2: string) {
        let prompt = this.alertCtrl.create({
            title: title,
            message: msg,
            inputs: [
                {
                    name: name,
                    placeholder: placeholder
                },
            ],
            buttons: [
                {
                    text: button1, //button 1
                    handler: data => {
                        //console.log('Cancel clicked');
                    }
                },
                {
                    text: button2, //button 2
                    handler: data => {
                        //console.log('Saved clicked', data);
                        this.forgotPassword(data);
                    }
                }
            ]
        });
        prompt.present();
    }

    forgotPassword(data) {
        if (data.email != '') {
            data = { "email": btoa(data.email) }
            this.headers.append('content-type', 'application/json');
            this.headers.append('Access-Control-Allow-Origin', '*');
            this.headers.append('Access-Control-Allow-Headers', '*');
            this.http.post(this.url.forgotpwd_url, data, { headers: this.headers }).toPromise().then((res) => {
                var user = res.json();
                if (user.message == 'OK') {
                    this.toast.showToast('Password was sent to ' + atob(user.email), 3000, 'bottom');
                } else {
                    this.toast.showToast('Email you entered is wrong!!!', 3000, 'bottom');
                    //console.log('Something went worng', res.json());
                }
            },
                (err) => {
                    this.toast.showToast('Something went Wrong, try again later!!!', 3000, 'bottom');
                    //console.log(err);
                }
            );
        } else {
            this.toast.showToast('Please enter your Email ID !!!', 3000, 'bottom');
        }
    }

}