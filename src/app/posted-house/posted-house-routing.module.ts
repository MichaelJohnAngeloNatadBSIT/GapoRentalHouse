import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostedHousePage } from './posted-house.page';

const routes: Routes = [
  {
    path: '',
    component: PostedHousePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostedHousePageRoutingModule {}
