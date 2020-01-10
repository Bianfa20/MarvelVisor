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

  constructor( private navCtrl: NavController, private authService: AuthService, private menuCtrl: MenuController ) { }

  ngOnInit() {
  }

  login(){
    this.authService.login(this.email, this.password).then(res=>{
      this.menuCtrl.enable(true);
      this.navCtrl.navigateRoot("/home");
    })
    
  }

}
