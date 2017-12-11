import { Component, OnInit } from '@angular/core';

import { ViewController, NavParams } from 'ionic-angular';

import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'profile',
    templateUrl: 'profile.html'
})
export class Profile implements OnInit {

    public viewEdit: any;
    public profile: FormGroup;
    public expedu: FormGroup;
    public skills: FormGroup;

    constructor(public viewCtrl: ViewController, private formBuilder: FormBuilder, public navParams: NavParams) {
        //var viewEdit = this.navParams.get('edit');
        
        this.profile = this.formBuilder.group({
            profilename: ['', Validators.required],
            role: ['', Validators.required],
            description: ['', Validators.required],
        });

        this.expedu = this.formBuilder.group({
            company: ['', Validators.required],
            startyear: ['', Validators.required],
            endyear: ['', Validators.required],
            current: ['false'],
            university: ['', Validators.required],
            passoutyear: ['', Validators.required],
            percentage: ['', Validators.required],
        });

        this.skills = this.formBuilder.group({
            skills: ['', Validators.required],
        });

    }

    ngOnInit() {
        this.viewEdit = this.navParams.get('edit');
        console.log(this.viewEdit);
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

    profileInfo() {
        console.log(this.profile.value);
    }

    skillsEndo(){
        console.log(this.skills.value);
    }

    expEdu(){
        console.log(this.expedu.value);
    }
}

