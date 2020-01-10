import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-logup',
  templateUrl: './logup.page.html',
  styleUrls: ['./logup.page.scss'],
})
export class LogupPage implements OnInit {

  stateOne: boolean;

  constructor( private navCtrl: NavController ) { 

    this.stateOne = true;

  }

  ngOnInit() {
  }

  backToLogin(){
    this.navCtrl.navigateBack("/login");
  }

  toggleState(){
    this.stateOne ? this.stateOne = false : this.stateOne = true;
  }

}
