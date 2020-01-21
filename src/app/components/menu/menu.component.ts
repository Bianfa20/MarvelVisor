import { Component, OnInit } from '@angular/core';
import { NavController, MenuController } from '@ionic/angular';
import { AuthService } from '../../providers/auth/auth.service';
import { Storage } from '@ionic/storage';
import { Plugins } from '@capacitor/core';
const { Toast } = Plugins;

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  constructor( private authService: AuthService, private navCtrl: NavController, private menuCtrl: MenuController, private storage: Storage ) { }

  ngOnInit() {}

  logout(){
    this.menuCtrl.toggle().then(()=>{
      this.menuCtrl.enable(false).then(()=>{
        this.authService.logout();
        this.clearDataBase();
        this.navCtrl.navigateRoot("/login");   
        this.showToast("Sesión cerrada exitosamente")     
      })
    })
  }

  deleteUser(){
    this.authService.deleteUser().then(()=>{
      this.menuCtrl.enable(false).then(()=>{
        this.clearDataBase();
        this.navCtrl.navigateRoot("/login"); 
        this.showToast("Usuario eliminado exitosamente")
      })           
    })
  }

  clearDataBase(){
    this.storage.clear();
  }

  async showToast(message: string) {
    await Toast.show({
      text: message
    });
  }

}
