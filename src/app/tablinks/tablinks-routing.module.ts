import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TablinksPage } from './tablinks.page';

const routes: Routes = [
  {
    path: 'tablinks',
    component: TablinksPage,
    children: [
      {
        path: 'profile',
        loadChildren: () => import('../profile/profile.module').then(m => m.ProfilePageModule)
      },
      {
        path: 'market',
        loadChildren: () => import('../market/market.module').then(m => m.MarketPageModule)
      },
      {
        path: 'schedule',
        loadChildren: () => import('../schedule/schedule.module').then(m => m.SchedulePageModule)
      },
      {
        path: 'post-house-tab',
        loadChildren: () => import('../post-house-tab/post-house-tab.module').then( m => m.PostHouseTabPageModule)
      },
      {
        path: '',
        redirectTo: 'tablinks/market',
        pathMatch: 'full'
      },
    ]
  },
  {
    path: '',
    redirectTo: 'tablinks/market',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TablinksPageRoutingModule {}
