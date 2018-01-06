import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { LoginPage } from '../login/login';
import { Http, Headers } from '@angular/http';
import { Urls } from '../shared/urls';


@Component({
    selector: 'register',
    templateUrl: './register.html'
    //providers: [AuthenticationApi]
})
export class RegisterPage {

    public registerForm: FormGroup;

    constructor(public navCtrl: NavController, private formBuilder: FormBuilder, public navParams: NavParams, public http: Http) {
        this.registerForm = this.formBuilder.group({
            name_first: ['', Validators.required],
            name_last: ['', Validators.required],
            email: ['', Validators.required],
            password: ['', Validators.required],
            cpassword: ['', Validators.required],
            phonenumber: ['', Validators.required],
            dob: ['', Validators.required],
            gender: ['', Validators.required],
        });
    }

    register(action) {
        if (action == 'register') {
            var headers = new Headers();
            headers.append('content-type', 'application/json');
            var url = new Urls();
            this.http.post(url.registration_url, this.registerForm.value, { headers: headers }).toPromise().then((res) => {
                console.log(res.status, res.json());
                var status = res.json();
                if (status.message == 'OK') {
                    this.navCtrl.push(LoginPage);
                } else {
                    console.log('Something went worng', res.json());
                }
            },
                (err) => { console.log(err); }
            );
            console.log(this.registerForm.value);
        } else {
            this.navCtrl.push(LoginPage);
        }
    }
}