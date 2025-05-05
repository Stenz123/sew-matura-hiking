import { Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {TourListComponent} from './tour-list/tour-list.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {HikeListComponent} from './hike-list/hike-list.component';
import {HikeComponent} from './hike/hike.component';
import {ReviewComponent} from './review/review.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'tour',
    component: TourListComponent,
    title: 'tour'
  },
  {
    path: 'tour/:id',
    component: HikeListComponent,
    title: 'hikes'
  },
  {
    path: 'hike/:id',
    component: HikeComponent,
    title: 'hikes detail'
  },
  {
    path: 'hike/:id/Review',
    component: ReviewComponent,
    title: 'Review'
  },
  {
    path: '**',
    component: NotFoundComponent,
    title: 'Page Not Found'
  }
];
