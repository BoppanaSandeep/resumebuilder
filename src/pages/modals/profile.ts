import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { NavController, ViewController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Storage } from '@ionic/storage';

import { Urls } from '../shared/urls';
import { ToastAlert } from '../shared/toast';

import { TabsPage } from '../tabs/tabs';


@Component({
    selector: 'profile',
    templateUrl: 'profile.html'
})
export class Profile implements OnInit {

    //#region Variables
    public viewEdit: any;
    public profile: FormGroup;
    public expedu: FormGroup;
    public skills: FormGroup;
    public headers = new Headers();
    public url = new Urls();
    user_id;
    //#endregion

    //#region Constructor
    constructor(public navCtrl: NavController, public http: Http, public viewCtrl: ViewController, private formBuilder: FormBuilder, public navParams: NavParams, public storage: Storage, public toast: ToastAlert) {
        //var viewEdit = this.navParams.get('edit');

        this.profile = this.formBuilder.group({
            role: ['', [Validators.maxLength(50)]],
            description: ['', [Validators.maxLength(500)]],
        });

        this.expedu = this.formBuilder.group({
            experience: this.formBuilder.array([
                this.addMutipleExper(),
            ]),
            education: this.formBuilder.array([
                this.addMutipleEducation(),
            ]),
        });

        this.skills = this.formBuilder.group({
            skill: this.formBuilder.array([
                this.addMutipleSkills(),
            ]),
        });

    }
    //#endregion

    //#region OnInIt
    ngOnInit() {
        this.viewEdit = this.navParams.get('edit');
        //console.log(this.viewEdit);
    }
    //#endregion

    //#region Adding Multiple Experience, Education and Skills to Form Group Array
    addMutipleExper() {
        return this.formBuilder.group({
            company: ['', [Validators.required, Validators.maxLength(50)]],
            startyear: ['', [Validators.required]],
            endyear: [''],
            current: ['false'],
        });
    }

    addMutipleEducation() {
        return this.formBuilder.group({
            university: ['', [Validators.required, Validators.maxLength(50)]],
            passoutyear: ['', [Validators.required]],
            percentage: ['', [Validators.maxLength(2), Validators.pattern('^[0-9]+$')]],
        });
    }

    addMutipleSkills() {
        return this.formBuilder.group({
            fskills: ['', [Validators.required, Validators.maxLength(50)]],
        });
    }
    //#endregion

    //#region Adding Multiple Experience, Education and Skills
    addExperience() {
        const control = <FormArray>this.expedu.controls['experience'];
        control.push(this.addMutipleExper());
    }

    addEducation() {
        const control = <FormArray>this.expedu.controls['education'];
        control.push(this.addMutipleEducation());
    }

    addSkills() {
        const control = <FormArray>this.skills.controls['skill'];
        control.push(this.addMutipleSkills());
    }

    //#endregion

    //#region Removing Multiple Experience, Education and Skills
    removeExperience(i: number) {
        const control = <FormArray>this.expedu.controls['experience'];
        control.removeAt(i);
    }

    removeEducation(j: number) {
        const control = <FormArray>this.expedu.controls['education'];
        control.removeAt(j);
    }

    removeSkills(k: number) {
        const control = <FormArray>this.skills.controls['skill'];
        control.removeAt(k);
    }

    //#endregion

    dismiss() {
        this.viewCtrl.dismiss();
    }

    profileInfo() {
        console.log(this.profile.value);
    }

    skillsEndo() { }

    submit_skills(skills) {
        //console.log(skills.value.skill);
        this.storage.get('reg_id').then((val) => {
            var data = { "user_id": val, "skills": skills.value.skill };
            console.log(data);
            this.headers.append('content-type', 'application/json');
            this.headers.append('Access-Control-Allow-Origin', '*');
            this.headers.append('Access-Control-Allow-Headers', '*');
            this.http.post(this.url.skills_form_url, data, { headers: this.headers }).toPromise().then((res) => {
                var user = res.json();
                if (user.message == 'OK') {
                    this.toast.showToast('Submitted your skills', 3000, 'bottom');
                    this.navCtrl.push(TabsPage);
                } else {
                    this.toast.showToast('Something went Wrong, try again later!!!', 3000, 'bottom');
                }
            },
                (err) => {
                    this.toast.showToast('Something went Wrong, try again later!!!', 3000, 'bottom');
                }
            );
        }).catch(function (err) {
            console.log(err);
        });
    }

    expEdu() {
        console.log(this.expedu.value);
    }
}

