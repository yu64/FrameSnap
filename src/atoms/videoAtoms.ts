import { atom } from 'jotai';

/** ファイル */
export const fileAtom = atom<File | undefined>(undefined);

/** ファイルのURL */
export const fileUrlAtom = atom<string | undefined>(undefined);

/** 再生可能時間 */
export const durationAtom = atom<number>(0);
















