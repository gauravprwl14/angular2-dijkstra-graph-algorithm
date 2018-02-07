import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-node-container',
  templateUrl: './node-container.component.html',
  styleUrls: ['./node-container.component.scss']
})
export class NodeContainerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log('%c insidne NodeContainerComponent ', 'background: lime; color: black');
  }

}
