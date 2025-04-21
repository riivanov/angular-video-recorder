import { VideoStateModel } from './video.state';

export class AddVideo {
  static readonly type = '[AddVideo] action';
  constructor(readonly model: VideoStateModel) {}
}
export class RemoveVideo {
  static readonly type = '[RemoveVideo] action';
  constructor(readonly model: VideoStateModel) {}
}
