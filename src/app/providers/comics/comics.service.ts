import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComicsService {

  comicsData: any;

  constructor( private afDB: AngularFireDatabase, private storage: Storage ) {  }

  loadComics(){
    return new Promise((resolve, reject)=>{
      var url = "http://gateway.marvel.com/v1/public/comics?ts=1&apikey=b5dd158dd0e856443db7fb726fbc6bc9&hash=80182fcb24c6426319114b9e34eafed6";
      fetch(url).then(res=>{
        if(res.ok){
          res.text().then(res2=>{
            try {
              var data = JSON.parse(res2);        
              this.comicsData = data;

              this.comicsData['data']['results'].forEach(comic =>{
                this.storage.get(comic.id+"").then(reaction=>{
                  comic.like = reaction ? reaction : 0;
                })

                this.afDB.database.ref(`reactions/${comic.id}/likes`).on('value', snapshot=>{
                  comic.likes = snapshot.val();
                })

                this.afDB.database.ref(`reactions/${comic.id}/dislikes`).on('value', snapshot=>{
                  comic.dislikes = snapshot.val();
                })

              });              

              resolve(true);
            }catch(err){
              resolve(false);
            }
          })
        }else{
          resolve(false);
        }
      });
    })
  }

  getComics(range){
    
    var lowerRange = 6*(range-1);
    var upperRange = lowerRange + 6;

    return this.comicsData['data']['results'].filter(comic => comic['issueNumber'] > 0).slice(lowerRange, upperRange);

  }

  getnComics(){
    return this.comicsData['data']['results'].filter(comic => comic['issueNumber'] > 0).length;
  }

  saveReaction(comicId, flag){

    var ref;

    if(flag == 1){
      ref = this.afDB.database.ref(`reactions/${comicId}/likes`);
    }else{
      ref = this.afDB.database.ref(`reactions/${comicId}/dislikes`);
    }

    ref.transaction(value=>{
      return value + 1;
    })

  }

  removeReaction(comicId, flag){

    var ref;

    if(flag){
      ref = this.afDB.database.ref(`reactions/${comicId}/likes`);
    }else{
      ref = this.afDB.database.ref(`reactions/${comicId}/dislikes`);
    }

    ref.transaction(value=>{
      return value - 1;
    })
  }

}
