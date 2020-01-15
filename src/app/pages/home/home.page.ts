import { Component, ViewChild } from '@angular/core';
import { ComicsService } from '../../providers/comics/comics.service';
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

    this.interval = 0;

    this.comicsService.loadComics().then(res=>{
      if(res){
        this.availableComics = this.comicsService.getComics(1);
        this.interval = this.countIntervals(this.comicsService.getnComics());
      }else{
        this.interval = -1;
      }
    })
  }

  createLink(path, extension){
    return `${path}.${extension}`;
  }

  loadMoreComics(ev: any){
    this.availableComics = this.comicsService.getComics(ev['detail'].value);
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
    return this.interval > 0 ? Array(this.interval - 1) : [];
  }

  like(comic){
    if(typeof comic == 'object'){
      comic.like == 0 ? comic.like = 1 : comic.like = 0;
    }    
  }

  dislike(comic){
    if(typeof comic == 'object'){
      comic.like == 0 ? comic.like = 2 : comic.like = 0;
    }    
  }

}
