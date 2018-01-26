import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { TabsPage } from '../tabs/tabs';
import { RegisterPage } from '../register/register';
import { Http, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';

import { Urls } from '../shared/urls';
import { UserVariables } from '../shared/global_values';

@Component({
    selector: 'login',
    templateUrl: './login.html'
    //providers: [AuthenticationApi]
})
export class LoginPage implements OnInit {
    public loginForm: FormGroup;
    public headers = new Headers();
    public url = new Urls();

    constructor(public navCtrl: NavController, public http: Http, private formBuilder: FormBuilder, public navParams: NavParams, private storage: Storage, public UserVariables: UserVariables) {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
        });

    }

    ngOnInit() {
        this.headers.append('content-type', 'application/json');
        this.storage.get('rb_id').then((val) => {
            var p = val == null ? 0 : val;
            this.reload(p);
        }).catch(function (err) {
            console.log(err);
        });
    }

    reload(p){
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
                this.navCtrl.push(TabsPage);
            } else {
                console.log('Something went worng', res.json());
            }
        },
            (err) => { console.log(err); }
        );
    }

    login(action) {

        if (action == 'login') {
            this.headers.append('content-type', 'application/json');
            this.http.post(this.url.login_url, this.loginForm.value, { headers: this.headers }).toPromise().then((res) => {
                console.log(res.status, res.json());
                var user = res.json();
                if (user.message == 'OK') {
                    this.UserVariables.reg_id = user.info.reg_id;
                    this.UserVariables.rb_id = user.info.rb_id;
                    this.UserVariables.email = user.info.email;
                    this.UserVariables.name = user.info.name;
                    this.UserVariables.phonenumber = user.info.phonenumber;
                    this.UserVariables.joined_on = user.info.joined_on;
                    this.UserVariables.logged_in = user.info.logged_in;

                    this.storage.set('rb_id', user.info.rb_id);
                    this.storage.set('pagename', 'TabsPage');
                    
                    this.navCtrl.push(TabsPage);
                } else {
                    console.log('Something went worng', res.json());
                }
            },
                (err) => { console.log(err); }
            );
            console.log(this.loginForm.value);
        } else if (action == 'register') {
            this.navCtrl.push(RegisterPage);
        } else {
            console.log('forgot');
        }
    }
}