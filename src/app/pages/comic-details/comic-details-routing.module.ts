import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComicDetailsPage } from './comic-details.page';

const routes: Routes = [
  {
    path: '',
    component: ComicDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComicDetailsPageRoutingModule {}
