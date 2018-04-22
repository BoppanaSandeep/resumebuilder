import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, LoadingController, ViewController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { ToastAlert } from '../shared/toast';

import { LoginPage } from '../login/login';
import { Http, Headers } from '@angular/http';
import { Urls } from '../shared/urls';


@Component({
    selector: 'page-register',
    templateUrl: './register.html'
    //providers: [AuthenticationApi]
})
export class RegisterPage implements OnInit {

    public registerForm: FormGroup;
    year;

    constructor(public navCtrl: NavController, private formBuilder: FormBuilder, public navParams: NavParams, public http: Http, public toast: ToastAlert, public loading: LoadingController, public viewCtrl: ViewController) {
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

    ngOnInit() {
        var d = new Date();
        this.year = (d.getFullYear() - 17).toString();
    }

    dummyRegister(dummy){}

    register(action) {
        //Loading
        let loader = this.loading.create({
            spinner: 'dots',
            content: "Please wait...",
            duration: 1000
        });
        loader.present();
        if (action == 'register') {
            var headers = new Headers();
            headers.append('content-type', 'application/json');
            headers.append('Access-Control-Allow-Origin', '*');
            headers.append('Access-Control-Allow-Headers', '*');
            var url = new Urls();
            this.http.post(url.registration_url, this.registerForm.value, { headers: headers }).toPromise().then((res) => {
                //console.log(res.status, res.json());
                var status = res.json();
                if (status.message == 'OK') {
                    this.navCtrl.push(LoginPage).then(() => {
                        this.navCtrl.remove(this.navCtrl.getPrevious().index);
                    }).catch(function (err) {
                        loader.dismissAll();//Loading dismiss
                        this.toast.showToast('Something went Wrong, try again later!!!', 3000, 'bottom');
                    });
                } else {
                    this.toast.showToast('Something went Wrong, try again later!!!', 3000, 'bottom');
                }
                loader.dismissAll();//Loading dismiss
            },
                (err) => {
                    loader.dismissAll();//Loading dismiss
                    this.toast.showToast('Something went Wrong, try again later!!!', 3000, 'bottom');
                }
            );
            //console.log(this.registerForm.value);
        } else {
            loader.dismissAll();//Loading dismiss
            this.navCtrl.push(LoginPage).then(() => {
                this.navCtrl.remove(this.navCtrl.getPrevious().index);
            }).catch(function (err) {
                loader.dismissAll();//Loading dismiss
                this.toast.showToast('Something went Wrong, try again later!!!', 3000, 'bottom');
            });
        }
    }
}