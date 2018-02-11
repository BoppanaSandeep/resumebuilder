import { Component, OnInit } from '@angular/core';
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
export class RegisterPage implements OnInit {

    public registerForm: FormGroup;
    year;

    constructor(public navCtrl: NavController, private formBuilder: FormBuilder, public navParams: NavParams, public http: Http) {
        this.registerForm = this.formBuilder.group({
            name_first: ['', [Validators.required, Validators.maxLength(50)]],
            name_last: ['', [Validators.required, Validators.maxLength(50)]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(8)]],
            cpassword: ['', [Validators.required, Validators.minLength(8)]],
            phonenumber: ['', [Validators.required, Validators.maxLength(13), Validators.pattern('^[0-9]+$')]],
            dob: ['', Validators.required],
            gender: ['', Validators.required],
        });
    }

    ngOnInit(){
        var d = new Date();
        this.year=(d.getFullYear() - 17).toString();
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