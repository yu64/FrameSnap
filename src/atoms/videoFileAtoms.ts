import { fpsAtom } from '@/atoms/configAtoms.ts';
import { atom } from 'jotai';

/** ファイル */
export const fileAtom = atom<File | undefined>(undefined);

/** ファイルのURL */
export const fileUrlAtom = atom<string | undefined>(undefined);


type Meta = {
  duration: number,
  width: number,
  height: number,
}

export const videoMetaAtom = atom<Meta>({
  duration: 0,
  width: 0,
  height: 0
} satisfies Meta);

/** 再生可能フレーム */
export const maxFrameAtom = atom<number>((get) =>
{
  return Math.round(get(videoMetaAtom).duration * get(fpsAtom));
});















