import { Component, OnInit } from '@angular/core';

import { ViewController, NavParams } from 'ionic-angular';

import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'profile',
    templateUrl: 'template.html'
})
export class Profile implements OnInit {

    public viewEdit: any;
    private profile: FormGroup;
    private expedu: FormGroup;
    private skills: FormGroup;
    
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
            current: ['', Validators.required],
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
        console.log(this.expedu)
    }

    expEdu(){
        console.log(this.skills)
    }

}

