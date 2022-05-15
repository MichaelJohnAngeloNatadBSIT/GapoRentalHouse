import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowHidePasswordComponent } from '../show-hide-password/show-hide-password.component';
import { IonicModule } from '@ionic/angular';
import { DetailComponent } from '../detail/detail.component';
import { DetailMarketComponent } from '../detail-market/detail-market.component';
import { DetailCalendarComponent } from '../detail-calendar/detail-calendar.component';



@NgModule({
  declarations: [ShowHidePasswordComponent, 
                 DetailComponent, 
                 DetailMarketComponent, 
                 DetailCalendarComponent,],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports:[ShowHidePasswordComponent,
           DetailComponent, 
           DetailMarketComponent, 
           DetailCalendarComponent,]
})
export class SharedModule { }
