import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { VideosComponentComponent } from './videos-component/videos-component.component';

@Component({
  selector: 'app-root',
  imports: [VideosComponentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'angular-video-recorder-19';
}
