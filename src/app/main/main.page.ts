import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  segmentModel = 'mis-denuncias';
  iduser = 0;

  constructor() {
    this.iduser = history.state.iduser;
    console.log('[Main]',this.iduser);
  }

  ngOnInit() {
  }

}
