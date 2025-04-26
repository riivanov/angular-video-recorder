import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Actions, Store } from '@ngxs/store';
import { firstValueFrom } from 'rxjs';
import { VideoStateModel } from '../../store/video/video.state';
import { RemoveVideo } from '../../store/video/videos.actions';
import { VideosState } from '../../store/video/videos.state';
import { DeleteVideoDialogComponent } from '../delete-video-dialog/delete-video-dialog.component';
import { PlayVideoDialogComponent } from '../play-video-dialog/play-video-dialog.component';

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

  async removeVideo(video: VideoStateModel) {
    const dialogRef = this.dialog.open(DeleteVideoDialogComponent);
    const res = await firstValueFrom<boolean>(dialogRef.afterClosed());
    if (res) {
      this.store.dispatch(new RemoveVideo(video));
    }
  }

  changeOpacity(el: HTMLDivElement, percent: number) {
    el.style.opacity = `${percent}%`
  }

  showPlayVideoDialog(video: VideoStateModel) {
    this.dialog.open(PlayVideoDialogComponent)
  }
}
