import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { VideoStateModel } from './video.state';
import { AddVideo } from './videos.actions';
import { Untils } from '../../app/utils';

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
  constructor(private utils: Untils) {}

  @Selector()
  static async videos(state: VideosStateModel) {
    const tmp = await state;
    return tmp?.videos;
  }

  @Action(AddVideo)
  async addVideo(ctx: StateContext<VideosStateModel>, {model}: AddVideo) {
    console.log("ADDVIDEO", model)
    const state = await ctx.getState();
    // if (state instanceof Promise) state = await state;
    const length = state?.videos?.length ?? 0;

    const newVideo = {
      index: length,
      isRecording: false,
      name: model?.name,
      size: model?.size,
      type: model?.type,
      raw: await this.utils.blobToBase64(model?.raw!)
    } as VideoStateModel;

    if (!state) {
      ctx.setState({
        videos: [newVideo],
      });
      return;
    }

    const updated = {
      ...state,
      videos: [...state?.videos, newVideo]
    }
    ctx.setState(updated)
  }
}
