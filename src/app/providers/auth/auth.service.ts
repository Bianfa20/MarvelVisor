import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import * as firebase from 'firebase/app';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: any;

  constructor( private afAuth: AngularFireAuth, private storage: Storage ) { 

    this.initUser();

    this.storage.get('user').then(user=>{
      user ? this.user = JSON.parse(user) : false;
    });
  
    this.afAuth.authState.subscribe(res=>{
      if(res){
        this.user = res;
        this.storage.set('user', JSON.stringify(this.afAuth.auth.currentUser));
      }else{
        this.initUser();
        this.storage.remove('user');
      }
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
        resolve({code: "loggedIn"});
      }).catch(err=>{
        resolve(err)
      })
    })
  }

  logout(){
    this.storage.clear();
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
    this.storage.clear();
    return this.user.delete();
  }

}
