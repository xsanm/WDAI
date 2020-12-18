import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Photo } from './photos/photo';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Post } from './posts/post';

const httpOptions = {
  headers: new HttpHeaders ({
    'Content-Type': 'application/json',
  })
}
@Injectable({
  providedIn: 'root'
})
export class HolderService {
  private photosURL = "https://jsonplaceholder.typicode.com/photos";
  private postsURL = "https://jsonplaceholder.typicode.com/posts";

  
  constructor(private http: HttpClient) { }
  

  getPhotos(): Observable<Photo[]> {
    return this.http.get<Photo[]>(this.photosURL)
  }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.postsURL)
  }
  
  addPost(post: Post): Observable<Post> {
    return this.http.post<Post>(this.postsURL, post, httpOptions) 
  }

}
