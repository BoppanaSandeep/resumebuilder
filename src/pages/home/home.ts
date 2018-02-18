import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, PopoverController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http, Headers } from '@angular/http';

import { PopoverPage } from '../popover/popover';
import { Profile } from '../profile_modals/profile';
import { LoginPage } from '../login/login';
import { UserVariables } from '../shared/global_values';
import { Urls } from '../shared/urls';
import { ToastAlert } from '../shared/toast';
import { MoreDesc } from '../more_modals/more.description';
import { EditExpEdu } from '../edit_modals/edit_expedu';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage implements OnInit {

    public headers = new Headers();
    public url = new Urls();
    skills_data;
    expedu_data;
    viewmore_exp = false;
    viewmore_edu = false;
    viewmore_skill = false;
    rb_id;
    role;

    constructor(public navCtrl: NavController, public modalCtrl: ModalController, public storage: Storage, public UserVariables: UserVariables, public http: Http, public toast: ToastAlert, public loading: LoadingController, public popoverCtrl: PopoverController) {

    }

    ngOnInit() {
        //Loading
        let loader = this.loading.create({
            content: "Please wait...",
            duration: 2000
        });
        loader.present();
        this.headers.append('content-type', 'application/json');
        this.headers.append('Access-Control-Allow-Origin', '*');
        this.headers.append('Access-Control-Allow-Headers', '*');
        this.storage.get('rb_id').then((val) => {
            var p = val == null ? 0 : val;
            if (p != 0) {
                this.rb_id = p;
                this.reload(p);
                this.skills(p);
                this.expedu(p);
            } else {
                this.navCtrl.parent.parent.setRoot(LoginPage);
                this.navCtrl.popToRoot();
            }
        }).catch(function (err) {
            this.toast.showToast('Something went Wrong, try again later!!!', 3000, 'bottom');
        });
        loader.dismiss();//Loading dismiss
    }

    reload(p) {
        this.http.get(this.url.login_status_url + p, { headers: this.headers }).toPromise().then((res) => {
            var user = res.json();
            if (user.message == 'OK') {
                this.UserVariables.reg_id = user.info.reg_id;
                this.UserVariables.rb_id = user.info.rb_id;
                this.UserVariables.email = user.info.email;
                this.UserVariables.name = user.info.name;
                this.UserVariables.phonenumber = user.info.phonenumber;
                this.UserVariables.joined_on = user.info.joined_on;
                this.UserVariables.logged_in = user.info.logged_in;
                //this.toast.showToast('Welcome Mr. ' + user.info.name, 3000, 'top');
            } else {
                this.toast.showToast('Your Session has expried!!!', 3000, 'bottom');
                //console.log('Something went worng', res.json());
            }
        },
            (err) => { this.toast.showToast('Something went Wrong, try again later!!!', 3000, 'bottom'); }
        );
    }

    expedu(p) {
        this.http.get(this.url.expedu_data_url + p, { headers: this.headers }).toPromise().then((res) => {
            var ee = res.json();
            if (ee.message == 'OK') {
                this.expedu_data = ee;
                //console.log(this.expedu_data);
                this.role = this.expedu_data.info.experience[0].exp_role;
                //this.toast.showToast('Welcome Mr. ' + user.info.name, 3000, 'top');
            } else {
                this.toast.showToast('Issue in Loading your content!!!', 3000, 'bottom');
            }
        },
            (err) => {
                this.toast.showToast('Something went Wrong, try again later!!!', 3000, 'bottom');
            }
        );
    }

    skills(p) {
        this.http.get(this.url.skills_data_url + p, { headers: this.headers }).toPromise().then((res) => {
            var sk = res.json();
            if (sk.message == 'OK') {
                this.skills_data = sk;
                //console.log(this.skills_data);
            } else {
                this.toast.showToast('Issue in Loading your content!!!', 3000, 'bottom');
            }
        },
            (err) => {
                this.toast.showToast('Something went Wrong, try again later!!!', 3000, 'bottom');
            }
        );
    }

    presentModal(opt) {
        var data = { edit: opt };
        //console.log(data);
        let modal = this.modalCtrl.create(Profile, data);
        modal.present();
    }

    moreDescModal(index, expedu_data, expedu) {
        var data = { more: index, data: expedu_data, title: expedu };
        //console.log(data);
        let modal = this.modalCtrl.create(MoreDesc, data);
        modal.present();
    }

    expeduEditModel(id, expedu_data, expedu) {
        var data = { expedu_id: id, data: expedu_data, title: expedu };
        //console.log(data);
        let modal = this.modalCtrl.create(EditExpEdu, data);
        modal.present();
    }

    viewmore(view): void {
        if (view == 'exp') {//experience
            this.viewmore_exp = this.viewmore_exp == false ? true : false;
        } else if (view == 'edu') {//education
            this.viewmore_edu = this.viewmore_edu == false ? true : false;
        } else {//skills
            this.viewmore_skill = this.viewmore_skill == false ? true : false;
        }
    }

    delete(id, name, delete_data) {
        //Loading
        let loader = this.loading.create({
            content: "Please wait...",
        });
        loader.present();
        if (delete_data == 'exp') {
            this.storage.get('reg_id').then((val) => {
                if (val != null) {
                    var data = { "rb_id": this.rb_id, "user_id": val, exp_id: id }
                    this.http.post(this.url.exp_delete_data_url, data, { headers: this.headers }).toPromise().then((res) => {
                        var user = res.json();
                        if (user.message == 'OK') {
                            this.expedu(this.rb_id);
                            loader.dismiss(); //Loading dismiss
                            this.toast.showToast('One of your Experience was deleted.', 3000, 'bottom');
                        } else {
                            loader.dismiss(); //Loading dismiss
                            this.toast.showToast('Something went Wrong to delete your Experience !!!', 3000, 'bottom');
                        }
                    },
                        (err) => {
                            loader.dismiss(); //Loading dismiss
                            this.toast.showToast('Something went Wrong, try again later!!!', 3000, 'bottom');
                        }
                    );
                } else {
                    loader.dismiss(); //Loading dismiss
                    this.toast.showToast('Your session was experied, Please logout and login!!!', 3000, 'bottom');
                }
            }).catch(function (err) {
                loader.dismiss(); //Loading dismiss
                this.toast.showToast('Something went Wrong, try again later!!!', 3000, 'bottom');
            });
        } else if (delete_data == 'edu') {
            this.storage.get('reg_id').then((val) => {
                if (val != null) {
                    var data = { "rb_id": this.rb_id, "user_id": val, edu_id: id }
                    this.http.post(this.url.edu_delete_data_url, data, { headers: this.headers }).toPromise().then((res) => {
                        var user = res.json();
                        if (user.message == 'OK') {
                            this.expedu(this.rb_id);
                            loader.dismiss(); //Loading dismiss
                            this.toast.showToast('One of your Education was deleted.', 3000, 'bottom');
                        } else {
                            loader.dismiss(); //Loading dismiss
                            this.toast.showToast('Something went Wrong to delete your Education !!!', 3000, 'bottom');
                        }
                    },
                        (err) => {
                            loader.dismiss(); //Loading dismiss
                            this.toast.showToast('Something went Wrong, try again later!!!', 3000, 'bottom');
                        }
                    );
                } else {
                    loader.dismiss(); //Loading dismiss
                    this.toast.showToast('Your session was experied, Please logout and login!!!', 3000, 'bottom');
                }
            }).catch(function (err) {
                loader.dismiss(); //Loading dismiss
                this.toast.showToast('Something went Wrong, try again later!!!', 3000, 'bottom');
            });
        } else {
            this.storage.get('reg_id').then((val) => {
                if (val != null) {
                    var data = { "rb_id": this.rb_id, "user_id": val, skill_id: id }
                    this.http.post(this.url.skills_delete_data_url, data, { headers: this.headers }).toPromise().then((res) => {
                        var user = res.json();
                        if (user.message == 'OK') {
                            this.skills(this.rb_id);
                            loader.dismiss(); //Loading dismiss
                            this.toast.showToast('One of your skill was deleted.', 3000, 'bottom');
                        } else {
                            loader.dismiss(); //Loading dismiss
                            this.toast.showToast('Something went Wrong to delete your skill !!!', 3000, 'bottom');
                        }
                    },
                        (err) => {
                            loader.dismiss(); //Loading dismiss
                            this.toast.showToast('Something went Wrong, try again later!!!', 3000, 'bottom');
                        }
                    );
                } else {
                    loader.dismiss(); //Loading dismiss
                    this.toast.showToast('Your session was experied, Please logout and login!!!', 3000, 'bottom');
                }
            }).catch(function (err) {
                loader.dismiss(); //Loading dismiss
                this.toast.showToast('Something went Wrong, try again later!!!', 3000, 'bottom');
            });
        }
    }

    popOver(myEvent) {
        let popover = this.popoverCtrl.create(PopoverPage);
        popover.present({
            ev: myEvent
        });
    }

}
