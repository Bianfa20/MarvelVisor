import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private fAuth: AngularFireAuth ) { }

  login(email: string, password: string){
    return this.fAuth.auth.signInWithEmailAndPassword(email, password);
  }

  createUser(){
    /* res.user.updateProfile({
        displayName: "Fabian Serna",
        photoURL: "https://img.freepik.com/vector-gratis/perfil-empresario-dibujos-animados_18591-58479.jpg?size=338&ext=jpg"
      }); */
  }

}
