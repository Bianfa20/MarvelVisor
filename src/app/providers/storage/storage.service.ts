import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor( private afStorage: AngularFireStorage ) { }

  uploadPicture(username, picture){

    return new Promise((resolve, reject)=>{

      var ref = this.afStorage.ref(`profiles/${username}${new Date().valueOf().toString()}.jpg`);
      var uploadTask = ref.putString(picture, 'data_url', { contentType: 'image/jpeg' }).then(snapshot=>{
        resolve(snapshot.ref.getDownloadURL());
      });

      /* task.percentageChanges();

      task.snapshotChanges().pipe(
        finalize(() => {
          resolve(ref.getDownloadURL())
        })
      ).subscribe() */      

    });

  }

}
