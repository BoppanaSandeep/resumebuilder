import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { BackgroundMode } from '@ionic-native/background-mode';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

import { ConfirmationAlerts } from '../pages/shared/alert';
import { ToastAlert } from '../pages/shared/toast';
import { UserVariables } from '../pages/shared/global_values';
import { Loading } from '../pages/shared/loading';

import { File } from '@ionic-native/file';
import { Transfer } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';

import { MyApp } from './app.component';
import { JobsPage } from '../pages/jobs/jobs';
import { MessagingPage } from '../pages/message/message';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { Profile } from '../pages/profile_modals/profile';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from './../pages/register/register';
import { MoreDesc } from '../pages/more_modals/more.description';
import { EditExpEdu } from '../pages/edit_modals/edit_expedu';
import { PopoverPage } from '../pages/popover/popover';
import { ProfileImage } from '../pages/profile_image/profile.image';
import { ChatRoomPage } from '../pages/chat-room/chat-room';
import { JobpostDetailsPage } from '../pages/jobpost-details/jobpost-details';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
    declarations: [
        MyApp,
        JobsPage,
        MessagingPage,
        HomePage,
        TabsPage,
        Profile,
        LoginPage,
        RegisterPage,
        MoreDesc,
        EditExpEdu,
        PopoverPage,
        ProfileImage,
        ChatRoomPage,
        JobpostDetailsPage
    ],
    imports: [
        BrowserModule,
        HttpModule,
        ReactiveFormsModule,
        IonicModule.forRoot(MyApp, {
            tabsHideOnSubPages: true,
        }),
        IonicStorageModule.forRoot()
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        JobsPage,
        MessagingPage,
        HomePage,
        TabsPage,
        Profile,
        LoginPage,
        RegisterPage,
        MoreDesc,
        EditExpEdu,
        PopoverPage,
        ProfileImage,
        ChatRoomPage,
        JobpostDetailsPage
    ],
    providers: [
        File,
        Transfer,
        Camera,
        FilePath,
        StatusBar,
        SplashScreen,
        UserVariables,
        ToastAlert,
        ConfirmationAlerts,
        BackgroundMode,
        Loading,
        ScreenOrientation,
        { provide: ErrorHandler, useClass: IonicErrorHandler }
    ]
})
export class AppModule { }
