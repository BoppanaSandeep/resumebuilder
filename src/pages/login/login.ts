import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { TabsPage } from '../tabs/tabs';
import { RegisterPage } from '../register/register';
import { Http, Headers } from '@angular/http';
import { Urls } from '../shared/urls';

@Component({
    selector: 'login',
    templateUrl: './login.html'
    //providers: [AuthenticationApi]
})
export class LoginPage {

    public loginForm: FormGroup;

    constructor(public navCtrl: NavController, public http:Http, private formBuilder: FormBuilder, public navParams: NavParams) {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
        });
    }

    login(action) {

        if (action == 'login') {
            var headers = new Headers();
            headers.append('content-type', 'application/json');
            var url = new Urls();
            this.http.post(url.login_url, this.loginForm.value, { headers: headers }).toPromise().then((res) => {
                console.log(res.status, res.json());
                var status = res.json();
                if (status.message == 'OK') {
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