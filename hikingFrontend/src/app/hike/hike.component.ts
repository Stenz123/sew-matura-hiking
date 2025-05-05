import {Component, inject} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DataService} from '../data.service';
import {HikeDetail, Person, ReviewDto} from '../types';
import {ReviewComponent} from '../review/review.component';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {MatOption} from '@angular/material/core';
import {MatSelect} from '@angular/material/select';
import {MatError} from '@angular/material/form-field';
import {Subscription} from 'rxjs';
import {ReviewSocketService} from '../review-socket.service';

@Component({
  selector: 'app-hike',
  imports: [
    ReviewComponent,
    MatCard,
    MatCardHeader,
    MatCardContent,
    ReactiveFormsModule,
    MatLabel,
    MatFormField,
    MatButton,
    MatOption,
    MatSelect,
    MatError,
    MatCardTitle,
    MatInput
  ],
  templateUrl: './hike.component.html',
  styleUrl: './hike.component.css'
})
export class HikeComponent {
  router : Router = inject(Router);
  route : ActivatedRoute = inject(ActivatedRoute);
  dataService = inject(DataService)
  socketService = inject(ReviewSocketService)

  private optionSubscription: Subscription | undefined;

  hike: HikeDetail|null = null
  people: Person[] = []

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

    this.dataService.getPeople().subscribe({
      next: d => {
        this.people = d
        console.log(d)
      },
    })

    this.optionSubscription = this.socketService.receiveMessages().subscribe({
      next: item => {
        // For detail page replacement
        this.hike?.hikeReviews.unshift(item)
        // For list update
        //this.dataSource.data = [...this.dataSource.data, item];
      },
      error: err => {
        console.error(err)
      }
    })
  }
  ngOnDestroy(): void {
    this.optionSubscription?.unsubscribe();
  }

  private fb = inject(FormBuilder);
  form = this.fb.group({
    // TODO 2: Configure your form controls
    person: [1, [Validators.required]],
    comment: ['', [Validators.required]],
    rating: [3, [Validators.required, Validators.min(0), Validators.max(5)]]
  });


  onSubmit() {
    const value = this.form.value;
    const data : ReviewDto= {
      personId: value.person!,
      comment: value.comment!,
      rating: value.rating!
    }

    this.dataService.postReview(this.hike!.id, data).subscribe({
      next: () => this.handleSuccess(),
      error: (err) => console.error('Operation failed:', err)
    });
  }

  private handleSuccess() {
    this.form.reset();
  }
}
