import { currentTimeAtom, durationAtom } from "@/atoms";
import { useAtom } from "jotai";
import * as TimeUtil from "@/utils/timeUtils.ts";


export function Timeline()
{
  const [duration] = useAtom(durationAtom);
  const [currentTime, setCurrentTime] = useAtom(currentTimeAtom);

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
      onChange={(e) => setCurrentTime(parseFloat(e.currentTarget.value))}
    />
    <span>{TimeUtil.formatHhmmssxxx(duration)}</span>
  </div>
}