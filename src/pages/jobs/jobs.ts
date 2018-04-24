import { Component, OnInit } from '@angular/core';
import { NavController, PopoverController, ViewController, LoadingController } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';

import { PopoverPage } from '../popover/popover';
import { LoginPage } from '../login/login';
import { ToastAlert } from '../shared/toast';
import { Urls } from '../shared/urls';

@Component({
    selector: 'page-jobs',
    templateUrl: 'jobs.html'
})
export class JobsPage implements OnInit {

    public headers = new Headers();
    public url = new Urls();
    connection: boolean = true;
    rb_id;
    jobposts;
    search_value;
    Error_Msg = 'No internet connection!!';
    constructor(public navCtrl: NavController, public popoverCtrl: PopoverController, public toast: ToastAlert, public viewCtrl: ViewController, public http: Http, public loading: LoadingController, public storage: Storage) {

    }

    // ionViewWillEnter() {
    //     this.ngOnInit();
    // }

    ngOnInit() {
        //Loading
        let loader = this.loading.create({
            spinner: 'dots',
            content: "please wait...",
            duration: 2000
        });
        loader.present();
        this.search_value = "";
        this.headers.append('content-type', 'application/json');
        this.headers.append('Access-Control-Allow-Origin', '*');
        this.headers.append('Access-Control-Allow-Headers', '*');
        this.http.get(this.url.connection, { headers: this.headers }).toPromise().then((res) => {
            var user = res.json();
            //console.log(user);
            if (user.message == 'OK') {
                this.connection = true;
                this.storage.get('rb_id').then((val) => {
                    var p = val == null ? 0 : val;
                    if (p != 0) {
                        this.rb_id = p;
                        this.JobPosts(p);
                    } else {
                        this.navCtrl.parent.parent.setRoot(LoginPage);
                        this.navCtrl.popToRoot();
                    }
                }).catch(function (err) {
                    this.toast.showToast('Something went wrong, try again later!!!', 3000, 'bottom');
                });
            } else {
                this.connection = false;
                this.toast.showToast('Something went wrong, try again later!!!', 3000, 'bottom');
            }
        },
            (err) => {
                this.connection = false;
            }
        );
        loader.dismissAll();//Loading dismiss
    }

    JobPosts(id) {
        this.http.get(this.url.fetching_job_posts + id, { headers: this.headers }).toPromise().then((res) => {
            var posts = res.json();
            if (posts.message == 'OK') {
                this.jobposts = posts.posts;
                if (this.jobposts.length > 1) {
                    this.jobposts = this.jobposts.sort((a, b) => a.numofdays < b.numofdays ? -1 : a.numofdays > b.numofdays ? 1 : 0);
                }
                //console.log(this.jobposts);
            } else {
                this.Error_Msg = 'Update your profile to get posts related to you or search!!!';
                this.connection = false;
            }
        },
            (err) => {
                this.Error_Msg = 'Something went wrong, refresh the page!!!';
                this.connection = false;
            }
        );
    }

    SearchJobPosts() {
        if (this.search_value == "") {
            this.ngOnInit();
        } else {
            this.http.get(this.url.fetching_search_job_posts + this.search_value, { headers: this.headers }).toPromise().then((res) => {
                var posts = res.json();
                if (posts.message == 'OK') {
                    this.jobposts = posts.posts;
                    this.jobposts = this.jobposts.sort((a, b) => a.numofdays < b.numofdays ? -1 : a.numofdays > b.numofdays ? 1 : 0)
                    //console.log(this.jobposts);
                } else {
                    this.Error_Msg = 'Search not found, try diff search!!!';
                    this.connection = false;
                }
            },
                (err) => {
                    this.Error_Msg = 'Something went wrong, refresh the page or try diff search!!!';
                    this.connection = false;
                }
            );
        }
    }

    DisplayTodayAndYesterday(days) {
        if (days == 0) {
            return 'Today';
        } else if (days == 1) {
            return 'Yesterday';
        } else {
            return days + "d ago";
        }
    }

    refactor(desc) {
        return desc.replace(/<\/?[^>]+>/gi, '');
    }

    popOver(myEvent) {
        let popover = this.popoverCtrl.create(PopoverPage);
        popover.present({
            ev: myEvent
        });
    }

    swipeEvent(e) {
        //console.log(e.direction, e);
        if (e.direction == 2) {
            this.ngOnInit();
        }
    }
}
