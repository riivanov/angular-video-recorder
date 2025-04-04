import { firstValueFrom } from 'rxjs';
import { inject, Injectable } from "@angular/core";
import { Action, State, StateContext } from "@ngxs/store";
import { StartRecording, StopRecording } from "./video.actions";
import { NgxIndexedDBService } from "ngx-indexed-db";

export interface VideoStateModel {
  name: string,
  size: number,
  type: "video/webm",
  raw: Blob | null
  isRecording: boolean,
}

@State<VideoStateModel>({
  name: "video",
  defaults: {
    name: "",
    type: "video/webm",
    size: 0,
    isRecording: false,
    raw: null
  }
})
@Injectable()
export class VideoState {
  
  @Action(StartRecording)
  startRecording(ctx: StateContext<VideoStateModel>, { payload }: StartRecording) {
    ctx.setState(payload)
    // ctx.setState(payload);
    // this.#dbService.update(payload.name, payload)
    // console.log("storing state ...")
    // sessionStorage.setItem("video", JSON.stringify(payload))
  }

  @Action(StopRecording)
  async stopRecording(ctx: StateContext<VideoStateModel>, { payload }: StopRecording) {
    ctx.setState({
      isRecording: payload.isRecording,
      name: '',
      size: payload.size,
      type: "video/webm",
      raw: await this.blobToBase64(payload.raw!)
    })
    // await firstValueFrom(this.#dbService.update("video", JSON.stringify(ctx.getState())))
  }

  async blobToBase64(blob: Blob): Promise<any> {
    return new Promise((resolve, _) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  }
}