import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Actions, Store } from '@ngxs/store';
import { VideosState } from '../../store/video/videos.state';
import { RemoveVideo } from '../../store/video/videos.actions';
import { VideoStateModel } from '../../store/video/video.state';

@Component({
  selector: 'app-videos-component',
  imports: [CommonModule],
  templateUrl: './videos-component.component.html',
  styleUrl: './videos-component.component.scss',
})
export class VideosComponent {
  actions$ = inject(Actions);
  videos$ = inject(Store).selectSignal(VideosState.videos);

  constructor(private readonly store: Store) {}
  
  removeVideo(video: VideoStateModel) {
    this.store.dispatch(new RemoveVideo(video));
  }
}
