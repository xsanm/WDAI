import { Component, OnInit } from '@angular/core';
import { HolderService } from '../holder.service';
import { Photo } from './photo';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit {

  photos: Photo[];
  constructor(
    private photosService: HolderService
  ) { }
  
  getPhotos(): void{
    this.photosService.getPhotos()
      .subscribe(photos => this.photos = photos)
  }

  ngOnInit(): void {
    this.getPhotos();
  }

}
