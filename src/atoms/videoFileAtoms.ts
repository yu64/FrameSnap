import { atom } from 'jotai';

/** ファイル */
export const fileAtom = atom<File | undefined>(undefined);

/** ファイルのURL */
export const fileUrlAtom = atom<string | undefined>(undefined);

/** フレームレート */
export const fpsAtom = atom<number>(30);

/** 再生可能時間 */
export const durationAtom = atom<number>(0);

/** 再生可能フレーム */
export const maxFrameAtom = atom<number>((get) =>
{
  return Math.round(get(durationAtom) * get(fpsAtom));
});














