import {Component, Input} from '@angular/core';
import {Review} from '../types';
import {MatCard, MatCardTitle} from '@angular/material/card';

@Component({
  selector: 'app-review',
  imports: [
    MatCard,
    MatCardTitle
  ],
  templateUrl: './review.component.html',
  styleUrl: './review.component.css'
})
export class ReviewComponent {
  @Input() review!: Review;

  starString() {
    let res = ""
    for (let i = 0; i < 5; i++) {
      if (i >= this.review.rating) {
        res+='☆'
      }
      else {
        res+='★'
      }
    }
    return res
  }
}
