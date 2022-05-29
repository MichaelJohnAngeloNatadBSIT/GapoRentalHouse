import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IntroGuard } from './guards/intro.guard';
import { AutoLoginGuard } from './guards/auto-login.guard';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [

  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule),
    canLoad: [IntroGuard, AutoLoginGuard] // Check if we should show the introduction or forward to inside
  },

  {
    path: 'tablinks',
    loadChildren: () => import('./tablinks/tablinks.module').then(m => m.TablinksPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'add-product',
    loadChildren: () => import('./add-product/add-product.module').then( m => m.AddProductPageModule)
  },
  {
    path: 'detail',
    loadChildren: () => import('./detail/detail.component').then( m => m.DetailComponent)
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'intro',
    loadChildren: () => import('./intro/intro.module').then( m => m.IntroPageModule)
  },
  {
    path: 'edit-profile',
    loadChildren: () => import('./edit-profile/edit-profile.module').then( m => m.EditProfilePageModule)
  },
  {
    path: 'upload-image',
    loadChildren: () => import('./upload-image/upload-image.module').then( m => m.UploadImagePageModule)
  },
  {
    path: 'posted-house',
    loadChildren: () => import('./posted-house/posted-house.module').then( m => m.PostedHousePageModule)
  },
  {
    path: 'schedule-visit',
    loadChildren: () => import('./schedule-visit/schedule-visit.module').then( m => m.ScheduleVisitPageModule)
  },  {
    path: 'edit-product',
    loadChildren: () => import('./edit-product/edit-product.module').then( m => m.EditProductPageModule)
  },
  {
    path: 'change-password',
    loadChildren: () => import('./change-password/change-password.module').then( m => m.ChangePasswordPageModule)
  },
  {
    path: 'post-house-tab',
    loadChildren: () => import('./post-house-tab/post-house-tab.module').then( m => m.PostHouseTabPageModule)
  },
  {
    path: 'schedule-list',
    loadChildren: () => import('./schedule-list/schedule-list.module').then( m => m.ScheduleListPageModule)
  },
  {
    path: 'schedule-list-detail',
    loadChildren: () => import('./schedule-list-detail/schedule-list-detail.module').then( m => m.ScheduleListDetailPageModule)
  },
  {
    path: 'accepted-schedule',
    loadChildren: () => import('./accepted-schedule/accepted-schedule.module').then( m => m.AcceptedSchedulePageModule)
  },
  {
    path: 'pending-schedule',
    loadChildren: () => import('./pending-schedule/pending-schedule.module').then( m => m.PendingSchedulePageModule)
  },



  




  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
