import { atomWithStorage } from "jotai/utils";


export const defaultFps = 30;

/** フレームレート */
export const fpsAtom = atomWithStorage("fps", defaultFps);


export const defaultFileTempate = "{yyyy}-{MM}-{dd}-{v_frame}-{srcBaseName}.png";

/** 出力ファイル名 */
export const outputFileNameTemplate = atomWithStorage(
  "outputFileNameTemplate",
  defaultFileTempate
);

/** 実験的機能。videoの代わりにキャンバスをサムネイルにするか */
export const canvasEnabledAtom = atomWithStorage("canvasEnabled", false);


