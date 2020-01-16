import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import * as firebase from 'firebase/app';
import { StorageService } from '../storage/storage.service';
import { GooglePlus } from '@ionic-native/google-plus/ngx';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: any;

  constructor( private afAuth: AngularFireAuth, private storageService: StorageService, private googlePlus: GooglePlus ) { 

    this.initUser();

    this.afAuth.authState.subscribe(res=>{
      res ? this.user = res : this.initUser();
    })

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
        resolve({code: "loggedIn"});
      }).catch(err=>{
        resolve(err)
      })
    })
  }

  loginWithGoogle(){
    return new Promise((resolve, reject)=>{
      this.googlePlus.login({
        'webClientId': '870418845580-fngrrbnimgcti7cs2gvi1sfljc6oconp.apps.googleusercontent.com',
        'offline': true
      }).then(res=>{
        this.afAuth.auth.signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken));
        this.user = res.user;
        resolve();
      }).catch(err=>console.log(err));
    })
  }

  logout(){
    this.afAuth.auth.signOut();
    this.initUser();
  }

  createUser(username: string, email: string, password: string, picture: any){

    return new Promise((resolve, reject)=>{
      this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(res=>{

        this.storageService.uploadPicture(username, picture).then(url=>{
          res.user.updateProfile({
            displayName: username,
            photoURL: url + ""
          });
        });

        resolve({code: ""});
        
      }).catch(err=>{
        console.log(err)
        resolve(err)
      })
    })
    
  }

  deleteUser(){
    return this.afAuth.auth.currentUser.delete();
  }

}
