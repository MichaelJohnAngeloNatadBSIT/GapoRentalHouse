import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowHidePasswordComponent } from '../show-hide-password/show-hide-password.component';
import { IonicModule } from '@ionic/angular';
import { DetailComponent } from '../detail/detail.component';
import { DetailMarketComponent } from '../detail-market/detail-market.component';



@NgModule({
  declarations: [ShowHidePasswordComponent, DetailComponent, DetailMarketComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports:[ShowHidePasswordComponent,DetailComponent, DetailMarketComponent]
})
export class SharedModule { }
