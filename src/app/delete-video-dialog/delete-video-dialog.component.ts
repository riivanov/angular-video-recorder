import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-video-dialog',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './delete-video-dialog.component.html',
  styleUrl: './delete-video-dialog.component.scss',
})
export class DeleteVideoDialogComponent {
  @Output() deleteVideo = new EventEmitter();
}
