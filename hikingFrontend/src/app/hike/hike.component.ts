import {Component, inject} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DataService} from '../data.service';
import {Hike, HikeDetail} from '../types';
import {ReviewComponent} from '../review/review.component';

@Component({
  selector: 'app-hike',
  imports: [
    ReviewComponent
  ],
  templateUrl: './hike.component.html',
  styleUrl: './hike.component.css'
})
export class HikeComponent {
  router : Router = inject(Router);
  route : ActivatedRoute = inject(ActivatedRoute);
  dataService = inject(DataService)

  hike: HikeDetail|null = null

  public constructor() {
    const id = Number(this.route.snapshot.params['id']);
    this.dataService.getHike(id).subscribe({
      next: d => {
        this.hike = d
      },
      error: err => {
        this.router.navigate(['/not-found'])
      }
    })
  }
}
