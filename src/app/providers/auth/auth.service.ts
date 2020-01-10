import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: any;

  constructor( private fAuth: AngularFireAuth ) { 

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
      this.fAuth.auth.signInWithEmailAndPassword(email, password).then(res=>{
        this.user = res.user;
        resolve(this.user);
      }).catch(err=>{
        console.log(err)
      })
    })
  }

  logout(){
    this.fAuth.auth.signOut();
    this.initUser();
  }

  createUser(){
    /* res.user.updateProfile({
        displayName: "Fabian Serna",
        photoURL: "https://img.freepik.com/vector-gratis/perfil-empresario-dibujos-animados_18591-58479.jpg?size=338&ext=jpg"
      }); */
  }

}
