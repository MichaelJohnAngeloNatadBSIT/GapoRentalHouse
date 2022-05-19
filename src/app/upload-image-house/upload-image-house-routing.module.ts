import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UploadImageHousePage } from './upload-image-house.page';

const routes: Routes = [
  {
    path: '',
    component: UploadImageHousePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UploadImageHousePageRoutingModule {}
