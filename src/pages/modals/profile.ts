import { Component } from '@angular/core';

import { ViewController } from 'ionic-angular';

import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
    templateUrl: 'template.html'
})
export class Profile {

    private todo: FormGroup;
    constructor(public viewCtrl: ViewController, private formBuilder: FormBuilder) {
        this.todo = this.formBuilder.group({
            title: ['', Validators.required],
            description: ['', Validators.required],
        });
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

    logForm() {
        console.log(this.todo)
    }

}

