import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from '../../providers/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string;
  password: string;

  constructor( private navCtrl: NavController, private authService: AuthService ) { }

  ngOnInit() {
  }

  login(){
    this.authService.login(this.email, this.password).then(res=>{
      console.log(res);
      this.navCtrl.navigateRoot("/home");
    }).catch(err=>{
      console.log(err);
    })
    
  }

}
