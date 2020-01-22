import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import * as firebase from 'firebase/app';
import { Storage } from '@ionic/storage';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  ownUser: boolean;
  user: any;

  constructor( private platform: Platform, private fb: Facebook, private googlePlus: GooglePlus, private afAuth: AngularFireAuth, private storage: Storage ) { 

    this.ownUser = false;
    this.initUser();

    this.storage.get('ownUser').then(res=>{
      res ? this.ownUser = res : false;
    })

    this.storage.get('user').then(user=>{
      user ? this.user = JSON.parse(user) : false;
    });
  
    this.afAuth.authState.subscribe(res=>{
      if(res){
        this.user = res;
        this.storage.set('user', JSON.stringify(this.afAuth.auth.currentUser));
        this.storage.set('ownUser', this.ownUser);
      }else{
        this.initUser();
        this.storage.remove('user');
        this.storage.remove('ownUser');
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
      this.ownUser = true;
      this.afAuth.auth.signInWithEmailAndPassword(email, password).then(res=>{
        resolve({code: "loggedIn"});
      }).catch(err=>{
        resolve(err)
      })
    })
  }

  loginWithGoogle(){    
    return new Promise((resolve, reject)=>{
      this.ownUser = false;
      if(this.platform.is('capacitor')){
        this.googlePlus.login({
          'webClientId': '204426299781-e6inuu1lp1mr4kfsjndcf56pe8cri2sr.apps.googleusercontent.com',
          'offline': true
        })
        .then(res => {
          this.afAuth.auth.signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken)).then(res2=>{
            resolve(true);
          })
        })
        .catch(err => console.error(err));
      }else{
        this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(res=>{
          resolve(true);
        }).catch(err=>console.log(err));
      }
    });
  }

  loginWithFacebook(){
    return new Promise((resolve, reject)=>{
      this.ownUser = false;
      if(this.platform.is('capacitor')){

        this.fb.login(['public_profile', 'email']).then((res: FacebookLoginResponse)=>{
          const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
          this.afAuth.auth.signInWithCredential(facebookCredential).then(res2=>{
            resolve(true)
          });
        }).catch(e =>{
          console.log(JSON.stringify(e));
          resolve(false);
        });

      }else{
        this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider()).then(res=>{
          console.log(res.user)
          resolve(true);
        })
      }
    });
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
