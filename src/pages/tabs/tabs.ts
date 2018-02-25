import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

import { JobsPage } from '../jobs/jobs';
import { MessagingPage } from '../message/message';
import { HomePage } from '../home/home';

@Component({
    selector: 'page-tabs',
    templateUrl: 'tabs.html'
})
export class TabsPage {

    tab1Root = JobsPage;
    tab2Root = HomePage;
    tab3Root = MessagingPage;
    public tabIndex: Number = 0;

    constructor(public params: NavParams) {
        let tabIndex = this.params.get('tabIndex');
        if (tabIndex) {
            this.tabIndex = tabIndex;
        }
    }
}
