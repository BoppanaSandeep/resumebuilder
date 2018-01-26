import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { Profile } from '../modals/profile';
import { LoginPage } from '../login/login';
import { UserVariables } from '../shared/global_values';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public storage: Storage, public user: UserVariables) {

  }

  ngOnInit() {
    console.log(this.user.reg_id, 'home');
  }

  presentModal(opt) {
    var data = { edit: opt };
    console.log(data);
    let modal = this.modalCtrl.create(Profile, data);
    modal.onDidDismiss(data => {
      //console.log(data);
    });
    modal.present();
  }

  logout() {
    this.storage.clear();
    this.navCtrl.push(LoginPage);
  }

}
