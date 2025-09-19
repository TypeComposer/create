import { Router } from 'typecomposer'
import { AppPage } from '../AppPage'

Router.create({
  history: 'history',
  routes: [
    {
      path: '/',
      component: AppPage
    }

  ],
});