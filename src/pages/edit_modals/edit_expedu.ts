import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { NavController, ViewController, NavParams, LoadingController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Storage } from '@ionic/storage';

import { Urls } from '../shared/urls';
import { ToastAlert } from '../shared/toast';

import { TabsPage } from '../tabs/tabs';


@Component({
    selector: 'editexpedu',
    templateUrl: 'edit_expedu.html'
})
export class EditExpEdu implements OnInit {

    //#region Variables
    public viewEditExpEdu: any;
    public viewEditExpEduTitle: any;
    public viewEditExpEduId: any;
    public exp: FormGroup;
    public edu: FormGroup;
    public headers = new Headers();
    public url = new Urls();
    working_from;
    last_worked;
    //#endregion

    //#region Constructor
    constructor(public navCtrl: NavController, public http: Http, public viewCtrl: ViewController, private formBuilder: FormBuilder, public navParams: NavParams, public storage: Storage, public toast: ToastAlert, public loading: LoadingController) {

        this.viewEditExpEdu = this.navParams.get('data');
        this.viewEditExpEduTitle = this.navParams.get('title');
        this.viewEditExpEduId = this.navParams.get('expedu_id');
        var curr = this.viewEditExpEdu.exp_currently_working == 1 ? 1 : 0;
        var endyear = this.viewEditExpEdu.exp_currently_working == 1 ? '' : this.viewEditExpEdu.exp_last_work_date;

        this.exp = this.formBuilder.group({
            company: [this.viewEditExpEdu.exp_company, [Validators.required, Validators.maxLength(50)]],
            startyear: [this.viewEditExpEdu.exp_working_from, [Validators.required]],
            endyear: [endyear],
            role: [this.viewEditExpEdu.exp_role, [Validators.required]],
            job_desc: [this.viewEditExpEdu.exp_job_desc],
            current: [curr],
        });

        this.edu = this.formBuilder.group({
            university: [this.viewEditExpEdu.edu_university_clg_sch, [Validators.required, Validators.maxLength(50)]],
            specialization: [this.viewEditExpEdu.edu_specialization, [Validators.required, Validators.maxLength(100)]],
            passoutyear: [this.viewEditExpEdu.edu_passoutyear, [Validators.required]],
            percentage: [this.viewEditExpEdu.edu_percentage, [Validators.maxLength(2), Validators.pattern('^[0-9]+$')]],
        });

    }
    //#endregion

    //#region OnInIt
    ngOnInit() {

    }
    //#endregion

    dismiss() {
        this.viewCtrl.dismiss();
    }

    //#region Submitting Experience and Education Form
    expEdu() { }

    edit_expEdu(expEdu, submitted) {
        //console.log(expEdu.value);
        //Loading
        let loader = this.loading.create({
            content: "Please wait...",
            duration: 2000
        });
        loader.present();
        this.storage.get('reg_id').then((val) => {
            if (val != null) {
                var data = { "user_id": val, "expedu_id": this.viewEditExpEduId, "edit_to": submitted, "expedu": expEdu.value };
                //console.log(data);
                this.headers.append('content-type', 'application/json');
                this.headers.append('Access-Control-Allow-Origin', '*');
                this.headers.append('Access-Control-Allow-Headers', '*');
                this.http.post(this.url.edit_expedu_data_url, data, { headers: this.headers }).toPromise().then((res) => {
                    var user = res.json();
                    if (user.message == 'OK') {
                        this.toast.showToast('Updated your ' + submitted + ' Details.', 3000, 'bottom');
                        this.navCtrl.push(TabsPage, { tabIndex: 1 }).then(() => {
                            this.navCtrl.remove(this.navCtrl.getPrevious().index);
                        }).catch(function (err) {
                            this.toast.showToast('Something went Wrong, try again later!!!', 3000, 'bottom');
                        });
                    } else {
                        this.toast.showToast('Something went Wrong, try again later!!!', 3000, 'bottom');
                    }
                    loader.dismissAll();
                },
                    (err) => {
                        loader.dismissAll();
                        this.toast.showToast('Something went Wrong, try again later!!!', 3000, 'bottom');
                    }
                );
            } else {
                loader.dismissAll();
                this.toast.showToast('Your session was experied, Please logout and login!!!', 3000, 'bottom');
            }
        }).catch(function (err) {
            loader.dismissAll();
            this.toast.showToast('Something went Wrong, try again later!!!', 3000, 'bottom');
        });
    }
    //#endregion
}