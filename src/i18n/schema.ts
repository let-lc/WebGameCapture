import { Static, Type } from '@sinclair/typebox';

export const Schema = Type.Object({
  fullscreen: Type.String(),
  pictureInPicture: Type.String(),
  settings: Type.String(),
  language: Type.String(),
  theme: Type.String(),
  themes: Type.Object({
    light: Type.String(),
    dark: Type.String(),
    system: Type.String(),
  }),
  videoDevices: Type.String(),
  disableVideo: Type.String(),
  audioDevices: Type.String(),
  disableAudio: Type.String(),
  description: Type.Object({
    p1: Type.String(),
    p2: Type.String(),
  }),
  projectSourceCode: Type.String(),
  privacy: Type.Object({
    p0: Type.String(),
    p1: Type.String(),
    p2: Type.String(),
    links: Type.Object({
      l1: Type.Object({
        link: Type.String(),
        text: Type.String(),
      }),
      l2: Type.Object({
        link: Type.String(),
        text: Type.String(),
      }),
    }),
  }),
  warning: Type.Object({
    both: Type.String(),
    camera: Type.String(),
    microphone: Type.String(),
  }),
});

export type Translations = Static<typeof Schema>;
