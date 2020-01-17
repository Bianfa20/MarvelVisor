import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor( private afStorage: AngularFireStorage ) { }

  uploadPicture(username, picture){

    return new Promise((resolve, reject)=>{

      var ref = this.afStorage.ref(`profiles/${username}${new Date().valueOf().toString()}.jpg`);
      
      var uploadTask = ref.putString(picture, 'base64', { contentType: 'image/jpeg' });

      uploadTask.task.on('state_changed',
        ()=>{},  //Know % of load
        ()=>{},  //Errors
        ()=>{    //Successfully

          uploadTask.task.snapshot.ref.getDownloadURL().then(url=>{
            resolve(url);
          })

        } 
      )

      //task.percentageChanges();   

    });

  }

}
