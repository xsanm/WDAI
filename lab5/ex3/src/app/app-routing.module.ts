import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from "./home/home.component"
import { PhotosComponent } from "./photos/photos.component"
import { PostsComponent } from "./posts/posts.component"

const routes: Routes = [
  { path: 'home-component', component: HomeComponent },
  { path: 'photos-component', component: PhotosComponent },
  { path: 'posts-component', component: PostsComponent },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
