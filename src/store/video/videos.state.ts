import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { VideoStateModel } from './video.state';
import { AddVideo } from './videos.actions';

export interface VideosStateModel {
  videos: VideoStateModel[];
}

@State<VideosStateModel>({
  name: 'videos',
  defaults: {
    videos: [],
  },
})
@Injectable()
export class VideosState {
  @Selector()
  static async videos(state: VideosStateModel) {
    return state?.videos;
  }

  @Action(AddVideo)
  async addVideo(ctx: StateContext<VideosStateModel>, {model}: AddVideo) {
    console.log("ADDVIDEO", model)
    let state = ctx.getState();
    if (state instanceof Promise) state = await state;
    const length = state?.videos?.length ?? 0;

    const newVideo = {
      index: length,
      isRecording: false,
      name: model?.name,
      size: model?.size,
      type: model?.type,
      raw: model?.raw
    } as VideoStateModel;

    if (!state) {
      ctx.setState({
        videos: [newVideo],
      });
      return;
    }

    ctx.setState({
      ...state,
      videos: [...state?.videos, newVideo]
    })
  }
}
