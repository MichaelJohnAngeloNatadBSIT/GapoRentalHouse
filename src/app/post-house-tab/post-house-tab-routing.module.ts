import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostHouseTabPage } from './post-house-tab.page';

const routes: Routes = [
  {
    path: '',
    component: PostHouseTabPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostHouseTabPageRoutingModule {}
