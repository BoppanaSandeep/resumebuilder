import { Component, OnInit, Injectable } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { TabsPage } from '../tabs/tabs';
//import { HomePage } from '../home/home';
import { RegisterPage } from '../register/register';
import { Http, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';

import { Urls } from '../shared/urls';
import { UserVariables } from '../shared/global_values';
import { ToastAlert } from '../shared/toast';
import { ConfirmationAlerts } from '../shared/alert';

@Component({
    selector: 'login',
    templateUrl: './login.html'
    //providers: [AuthenticationApi]
})

@Injectable()
export class LoginPage implements OnInit {
    public loginForm: FormGroup;
    public headers = new Headers();
    public url = new Urls();

    constructor(public navCtrl: NavController, public http: Http, private formBuilder: FormBuilder, public navParams: NavParams, private storage: Storage, public UserVariables: UserVariables, public toast: ToastAlert, public alerts: ConfirmationAlerts, public loading: LoadingController) {
        this.loginForm = this.formBuilder.group({
            username: ['', [Validators.required]],
            password: ['', Validators.required],
        });

    }

    ngOnInit() { }

    login(action) {
        //Loading
        let loader = this.loading.create({
            content: "Please wait...",
            duration: 1000
        });
        loader.present();
        if (action == 'login') {
            this.headers.append('content-type', 'application/json');
            this.headers.append('Access-Control-Allow-Origin', '*');
            this.headers.append('Access-Control-Allow-Headers', '*');
            this.http.post(this.url.login_url, this.loginForm.value, { headers: this.headers }).toPromise().then((res) => {
                var user = res.json();
                if (user.message == 'OK') {
                    this.UserVariables.reg_id = user.info.reg_id;
                    this.UserVariables.rb_id = user.info.rb_id;
                    this.UserVariables.email = user.info.email;
                    this.UserVariables.name = user.info.name;
                    this.UserVariables.phonenumber = user.info.phonenumber;
                    this.UserVariables.joined_on = user.info.joined_on;
                    this.UserVariables.logged_in = user.info.logged_in;

                    this.storage.set('reg_id', user.info.reg_id);
                    this.storage.set('rb_id', user.info.rb_id);
                    this.storage.set('pagename', 'TabsPage');

                    this.toast.showToast('Welcome Mr. ' + user.info.name, 3000, 'top');
                    loader.dismiss();//Loading dismiss
                    this.navCtrl.push(TabsPage, { tabIndex: 1 });
                } else {
                    loader.dismiss();//Loading dismiss
                    this.toast.showToast('Username and Password are Wrong!!!', 3000, 'bottom');
                }
            },
                (err) => {
                    loader.dismiss();//Loading dismiss
                    this.toast.showToast('Something went Wrong, try again later!!!', 3000, 'bottom');
                    //console.log(err);
                }
            );
            //console.log(this.loginForm.value);
        } else if (action == 'register') {
            loader.dismiss();//Loading dismiss
            this.navCtrl.push(RegisterPage);
        } else {
            loader.dismiss();//Loading dismiss
            this.alerts.presentPrompt('Forgot Password', 'Enter your registered Email Id', 'email', 'Email', 'Cancel', 'Submit');
        }
    }
}