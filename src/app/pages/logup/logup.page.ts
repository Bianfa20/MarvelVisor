import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AuthService } from '../../providers/auth/auth.service';

@Component({
  selector: 'app-logup',
  templateUrl: './logup.page.html',
  styleUrls: ['./logup.page.scss'],
})
export class LogupPage implements OnInit {

  stateOne: number;
  photo: SafeResourceUrl;
  userName: string;
  email: string;
  password: string;
  passwordC: string;
  message: string;

  constructor( private navCtrl: NavController, private sanitizer: DomSanitizer, private authService: AuthService ) { 

    this.stateOne = 0;
    this.userName, this.email, this.password, this.passwordC = "";

  }

  ngOnInit() {
  }

  backToLogin(){
    this.navCtrl.navigateBack("/login");
  }

  upperState(){
    this.stateOne += 1;
  }

  lowerState(){
    this.stateOne -= 1;
  }

  async takePicture() {
    const image = await Plugins.Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera
    });

    this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(image && (image.dataUrl));

    this.upperState();

  }

  signIn() {
    if(this.userName != "" && this.email != "" && this.password != "" && this.passwordC != ""){
      if(this.password.length > 5){
        if(this.password == this.passwordC){
          if(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(this.email)){
            this.upperState();
            this.message = "Datos guardado."
          }else{
            this.message = "Correo invalido."
          }
        }else{
          this.message = "Las contraseñas no coinciden."
        }
      }else{
        this.message = "La contraseña debe tener minimo 6 caracteres."
      }
    }else{
      this.message = "No debe haber campos vacios."
    }
  }

  createUser() {
    this.authService.createUser(this.userName, this.email, this.password, this.photo).then(res=>{
      if(res["code"]!="auth/email-already-in-use"){
        this.navCtrl.navigateBack("/login");
      }else{
        this.stateOne = 0;
        this.message = "Este correo ya esta en uso."
      }
    })
    
  }

}
