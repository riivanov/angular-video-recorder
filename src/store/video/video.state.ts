import { inject, Injectable } from "@angular/core";
import { Action, State, StateContext } from "@ngxs/store";
import { StartRecording } from "./video.actions";
import { NgxIndexedDBService } from "ngx-indexed-db";

export interface VideoStateModel {
  name: string,
  length: number
}

@State<VideoStateModel>({
  name: "video",
  defaults: {
    name: "",
    length: 0
  }
})
@Injectable()
export class VideoState {
  #dbService = inject(NgxIndexedDBService);
  
  @Action(StartRecording)
  setUser(ctx: StateContext<VideoStateModel>, { payload }: StartRecording) {
    // ctx.setState(payload);
    this.#dbService.update(payload.name, payload)
  }
}