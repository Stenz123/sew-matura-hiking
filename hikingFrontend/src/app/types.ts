export interface Tour {
  "id": number,
  "name": string,
  "startDate": Date
  "endDate": Date
  "hikes": string
  "rating": number
}

export interface TourDetail {
  "id": number,
  "name": string,
  "startDate": Date
  "endDate": Date
  "hikes": Hike[]
}
export interface Hike {
  "id": number
  "title": string
  "difficulty": Difficulty
  "lengthInKm": number
  "region": string
}

export interface HikeDetail{
  "id": number
  "title": string
  "difficulty": Difficulty
  "length": number
  "region": string,
  "averageRating": number,
  "bestRating": string,
  "numberOfReviews": string
  "hikeReviews": Review[]
}

export interface Review{
  "id": number,
  "rating": number,
  "comment": string,
  "createdAt": Date,
  "person": Person
}

export interface Person{
  "id": number
  "name": string
  "email": string
  "registeredAt": Date
}

export interface ReviewDto{
  personId: number,
  comment: string,
  rating: number
}

export enum Difficulty{
  EASY = "Easy",
  MEDIUM = "MEDIUM",
  DIFFICULT = "Difficult"
}
