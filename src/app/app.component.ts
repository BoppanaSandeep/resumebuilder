import { Component, OnInit } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';

@Component({
    templateUrl: 'app.html'
})
export class MyApp implements OnInit {

    rootPage;
    loadingPage;
    constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public storage: Storage) {
        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.show();
        });
    }

    ngOnInit() {
        this.storage.get('pagename').then((pagename) => {
            this.loadingPage = pagename == null ? LoginPage : pagename == 'TabsPage' ? TabsPage : LoginPage;
            this.rootPage = this.loadingPage;
        }).catch(function (err) {
            console.log(err);
        });
    }

}
