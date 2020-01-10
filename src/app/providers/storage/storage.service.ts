import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor( private afStorage: AngularFireStorage ) { }

  uploadPicture(email, picture){

    return new Promise((resolve, reject)=>{
      var ref = this.afStorage.ref(`profiles/${email}${new Date().valueOf().toString()}`);
      var task = ref.putString(picture, 'data_url', { contentType: 'image/jpeg' });

      task.percentageChanges();
  
      task.snapshotChanges().pipe(
        finalize(() => console.log(ref.getDownloadURL()))
      );

      resolve();

    });

  }

}
