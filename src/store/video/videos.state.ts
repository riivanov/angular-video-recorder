import { Injectable } from "@angular/core";
import { State } from "@ngxs/store";
import { VideoStateModel } from "./video.state";

export interface VideosStateModel {
  videos: VideoStateModel[] | null
}

@State<VideosStateModel>({
  name: 'videos',
  defaults: {
    videos: null
  }
})
@Injectable()
export class VideosState {

}