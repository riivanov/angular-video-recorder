import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostListener, input, Input, Output } from '@angular/core';

@Component({
  selector: 'app-video-controls',
  imports: [CommonModule],
  templateUrl: './video-controls.component.html',
  styleUrl: './video-controls.component.scss'
})
export class VideoControlsComponent {
  top: number;
  left: number;
  @Input()
  width: number;
  @Input()
  height: number;
  @Input()
  isRecording: boolean
  @Output()
  onStartRecording = new EventEmitter<void>();
  @Output()
  onStoptRecording = new EventEmitter<void>();

  startRecording() {
    this.onStartRecording.emit()
  }
  stopRecording() {
    this.onStoptRecording.emit()
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    // const width = this.videoElementRef?.nativeElement?.clientWidth;
    // const height = this.videoElementRef?.nativeElement?.clientHeight;
    this.left = this.width / 2 - 0.05 * this.width;
    this.top = this.height - 0.1 * this.height - 20;
  }

  ngAfterViewInit() {
    // const width = this.videoElementRef?.nativeElement?.clientWidth;
    // const height = this.videoElementRef?.nativeElement?.clientHeight;
    this.left = this.width / 2 - 0.05 * this.width;
    this.top = this.height + 0.35 * this.height - 20;
  }
}
