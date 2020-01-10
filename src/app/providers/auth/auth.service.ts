import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: any;

  constructor( private afAuth: AngularFireAuth, private storageService: StorageService ) { 

    this.initUser();

  }

  initUser(){
    this.user = {
      displayName: null,
      email: null,
      photoURL: ''
    };
  }

  login(email: string, password: string){
    return new Promise((resolve, reject)=>{
      this.afAuth.auth.signInWithEmailAndPassword(email, password).then(res=>{
        this.user = res.user;
        resolve(this.user);
      }).catch(err=>{
        console.log(err)
      })
    })
  }

  logout(){
    this.afAuth.auth.signOut();
    this.initUser();
  }

  createUser(username: string, email: string, password: string, picture: any){

    this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(res=>{

      this.storageService.uploadPicture(email, picture).then(url=>{
        /* res.user.updateProfile({
          displayName: username,
          photoURL: "https://img.freepik.com/vector-gratis/perfil-empresario-dibujos-animados_18591-58479.jpg?size=338&ext=jpg"
        }); */
        console.log(url);
      });
      
    }).catch(err=>{
      console.log(err);
    })
    
  }

}
