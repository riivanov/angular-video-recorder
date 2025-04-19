import { Component } from '@angular/core';
import { VideosComponent } from './videos-component/videos-component.component';

@Component({
  selector: 'app-root',
  imports: [VideosComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'angular-video-recorder-19';
}
