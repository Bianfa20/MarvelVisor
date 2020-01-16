import { Component, OnInit } from '@angular/core';
import { NavController, MenuController } from '@ionic/angular';
import { AuthService } from '../../providers/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string;
  password: string;
  message: string;
  loguedIn: boolean;

  constructor( private navCtrl: NavController, private authService: AuthService, private menuCtrl: MenuController ) {
    this.loguedIn = false;
    this.email, this.password = "";
   }

  ngOnInit() {
  }

  login(){
    if(this.email != "" && this.password != ""){
      this.loguedIn = true;
      this.authService.login(this.email, this.password).then(res=>{
        this.loguedIn = false;
        switch(res["code"]){

          case "loggedIn":
            this.menuCtrl.enable(true);
            this.navCtrl.navigateRoot("/home");
            break;

          case "auth/user-not-found":
            this.message = "Este correo no se encuentra registrado."
            break;

          case "auth/invalid-email":
            this.message = "Correo no valido."
            break;

          default: 
            this.message = "Contraseña incorrecta."
            break;
        }
      })
    }else{
      this.message = "No debe haber campos vacios."
    }     
  }

  toLogup(){
    this.navCtrl.navigateRoot("/logup");
  }

  loginWithGoogle(){
    this.authService.loginWithGoogle().then(res=>{
      
      this.menuCtrl.enable(true);
      this.message = JSON.stringify(this.authService.user);
      /* this.navCtrl.navigateRoot("/home"); */

    })
  }

}
