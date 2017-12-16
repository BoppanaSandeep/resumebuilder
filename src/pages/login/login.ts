import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { TabsPage } from '../tabs/tabs';
import { RegisterPage } from '../register/register';

@Component({
    selector: 'login',
    templateUrl: './login.html'
    //providers: [AuthenticationApi]
})
export class LoginPage {

    public loginForm: FormGroup;

    constructor(public navCtrl: NavController, private formBuilder: FormBuilder, public navParams: NavParams) {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
        });
    }

    login(action) {

        if (action == 'login') {
            this.navCtrl.push(TabsPage);
            console.log(this.loginForm.value);
        } else if (action == 'register') {
            this.navCtrl.push(RegisterPage);
        } else {
            console.log('forgot');
        }
    }
}