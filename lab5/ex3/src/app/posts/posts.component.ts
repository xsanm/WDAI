import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HolderService } from '../holder.service';
import { Post } from './post';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  posts!: Post[];

  newPost!: Post;


  constructor(
    private postService: HolderService
  ) { 
  }
  
  getPosts(): void{
    this.postService.getPosts()
      .subscribe(posts => this.posts = posts)
  }

  ngOnInit(): void {
    this.getPosts();
  }


  onSubmit(a:string, b:string) {
    this.newPost = {
      userId: 1,
      id: 1,
      title: a,
      body: b
    };
    //console.log(this.postService.addPost(this.newPost));
    this.posts.unshift(this.newPost);
  }

}
