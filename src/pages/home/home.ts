import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { Profile } from '../modals/profile';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public modalCtrl: ModalController) {

  }

  presentModal(opt) {
    var data =  { edit : opt };
    console.log(data);
    let modal = this.modalCtrl.create(Profile, data);
    modal.onDidDismiss(data => {
      //console.log(data);
    });
    modal.present();
  }

}
