import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Actions, Store } from '@ngxs/store';
import { VideoStateModel } from '../../store/video/video.state';
import { VideosState } from '../../store/video/videos.state';
import { DeleteVideoDialogComponent } from '../delete-video-dialog/delete-video-dialog.component';

@Component({
  selector: 'app-videos-component',
  imports: [CommonModule, MatDialogModule],
  templateUrl: './videos-component.component.html',
  styleUrl: './videos-component.component.scss',
})
export class VideosComponent {
  actions$ = inject(Actions);
  videos$ = inject(Store).selectSignal(VideosState.videos);
  readonly dialog = inject(MatDialog);

  constructor(private readonly store: Store) {}

  removeVideo(video: VideoStateModel) {
    this.dialog.open(DeleteVideoDialogComponent);
    // this.store.dispatch(new RemoveVideo(video));
  }
}
