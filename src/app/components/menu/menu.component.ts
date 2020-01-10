import { Component, OnInit } from '@angular/core';
import { NavController, MenuController } from '@ionic/angular';
import { AuthService } from '../../providers/auth/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  constructor( private authService: AuthService, private navCtrl: NavController, private menuCtrl: MenuController ) { }

  ngOnInit() {}

  logout(){
    this.menuCtrl.toggle();    
    this.navCtrl.navigateRoot("/login");
    this.authService.logout();
  }

}
