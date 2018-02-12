import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http, Headers } from '@angular/http';

//import { MyApp } from '../../app/app.component';
import { Profile } from '../modals/profile';
import { LoginPage } from '../login/login';
import { UserVariables } from '../shared/global_values';
import { Urls } from '../shared/urls';
import { ToastAlert } from '../shared/toast';
//import { TabsPage } from '../tabs/tabs';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage implements OnInit {

    public headers = new Headers();
    public url = new Urls();
    skills_data;
    expedu_data;

    constructor(public navCtrl: NavController, public modalCtrl: ModalController, public storage: Storage, public UserVariables: UserVariables, public http: Http, public toast: ToastAlert) {

    }

    ngOnInit() {
        this.headers.append('content-type', 'application/json');
        this.headers.append('Access-Control-Allow-Origin', '*');
        this.headers.append('Access-Control-Allow-Headers', '*');
        this.storage.get('rb_id').then((val) => {
            var p = val == null ? 0 : val;
            if (p != 0) {
                this.reload(p);
                this.skills(p);
                this.expedu(p);
            } else {
                this.navCtrl.parent.parent.setRoot(LoginPage);
                this.navCtrl.popToRoot();
            }
        }).catch(function (err) {
            console.log(err);
        });
    }

    reload(p) {
        this.http.get(this.url.login_status_url + p, { headers: this.headers }).toPromise().then((res) => {
            var user = res.json();
            if (user.message == 'OK') {
                this.UserVariables.reg_id = user.info.reg_id;
                this.UserVariables.rb_id = user.info.rb_id;
                this.UserVariables.email = user.info.email;
                this.UserVariables.name = user.info.name;
                this.UserVariables.phonenumber = user.info.phonenumber;
                this.UserVariables.joined_on = user.info.joined_on;
                this.UserVariables.logged_in = user.info.logged_in;
                //this.toast.showToast('Welcome Mr. ' + user.info.name, 3000, 'top');
            } else {
                this.toast.showToast('Your Session has expried!!!', 3000, 'bottom');
                console.log('Something went worng', res.json());
            }
        },
            (err) => { console.log(err); }
        );
    }

    expedu(p){
        this.http.get(this.url.expedu_data_url + p, { headers: this.headers }).toPromise().then((res) => {
            var ee = res.json();
            if (ee.message == 'OK') {
                this.expedu_data=ee;
                //console.log(this.expedu_data);
                //this.toast.showToast('Welcome Mr. ' + user.info.name, 3000, 'top');
            }
            // else {
            //     this.toast.showToast('Your Session has expried!!!', 3000, 'bottom');
            // }
        },
            (err) => { console.log(err); }
        );
    }

    skills(p){
        this.http.get(this.url.skills_data_url + p, { headers: this.headers }).toPromise().then((res) => {
            var sk = res.json();
            if (sk.message == 'OK') {
                this.skills_data=sk;
                //console.log(this.skills_data);
                //this.toast.showToast('Welcome Mr. ' + user.info.name, 3000, 'top');
            }
            // else {
            //     this.toast.showToast('Your Session has expried!!!', 3000, 'bottom');
            // }
        },
            (err) => { console.log(err); }
        );
    }

    presentModal(opt) {
        var data = { edit: opt };
        //console.log(data);
        let modal = this.modalCtrl.create(Profile, data);
        modal.onDidDismiss(data => {
            //console.log(data);
        });
        modal.present();
    }

    logout() {
        this.storage.clear();
        this.navCtrl.parent.parent.setRoot(LoginPage);
        //window.location.reload();
        this.navCtrl.popToRoot();
    }

}
