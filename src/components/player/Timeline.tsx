import { currentFrameAtom, currentTimeAtom, durationAtom, fpsAtom, isPlayingAtom, maxFrameAtom } from "@/atoms";
import { useAtom } from "jotai";
import * as TimeUtil from "@/utils/timeUtils.ts";
import { useRef } from "react";
import { useDOMRect } from "@/utils/useDOMRect.ts";


export function Timeline()
{
  const [duration] = useAtom(durationAtom);
  const [maxFrame] = useAtom(maxFrameAtom);

  const [, setPlaying] = useAtom(isPlayingAtom);
  const [currentTime, setCurrentTime] = useAtom(currentTimeAtom);
  const [currentFrame] = useAtom(currentFrameAtom);

  // 横幅を一致させるため、要素のサイズを取得
  const rightLabelRef = useRef<HTMLSpanElement>(null);
  const leftLabelRect = useDOMRect(rightLabelRef);


  return <div
    className={`
      flex flex-col md:flex-row
      mx-4
      w-full
    `}
  >
    <span
      className={`
        flex flex-col flex-justify-center
        text-left
      `}
      style={{width: leftLabelRect?.width ?? 0}}
    >
      {TimeUtil.formatHhmmssxxx(currentTime)}({currentFrame}F)
    </span>
    <input
      type="range"
      className={`
        flex-grow-1
        my-1 md:mx-4
      `}
      min={0}
      max={duration}
      step={TimeUtil.getSmallestUnit(duration) ?? 1}
      value={currentTime}
      onChange={(e) => {
        setPlaying(false);
        setCurrentTime(parseFloat(e.currentTarget.value));
      }}
    />
    <span
      className={`
        text-right md:text-left
        flex flex-col flex-justify-center
      `}
      ref={rightLabelRef}
    >
      {TimeUtil.formatHhmmssxxx(duration)}({maxFrame}F)
    </span>
  </div>
}