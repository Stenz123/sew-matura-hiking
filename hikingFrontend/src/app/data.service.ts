import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HikeDetail, ReviewDto, Tour, TourDetail} from './types';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  private http = inject(HttpClient)
  BASE_URL = "http://localhost:8080/api"

  getAllTours(){
    return this.http.get<Tour[]>(this.BASE_URL+"/tour")
  }
  getTourDetail(id: number){
    return this.http.get<TourDetail>(this.BASE_URL+"/tour/"+id)
  }
  getHike(id: number){
    return this.http.get<HikeDetail>(this.BASE_URL+"/hikes/"+id)
  }

  postReview(hikeId: number, review: ReviewDto) {
    return this.http.post(this.BASE_URL+"/review/hike/"+hikeId, review)
  }
}
