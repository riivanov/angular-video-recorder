import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Store } from '@ngxs/store';
import { Subject } from 'rxjs';
import { StartRecording, StopRecording } from '../../store/video/video.actions';
import { VideoState } from '../../store/video/video.state';

@Component({
  selector: 'app-video-component',
  imports: [CommonModule],
  templateUrl: './video-component.component.html',
  styleUrl: './video-component.component.scss',
})
export class VideoComponentComponent {
  @ViewChild('recordedVideo') recordVideoElementRef: ElementRef;
  @ViewChild('video') videoElementRef: ElementRef;

  private destroy$ = new Subject();
  videoElement: HTMLVideoElement;
  recordVideoElement: HTMLVideoElement;
  mediaRecorder: any;
  recordedBlobs: Blob[];
  isRecording: boolean = false;
  downloadUrl: string;
  stream: MediaStream;

  constructor(private store: Store) {
    // const actions$ = inject(Actions);
    // actions$
    //   .pipe(ofActionDispatched(SetUser), takeUntil(this.destroy$))
    //   .subscribe((setUser) => console.log('set user'));
    // this.store.dispatch(SetUser);
  }

  ngOnDestroy() {
    this.destroy$.next(null);
  }

  async ngOnInit() {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        width: 360,
      },
    });
    this.videoElement = this.videoElementRef.nativeElement;
    this.recordVideoElement = this.recordVideoElementRef.nativeElement;

    this.stream = stream;
    this.videoElement.srcObject = this.stream;

    const videoBuffer = this.store.selectSignal(VideoState.getRawBuffer);
    const tmp = await videoBuffer();
    const base64 = await (await fetch(tmp as unknown as string)).blob();
    this.downloadUrl = window.URL.createObjectURL(base64); // you can download with <a> tag
    this.recordVideoElement.src = this.downloadUrl;
  }

  startRecording() {
    this.store.dispatch(
      new StartRecording({
        name: '',
        type: 'video/webm',
        size: 0,
        isRecording: true,
        raw: null,
      })
    );
    this.recordedBlobs = [];
    let options: any = { mimeType: 'video/webm' };

    try {
      this.mediaRecorder = new MediaRecorder(this.stream, options);
    } catch (err) {
      console.log(err);
    }

    this.mediaRecorder.start(); // collect 100ms of data
    this.isRecording = !this.isRecording;
    this.onDataAvailableEvent();
    this.onStopRecordingEvent();
  }

  stopRecording() {
    this.mediaRecorder.stop();
    this.isRecording = !this.isRecording;
    console.log('Recorded Blobs: ', this.recordedBlobs);
  }

  playRecording() {
    if (!this.recordedBlobs || !this.recordedBlobs.length) {
      console.log('cannot play.');
      return;
    }
    this.recordVideoElement.play();
  }

  onDataAvailableEvent() {
    try {
      this.mediaRecorder.ondataavailable = (event: any) => {
        if (event.data && event.data.size > 0) {
          this.recordedBlobs.push(event.data);
        }
      };
    } catch (error) {
      console.log(error);
    }
  }

  onStopRecordingEvent() {
    try {
      this.mediaRecorder.onstop = (event: Event) => {
        const videoBuffer = new Blob(this.recordedBlobs, {
          type: 'video/webm',
        });
        this.downloadUrl = window.URL.createObjectURL(videoBuffer); // you can download with <a> tag
        this.store.dispatch(
          new StopRecording({
            isRecording: false,
            name: '',
            size: videoBuffer.size,
            type: 'video/webm',
            raw: videoBuffer,
          })
        );
        this.recordVideoElement.src = this.downloadUrl;
      };
    } catch (error) {
      console.log(error);
    }
  }
}
