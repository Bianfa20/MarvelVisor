import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-comic-details',
  templateUrl: './comic-details.page.html',
  styleUrls: ['./comic-details.page.scss'],
})
export class ComicDetailsPage implements OnInit {

  comic: any;

  constructor( private navCtrl: NavController, private storage: Storage ) { 

    this.comic = {};

    this.storage.get('comic').then(comic=>{
      this.comic = comic ? JSON.parse(comic) : {};
    })    
  }

  createLink(path, extension){
    return `${path}.${extension}`;
  }

  ngOnInit() {
  }

  backToHome(){
    this.navCtrl.navigateBack('home');
  }

}
