import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PostHouseTabPageRoutingModule } from './post-house-tab-routing.module';

import { PostHouseTabPage } from './post-house-tab.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PostHouseTabPageRoutingModule
  ],
  declarations: [PostHouseTabPage]
})
export class PostHouseTabPageModule {}
