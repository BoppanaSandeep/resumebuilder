import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';

import { ConfirmationAlerts } from '../pages/shared/alert';
import { ToastAlert } from '../pages/shared/toast';
import { UserVariables } from '../pages/shared/global_values';
import { Loading } from '../pages/shared/loading';

import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { Profile } from '../pages/modals/profile';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from './../pages/register/register';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
    declarations: [
        MyApp,
        AboutPage,
        ContactPage,
        HomePage,
        TabsPage,
        Profile,
        LoginPage,
        RegisterPage
    ],
    imports: [
        BrowserModule,
        HttpModule,
        ReactiveFormsModule,
        IonicModule.forRoot(MyApp),
        IonicStorageModule.forRoot()
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        AboutPage,
        ContactPage,
        HomePage,
        TabsPage,
        Profile,
        LoginPage,
        RegisterPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        UserVariables,
        ToastAlert,
        ConfirmationAlerts,
        Loading,
        { provide: ErrorHandler, useClass: IonicErrorHandler }
    ]
})
export class AppModule { }
