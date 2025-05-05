import { Injectable } from '@angular/core';
import {webSocket} from 'rxjs/webSocket';
import {Review} from './types';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewSocketService {

  private socket = webSocket<Review>('ws://localhost:8080/ws/review');

  receiveMessages(): Observable<Review> {
    return this.socket.asObservable();
  }}
