import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideMenuComponent } from './side-menu.component';
import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [
    SideMenuComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    SideMenuComponent
  ]
})
export class SideMenuModule { }
