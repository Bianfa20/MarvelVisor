import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './guards/login/login.guard';
import { HomeGuard } from './guards/home/home.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule),
    canActivate: [LoginGuard]
  },
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule), 
    canActivate: [HomeGuard]
  },
  {
    path: 'logup',
    loadChildren: () => import('./pages/logup/logup.module').then( m => m.LogupPageModule)
  },
  {
    path: 'comic-details',
    loadChildren: () => import('./pages/comic-details/comic-details.module').then( m => m.ComicDetailsPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
