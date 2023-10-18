import { Static, Type } from '@sinclair/typebox';

export const Schema = Type.Object({
  settings: Type.String(),
  language: Type.String(),
  theme: Type.String(),
  themes: Type.Object({
    light: Type.String(),
    dark: Type.String(),
    system: Type.String(),
  }),
  videoDevices: Type.String(),
  audioDevices: Type.String(),
  fullscreen: Type.String(),
  pictureInPicture: Type.String(),
});

export type Translations = Static<typeof Schema>;
