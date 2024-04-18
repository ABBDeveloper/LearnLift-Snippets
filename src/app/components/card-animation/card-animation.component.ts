import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-animation',
  templateUrl: './card-animation.component.html',
  styleUrls: ['./card-animation.component.scss'],
})
export class CardAnimationComponent  implements OnInit {

  @Input() loaderText: string = '';

  constructor() { }

  ngOnInit() {}
}