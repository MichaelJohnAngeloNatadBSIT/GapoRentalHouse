import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowHidePasswordComponent } from '../show-hide-password/show-hide-password.component';
import { IonicModule } from '@ionic/angular';
import { DetailComponent } from '../detail/detail.component';



@NgModule({
  declarations: [ShowHidePasswordComponent, DetailComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports:[ShowHidePasswordComponent,DetailComponent]
})
export class SharedModule { }
