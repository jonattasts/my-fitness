import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CalendarPage } from './screens/calendar/calendar.page';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./screens/welcome/welcome.module').then(
        (m) => m.WelcomePageModule
      ),
  },

  {
    path: 'register',
    loadChildren: () =>
      import('./screens/register/register.module').then(
        (m) => m.RegisterModule
      ),
  },
  {
    path: 'confirmation',
    loadChildren: () =>
      import('./screens/confirmation/confirmation.module').then(
        (m) => m.ConfirmationPageModule
      ),
  },
  {
    path: 'tabs',
    loadChildren: () =>
      import('./screens/tabs/tabs.module').then((m) => m.TabsPageModule),
  },
  {
    path: 'tabs/calendar',
    component: CalendarPage,
  },
];

const initialRoutes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./screens/welcome/welcome.module').then(
        (m) => m.WelcomePageModule
      ),
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
