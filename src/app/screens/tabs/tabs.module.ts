import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabsPageRoutingModule } from './tabs-routing.module';
import { CalendarPageModule } from '../calendar/calendar.module';
import { GoalsPageModule } from '../goals/goals.module';
import { ProfilePageModule } from '../profile/profile.module';

import { TabsPage } from './tabs.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule,
    CalendarPageModule,
    GoalsPageModule,
    ProfilePageModule,
  ],
  declarations: [TabsPage],
})
export class TabsPageModule {}
