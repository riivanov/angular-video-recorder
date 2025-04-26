import { Component, Input } from '@angular/core';
import { VideoStateModel } from '../../store/video/video.state';

@Component({
  selector: 'app-play-video-dialog',
  imports: [],
  templateUrl: './play-video-dialog.component.html',
  styleUrl: './play-video-dialog.component.scss'
})
export class PlayVideoDialogComponent {
  @Input() video: VideoStateModel

}
