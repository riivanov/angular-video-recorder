import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Actions, Store } from '@ngxs/store';
import { VideosState } from '../../store/video/videos.state';
import { VideoComponent } from '../video-component/video-component.component';

@Component({
  selector: 'app-videos-component',
  imports: [CommonModule, VideoComponent],
  templateUrl: './videos-component.component.html',
  styleUrl: './videos-component.component.scss',
})
export class VideosComponent {
  actions$ = inject(Actions);
  videos$ = inject(Store).selectSignal(VideosState.videos);
}
