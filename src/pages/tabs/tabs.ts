import { Component } from '@angular/core';

import { JobsPage } from '../jobs/jobs';
import { MessagingPage } from '../message/message';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = JobsPage;
  tab2Root = HomePage;
  tab3Root = MessagingPage;

  constructor() {

  }
}
