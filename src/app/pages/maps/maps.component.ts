import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'camp-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class MapsComponent implements OnInit {

  lat: number = 48.122339;
  lng: number = -117.227347;
  zoom: number = 15;

  markers = [
    {
      lat: 48.120542,
      lng: -117.236771,
      label: 'A',
      description: 'Parking'
    },
    {
      lat: 48.123929,
      lng: -117.237454,
      label: 'B',
      description: 'Camp Sunrise'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
