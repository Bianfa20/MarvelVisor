import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-logup',
  templateUrl: './logup.page.html',
  styleUrls: ['./logup.page.scss'],
})
export class LogupPage implements OnInit {

  stateOne: number;
  photo: SafeResourceUrl;

  constructor( private navCtrl: NavController, private sanitizer: DomSanitizer ) { 

    this.stateOne = 0;

  }

  ngOnInit() {
  }

  backToLogin(){
    this.navCtrl.navigateBack("/login");
  }

  upState(){
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

    console.log(this.photo);

  }

}
