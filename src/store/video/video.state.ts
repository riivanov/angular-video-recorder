import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { StartRecording, StopRecording } from './video.actions';
import { AddVideo } from './videos.actions';

export interface VideoStateModel {
  index: number;
  name: string;
  size: number;
  type?: 'video/webm';
  raw: Blob | null;
  isRecording: boolean;
}

@State<VideoStateModel>({
  name: 'video',
  defaults: {
    index: 0,
    name: '',
    size: 0,
    isRecording: false,
    raw: null,
  },
})
@Injectable()
export class VideoState {
  @Selector()
  static async getRawBuffer(model: Promise<VideoStateModel>) {
    return (await model)?.raw
  }

  @Action(StartRecording)
  startRecording(ctx: StateContext<VideoStateModel>, { payload }: StartRecording) {
    ctx.setState(payload);
    // ctx.setState(payload);
    // this.#dbService.update(payload.name, payload)
    // console.log("storing state ...")
    // sessionStorage.setItem("video", JSON.stringify(payload))
  }

  @Action(StopRecording)
  async stopRecording(ctx: StateContext<VideoStateModel>, { payload }: StopRecording) {
    const video = {
      index: 0,
      isRecording: payload.isRecording,
      name: '',
      size: payload.size,
      type: 'video/webm',
      raw: await this.blobToBase64(payload.raw!),
    } as VideoStateModel;
    // ctx.dispatch(new AddVideo(video))
    ctx.setState(video);
  }

  async blobToBase64(blob: Blob): Promise<any> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  }
}
