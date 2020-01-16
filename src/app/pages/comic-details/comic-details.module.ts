import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComicDetailsPageRoutingModule } from './comic-details-routing.module';

import { ComicDetailsPage } from './comic-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComicDetailsPageRoutingModule
  ],
  declarations: [ComicDetailsPage]
})
export class ComicDetailsPageModule {}
