import { fpsAtom } from '@/atoms/configAtoms.ts';
import { atom } from 'jotai';

/** 再生状態 */
export const isPlayingAtom = atom<boolean>(false);

/** 再生位置 */
export const currentTimeAtom = atom<number>(0);

/** 再生位置フレーム */
export const currentFrameAtom = atom<number>((get) =>
{
  return Math.round(get(currentTimeAtom) * get(fpsAtom));
});












