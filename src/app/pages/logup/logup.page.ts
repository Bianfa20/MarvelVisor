import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Plugins, CameraResultType, CameraSource, CameraDirection } from '@capacitor/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AuthService } from '../../providers/auth/auth.service';
import { StorageService } from '../../providers/storage/storage.service';
const { Toast } = Plugins;

@Component({
  selector: 'app-logup',
  templateUrl: './logup.page.html',
  styleUrls: ['./logup.page.scss'],
})
export class LogupPage implements OnInit {

  stateOne: number;
  picture: string;
  picture64: string;
  username: string;
  email: string;
  password: string;
  passwordC: string;
  message: string;
  loader: boolean;

  constructor( private navCtrl: NavController, private sanitizer: DomSanitizer, private authService: AuthService, private storageService: StorageService ) { 
    this.stateOne = 0;
    this.username, this.email, this.password, this.passwordC = "";
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

  async takePicture(flag) {

    this.loader = true;
    
    await Plugins.Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      direction: CameraDirection.Front,
      source: flag ? CameraSource.Camera : CameraSource.Photos,
      correctOrientation: true
    }).then(image=>{      
      this.picture = 'data:image/jpeg;base64,'+image.base64String;
      this.picture64 = image.base64String;
      this.loader = false;
      this.upperState();
    });

  }

  saveData() {
    if(this.username != "" && this.email != "" && this.password != "" && this.passwordC != ""){
      if(this.password.length > 5){
        if(this.password == this.passwordC){
          if(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(this.email)){
            this.upperState();
            this.picture ? this.upperState() : 1;
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
    this.loader = true;
    this.authService.createUser(this.username, this.email, this.password).then(res=>{
      switch(res["code"]){

        case "":
          this.storageService.uploadPicture(this.username, this.picture64).then(url=>{
            this.loader = false;
            if(url){
              this.authService.linkPicture(url+"");
              this.showToast("Registrado exitosamente")
            }else{
              this.authService.deleteUser();
              this.showToast("No se pude registrar")
            }
            this.navCtrl.navigateBack("/login");
          });          
          break;

        case "auth/email-already-in-use":
          this.loader = false;
          this.stateOne = 0;
          this.message = "Este correo ya esta en uso."
          break;

        default:
          this.loader = false;
          this.authService.deleteUser();
          this.showToast("No se pudo registrar")
          this.navCtrl.navigateBack("/login");
          break;

      }
    })    
  }

 async showToast(message: string) {
    await Toast.show({
      text: message
    });
  }

}
