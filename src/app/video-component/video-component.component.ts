import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Store } from '@ngxs/store';
import { interval, Subject } from 'rxjs';
import { StartRecording, StopRecording } from '../../store/video/video.actions';
import { AddVideo } from '../../store/video/videos.actions';
import { VideoControlsComponent } from '../video-controls/video-controls.component';

@Component({
  selector: 'app-video-component',
  imports: [CommonModule, VideoControlsComponent],
  templateUrl: './video-component.component.html',
  styleUrl: './video-component.component.scss',
})
export class VideoComponent {
  @ViewChild('video') videoElementRef: ElementRef<HTMLVideoElement>;
  @ViewChild('record') recordElementRef: ElementRef<HTMLButtonElement>;

  private destroy$ = new Subject();
  maxRecordedLength$ = interval(10000);
  videoElement: HTMLVideoElement;
  mediaRecorder: MediaRecorder;
  recordedBlobs: Blob[];
  isRecording: boolean = false;
  downloadUrl: string;
  stream: MediaStream;

  constructor(private store: Store) {
    // this.maxRecordedLength$.subscribe((event) => {
    //   if (this.isRecording) {
    //     this.stopRecording();
    //   }
    // });
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

    this.stream = stream;
    this.videoElement.srcObject = this.stream;
  }

  startRecording() {
    this.recordedBlobs = [];
    let options: any = { mimeType: 'video/webm' };

    try {
      this.mediaRecorder = new MediaRecorder(this.stream, options);
    } catch (err) {
      console.log(err);
    }

    this.mediaRecorder.start(); // collect 100ms of data
    this.store.dispatch(
      new StartRecording({
        index: 0,
        name: '',
        type: 'video/webm',
        size: 0,
        isRecording: true,
        raw: null,
      })
    );
    this.isRecording = !this.isRecording;
    this.mediaRecorder.ondataavailable = this.onDataAvailableEvent.bind(this);
    this.mediaRecorder.onstop = this.onStopRecordingEvent.bind(this);
  }

  stopRecording() {
    this.mediaRecorder.stop();
    this.isRecording = !this.isRecording;
    console.log('Recorded Blobs: ', this.recordedBlobs);
  }

  onDataAvailableEvent(event: BlobEvent) {
    if (event.data && event.data.size > 0) {
      this.recordedBlobs.push(event.data);
    }
  }

  onStopRecordingEvent(event: Event) {
    console.log('onStopRecordingEvent');
    const videoBuffer = new Blob(this.recordedBlobs, {
      type: 'video/webm',
    });
    this.downloadUrl = window.URL.createObjectURL(videoBuffer); // you can download with <a> tag
    const video = {
      index: 0,
      isRecording: false,
      name: '',
      size: videoBuffer.size,
      raw: videoBuffer,
    };
    this.store.dispatch(new StopRecording(video));
    this.store.dispatch(new AddVideo(video));
    // this.recordVideoElement.src = this.downloadUrl;
  }
}
