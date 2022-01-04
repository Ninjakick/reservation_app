import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  activePath = '';

  pages = [
    {
      name: 'Voyage',
      icon: 'subway-outline',
      path: '/cooperativemenu/voyage'
    },
    {
      name: 'Client',
      icon: 'people-outline',
      path: '/cooperativemenu/client'
    },
    {
      name: 'Tarif',
      icon: 'cash-outline',
      path: '/cooperativemenu/tarif'
    },
    {
      name: 'Voiture',
      icon: 'car-outline',
      path: '/cooperativemenu/voiture'
    },
    {
      name: 'Déconnection',
      icon: 'log-out-outline',
      path: '/cooperativemenu/deconnection'
    }
  ]

  constructor(private router: Router) {
    this.router.events.subscribe((event: RouterEvent) => {
    	console.log(event.url)
      this.activePath = event.url
    })
  }

  ngOnInit() {
  }

}
