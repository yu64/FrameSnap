import { defaultFps, fpsAtom } from "@/atoms/configAtoms.ts";
import { useAtom } from "jotai";
import { useState } from "react";


export function FpsSelector()
{
  const [fps, setFps] = useAtom(fpsAtom);

  // 空白を入力途中として特別扱いするためのフラグ
  const [isEmtpy, setEmpty] = useState<boolean>(false);


  function setFpsFromText(str: string)
  {
    if(str === "")
    {
      setEmpty(true);
      return;
    }

    let fps = Number.parseInt(str);
    if(fps <= 0) fps = 1;

    setEmpty(false);
    setFps(fps);
    return;
  }

  return <div
    className={`
      w-full
    `}
  >
    <label className="flex flex-col gap-2">
      <span className="text-lg">
        フレームレート <span className="text-sm">(デフォルト: {defaultFps} )</span>
      </span>
      <input
        type="number"
        min="0"
        value={(isEmtpy ? "" : fps)}
        className={`
          border rounded-lg
          py-2 px-1
        `}
        onChange={(e) => setFpsFromText(e.currentTarget.value)}
      />
    </label>
  </div>
}