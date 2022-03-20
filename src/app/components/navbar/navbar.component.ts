import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  links = [{
   name: "Strona główna",
   link: "/recommend"
  },{
    name: "Top utwory",
    link: "/top/tracks"
  },{
    name: "Top wykonawcy",
    link: "/top/artists"
  }]

  constructor() { }

  ngOnInit(): void {
  }

}
