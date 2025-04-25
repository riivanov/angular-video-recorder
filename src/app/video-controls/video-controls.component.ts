import { CommonModule, NgFor, NgForOf } from '@angular/common';
import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { interval, map, takeUntil } from 'rxjs';

@Component({
  selector: 'app-video-controls',
  imports: [CommonModule, NgFor, NgForOf],
  templateUrl: './video-controls.component.html',
  styleUrl: './video-controls.component.scss',
})
export class VideoControlsComponent {
  top: number;
  left: number;
  @Input()
  width: number;
  @Input()
  height: number;
  @Input()
  isRecording: boolean;
  @Output()
  onStartRecording = new EventEmitter<void>();
  @Output()
  onStoptRecording = new EventEmitter<void>();
  precentRecorded$ = interval(1000).pipe(map(num => new Array(num)), takeUntil(interval(11000)));

  startRecording() {
    this.onStartRecording.emit();
  }
  stopRecording() {
    this.onStoptRecording.emit();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.left = this.width / 2 - 0.05 * this.width;
    this.top = this.height - 0.1 * this.height - 20;
  }

  ngAfterViewInit() {
    this.left = this.width / 2 - 0.05 * this.width;
    this.top = this.height + 0.35 * this.height - 20;
  }
}
