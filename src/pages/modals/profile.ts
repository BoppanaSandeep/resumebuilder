import { Component, OnInit } from '@angular/core';

import { ViewController, NavParams } from 'ionic-angular';

import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
    templateUrl: 'template.html'
})
export class Profile implements OnInit { //, OnInit

    public viewEdit: any;
    private profile: FormGroup;
    private expedu: FormGroup;
    private skills: FormGroup;
    
    constructor(public viewCtrl: ViewController, private formBuilder: FormBuilder, public navParams: NavParams) {
        //var viewEdit = this.navParams.get('edit');
        
        this.profile = this.formBuilder.group({
            title: ['', Validators.required],
            description: ['', Validators.required],
        });

        this.expedu = this.formBuilder.group({
            title: ['', Validators.required],
            description: ['', Validators.required],
        });

        this.skills = this.formBuilder.group({
            title: ['', Validators.required],
            description: ['', Validators.required],
        });

    }

    ngOnInit() {
        this.viewEdit = this.navParams.get('edit');
        console.log(this.viewEdit);
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

    logForm() {
        console.log(this.profile)
    }

}

