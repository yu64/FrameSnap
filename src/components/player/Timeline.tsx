import { currentTimeAtom, durationAtom, isPlayingAtom } from "@/atoms";
import { useAtom } from "jotai";
import * as TimeUtil from "@/utils/timeUtils.ts";


export function Timeline()
{
  const [duration] = useAtom(durationAtom);
  const [currentTime, setCurrentTime] = useAtom(currentTimeAtom);
  const [, setPlaying] = useAtom(isPlayingAtom);

  

  return <div
    className={`
      flex flex-row
    `}
  >
    <span>{TimeUtil.formatHhmmssxxx(currentTime)}</span>
    <input
      type="range"
      min={0}
      max={duration}
      step={TimeUtil.getSmallestUnit(duration) ?? 1}
      value={currentTime}
      onChange={(e) => {
        setCurrentTime(parseFloat(e.currentTarget.value));
        setPlaying(false);
      }}
    />
    <span>{TimeUtil.formatHhmmssxxx(duration)}</span>
  </div>
}