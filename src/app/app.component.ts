import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { VideoComponentComponent } from "./video-component/video-component.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, VideoComponentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-video-recorder-19';
}
