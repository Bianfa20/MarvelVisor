import { Component, ViewChild } from '@angular/core';
import { ComicsService } from '../../providers/comics/comics.service';
import { IonContent } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { Plugins } from '@capacitor/core';
const { Network } = Plugins;


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  @ViewChild(IonContent, {static: true}) content: IonContent;

  availableComics: Array<JSON>;
  interval: number;

  constructor( private navCtrl: NavController, private afDB: AngularFireDatabase, private comicsService: ComicsService, private storage: Storage ) {

    this.interval = 0;

    Network.getStatus().then(status=>{
      status.connected ? this.loadHome() : this.interval = -1;
    })

    Network.addListener('networkStatusChange', status=>{
      status.connected ? this.loadHome() : this.interval = -1;
    });
    
  }

  createLink(path, extension){
    return `${path}.${extension}`;
  }

  loadMoreComics(ev: any){
    this.availableComics = this.comicsService.getComics(ev['detail'].value);
    this.availableComics.forEach(comic=>{
      this.afDB.object(`reactions/${comic['id']}/likes`).valueChanges().subscribe(likes=>{
        likes != null ? comic['likes'] = likes : comic['likes'] = 0;
      })
      this.afDB.object(`reactions/${comic['id']}/dislikes`).valueChanges().subscribe(dislikes=>{
        dislikes != null ? comic['dislikes'] = dislikes : comic['dislikes'] = 0;
      })
    })
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
      if(comic.like == 0 || comic.like == 2){
        if(comic.like == 2){
          this.comicsService.removeReaction(comic.id, 0);
        }           
        comic.like = 1;  
        this.comicsService.saveReaction(comic.id, comic.like);   
      }else{
        comic.like = 0;
        this.comicsService.removeReaction(comic.id, 1);
      }
      this.storage.set(comic.id + "", comic.like + "");
    }    
  }

  dislike(comic){
    if(typeof comic == 'object'){
      if(comic.like == 0 || comic.like == 1){        
        if(comic.like == 1){
          this.comicsService.removeReaction(comic.id, 1);
        }
        comic.like = 2;
        this.comicsService.saveReaction(comic.id, comic.like);
      }else{
        comic.like = 0;
        this.comicsService.removeReaction(comic.id, 0);
      }
      this.storage.set(comic.id + "", comic.like + "");
    }    
  }

  showDetail(comic){
    this.storage.set('comic', JSON.stringify(comic))
    this.navCtrl.navigateForward('comic-details');
  }

  async loadHome(){
    this.comicsService.loadComics().then(res=>{
      if(res == 1){
        this.availableComics = this.comicsService.getComics(1);
        this.interval = this.countIntervals(this.comicsService.getnComics());
        
        this.availableComics.forEach(comic=>{
          this.afDB.object(`reactions/${comic['id']}/likes`).valueChanges().subscribe(likes=>{
            likes != null ? comic['likes'] = likes : comic['likes'] = 0;
          })
          this.afDB.object(`reactions/${comic['id']}/dislikes`).valueChanges().subscribe(dislikes=>{
            dislikes != null ? comic['dislikes'] = dislikes : comic['dislikes'] = 0;
          })
        })
        console.log(res)
      }else if(res == 2){
        this.interval = -1;
        console.log("aqui")
      }else{
        this.interval = 0;
        setTimeout(()=>{
          this.loadHome()
        }, 3000);
      }
    })
  }

}
