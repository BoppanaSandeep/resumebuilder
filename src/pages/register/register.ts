import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { LoginPage } from '../login/login';

@Component({
    selector: 'register',
    templateUrl: './register.html'
    //providers: [AuthenticationApi]
})
export class RegisterPage {

    public registerForm: FormGroup;

    constructor(public navCtrl: NavController, private formBuilder: FormBuilder, public navParams: NavParams) {
        this.registerForm = this.formBuilder.group({
            username: ['', Validators.required],
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
            this.navCtrl.push(LoginPage);
            console.log(this.registerForm.value);
        } else {
            this.navCtrl.push(LoginPage);
        }

    }
}