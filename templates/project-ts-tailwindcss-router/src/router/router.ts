import { Router } from 'typecomposer'
import { AppPage } from '../main'

Router.create({
  history: 'history',
  routes: [
    {
      path: '/',
      component: AppPage
    }

  ],
});