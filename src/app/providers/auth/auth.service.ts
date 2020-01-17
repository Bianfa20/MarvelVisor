import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: any;

  constructor( private afAuth: AngularFireAuth ) { 

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

  logout(){
    this.afAuth.auth.signOut();
    this.initUser();
  }

  createUser(username: string, email: string, password: string){

    return new Promise((resolve, reject)=>{
      this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(res=>{

        res.user.updateProfile({
          displayName: username
        }).then(()=>{
          resolve({code: ""});
        });
        
      }).catch(err=>{
        resolve(err)
      })
    })
    
  }

  linkPicture(url: string){
    this.afAuth.auth.currentUser.updateProfile({
      photoURL: url
    })
  }

  deleteUser(){
    this.initUser();
    return this.afAuth.auth.currentUser.delete();
  }

}
