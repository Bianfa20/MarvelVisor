import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { StorageService } from '../storage/storage.service';
import { Plugins } from '@capacitor/core';

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
        resolve({code: "loggedIn"});
      }).catch(err=>{
        resolve(err)
      })
    })
  }

  async loginWithGoogle(){
    let googleUser = await Plugins.GoogleAuth.signIn();
    this.afAuth.auth.signInWithCredential(googleUser.authentication.idToken).then(ref=>{
      this.user = ref.user;
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

}
