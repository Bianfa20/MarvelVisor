import { Component, OnInit } from '@angular/core';
import { NavController, MenuController } from '@ionic/angular';
import { AuthService } from '../../providers/auth/auth.service';
import { Plugins } from '@capacitor/core';
const { Toast } = Plugins;

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string;
  password: string;
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
            this.showToast('Este correo no se encuentra registrado');
            break;

          case "auth/invalid-email":
            this.showToast('Correo no valido');
            break;

          default: 
            this.showToast('Contraseña incorrecta');
            break;
        }
      })
    }else{
      this.showToast('No debe haber campos vacios');
    }     
  }

  toLogup(){
    this.navCtrl.navigateRoot("/logup");
  }

  loginWithGoogle(){
    this.authService.loginWithGoogle().then(res=>{
      if(res){
        this.menuCtrl.enable(true);
        this.navCtrl.navigateRoot('/home');
      }
    });
  }

  async showToast(message: string) {
    await Toast.show({
      text: message
    });
  }

}
