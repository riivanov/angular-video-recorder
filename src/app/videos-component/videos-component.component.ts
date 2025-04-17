import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, QueryList, ViewChildren } from '@angular/core';
import { Actions, ofActionSuccessful, Store } from '@ngxs/store';
import { StopRecording } from '../../store/video/video.actions';
import { VideosState } from '../../store/video/videos.state';
import { VideoComponentComponent } from '../video-component/video-component.component';

@Component({
  selector: 'app-videos-component',
  imports: [CommonModule, VideoComponentComponent],
  templateUrl: './videos-component.component.html',
  styleUrl: './videos-component.component.scss',
})
export class VideosComponentComponent {
  actions$ = inject(Actions);
  videos$ = inject(Store).selectSignal(VideosState.videos);
  @ViewChildren('player') players: QueryList<ElementRef<HTMLVideoElement>>;
  videoSrc = '';
  constructor(private store: Store) {}

  // async toSrcURL(rawVideo: any) {
  //   const base64 = await (await fetch(rawVideo as unknown as string)).blob();
  //   return window.URL.createObjectURL(base64);
  // }

  async ngOnInit() {
    // this.actions$.pipe(ofActionSuccessful(StopRecording)).subscribe(async (action) => {
    //   const videoBuffers = await this.store.selectSignal(VideosState.videoBuffers)();
    //   if (this.players) {
    //     for (let player of this.players) {
    //       videoBuffers.forEach(async (buf) => {
    //         const base64 = await (await fetch(buf as unknown as string)).blob();
    //         player.nativeElement.src = window.URL.createObjectURL(base64);
    //       });
    //     }
    //   }
    // });
  }
}
