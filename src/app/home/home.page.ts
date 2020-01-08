import { Component, ViewChild } from '@angular/core';
import { ComicsService } from '../providers/comics/comics.service';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  @ViewChild(IonContent, {static: true}) content: IonContent;

  availableComics: Array<JSON>;
  interval: number;

  constructor( private comicsService: ComicsService) {

    this.availableComics = this.comicsService.loadComics(1);
    this.interval = this.countIntervals(this.comicsService.getnComics());

  }

  createLink(path, extension){
    return `${path}.${extension}`;
  }

  loadMoreComics(ev: any){
    this.availableComics = this.comicsService.loadComics(ev['detail'].value);
    this.content.scrollToTop();
  }

  countIntervals(nComics){
    var interval = nComics / 6;
    if(parseInt(interval.toString()) < interval) {
      var interval = parseInt(interval.toString()) + 1;
    }
    return interval;
  }

  counter(){
    return Array(this.interval - 1);
  }

}
