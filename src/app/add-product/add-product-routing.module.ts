import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddProductPage } from './add-product.page';

const routes: Routes = [
  {
    path: '',
    component: AddProductPage
  },
  {
    path: 'detail',
    loadChildren: () => import('../detail/detail.component').then( m => m.DetailComponent)
  },
  {
    path: 'tablinks',
    loadChildren: () => import('../tablinks/tablinks.module').then(m => m.TablinksPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddProductPageRoutingModule {}
