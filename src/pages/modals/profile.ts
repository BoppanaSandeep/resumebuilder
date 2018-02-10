import { Component, OnInit } from '@angular/core';

import { ViewController, NavParams } from 'ionic-angular';

import { Validators, FormBuilder, FormGroup, FormArray } from '@angular/forms';

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
    //#endregion

    //#region Constructor
    constructor(public viewCtrl: ViewController, private formBuilder: FormBuilder, public navParams: NavParams) {
        //var viewEdit = this.navParams.get('edit');

        this.profile = this.formBuilder.group({
            profilename: [''],
            role: ['', [Validators.required, Validators.maxLength(50)]],
            description: ['', [Validators.required, Validators.maxLength(500)]],
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
        console.log(this.viewEdit);
    }
    //#endregion

    //#region Adding Multiple Experience, Education and Skills to Form Group Array
    addMutipleExper() {
        return this.formBuilder.group({
            company: ['', [Validators.required, Validators.maxLength(50)]],
            startyear: ['', Validators.required],
            endyear: [''],
            current: ['false'],
        });
    }

    addMutipleEducation() {
        return this.formBuilder.group({
            university: ['', [Validators.required, Validators.maxLength(50)]],
            passoutyear: ['', Validators.required],
            percentage: ['', [Validators.required, Validators.maxLength(3), Validators.pattern('^[0-9]+$')]],
        });
    }

    addMutipleSkills() {
        return this.formBuilder.group({
            fskills: ['', [Validators.required, Validators.maxLength(20)]],
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

    skillsEndo() {
        console.log(this.skills.value);
    }

    expEdu() {
        console.log(this.expedu.value);
    }
}

