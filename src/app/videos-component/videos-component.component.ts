import { Component, inject } from '@angular/core';
import { Store } from '@ngxs/store';
import { VideosState } from '../../store/video/videos.state';
import { CommonModule } from '@angular/common';
import { VideoComponentComponent } from "../video-component/video-component.component";

@Component({
  selector: 'app-videos-component',
  imports: [CommonModule, VideoComponentComponent],
  templateUrl: './videos-component.component.html',
  styleUrl: './videos-component.component.scss'
})
export class VideosComponentComponent {
  videos$ = inject(Store).selectSignal(VideosState.videos)
}
