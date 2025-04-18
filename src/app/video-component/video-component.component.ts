import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Store } from '@ngxs/store';
import { Subject } from 'rxjs';
import { StartRecording, StopRecording } from '../../store/video/video.actions';
import { VideoState } from '../../store/video/video.state';
import { AddVideo } from '../../store/video/videos.actions';

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
  mediaRecorder: MediaRecorder;
  recordedBlobs: Blob[];
  isRecording: boolean = false;
  downloadUrl: string;
  stream: MediaStream;

  constructor(private store: Store) {}

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

    const videoBuffer = (await this.store.selectSignal(VideoState.getRawBuffer)()) as unknown as string;
    this.recordVideoElement.src = videoBuffer;
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
    this.recordVideoElement.src = this.downloadUrl;
  }
}
