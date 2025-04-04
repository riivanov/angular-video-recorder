import { VideoStateModel } from './video.state';

export class StartRecording {
  static readonly type = '[Start Recording] action';
  constructor(readonly payload: VideoStateModel) {}
}

export class StopRecording {
  static readonly type = '[Stop Recording] action';
  constructor(readonly payload: VideoStateModel) {}
}
