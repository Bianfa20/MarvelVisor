import { Component } from '@angular/core';
import { ComicsService } from '../providers/comics/comics.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor( private comicsService: ComicsService ) {

    console.log(this.comicsService.comicsData);

  }

}
