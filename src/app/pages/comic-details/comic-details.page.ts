import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-comic-details',
  templateUrl: './comic-details.page.html',
  styleUrls: ['./comic-details.page.scss'],
})
export class ComicDetailsPage implements OnInit {

  constructor( private navCtrl: NavController ) { }

  ngOnInit() {
  }

  backToHome(){
    this.navCtrl.navigateBack('home');
  }

}
