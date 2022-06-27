import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import{ redirectUnauthorizedTo, redirectLoggedInTo, canActivate,} from '@angular/fire/auth-guard';
import { identity } from 'rxjs';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['home']);
const routes: Routes = [
  {
    path: '',
    loadChildren: () => 
      import('./login/login.module').then( m => m.LoginPageModule),
      //if logged in already, you will be sent to home page 
    ...canActivate(redirectLoggedInToHome)
  },
  {
    path: 'home',
    loadChildren: () => 
      import('./home/home.module').then( m => m.HomePageModule),
      //if not logged in: you will be sent to login page
    ...canActivate(redirectUnauthorizedToLogin)
    
  },
  {
    path: 'home/:id',
    loadChildren: () => import('./home/movie-details/movie-details.module').then( m => m.MovieDetailsPageModule)
  },
  {
    path: 'tabs',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'tab1',
    loadChildren: () => import('./home/tab1/tab1.module').then( m => m.Tab1PageModule)
  },
  {
    path: 'tab2',
    loadChildren: () => import('./home/tab2/tab2.module').then( m => m.Tab2PageModule)
  },
  {
    path: 'tab3',
    loadChildren: () => import('./home/tab3/tab3.module').then( m => m.Tab3PageModule)
  },
  {
    path: 'chat',
    loadChildren: () => import('./chat/chat.module').then( m => m.ChatPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
