import { currentFrameAtom, currentTimeAtom } from "@/atoms/playerAtoms.ts"
import { fpsAtom } from "@/atoms/videoFileAtoms.ts";
import { usePressRepeatHandler } from "@/utils/usePressRepeatHandler.ts";
import { useAtom } from "jotai"
import type { ButtonHTMLAttributes } from "react";


type Props = {
  onSave?: () => void
}

export function ButtonArea(props: Props)
{
  const [fps] = useAtom(fpsAtom);

  const [currentTime, setCurrentTime] = useAtom(currentTimeAtom);
  const [currentFrame] = useAtom(currentFrameAtom);

  const longPressHandlers = [
    usePressRepeatHandler<HTMLButtonElement>(350, 50),
    usePressRepeatHandler<HTMLButtonElement>(350, 50),
    usePressRepeatHandler<HTMLButtonElement>(350, 50),
    usePressRepeatHandler<HTMLButtonElement>(350, 50),
    usePressRepeatHandler<HTMLButtonElement>(350, 50),
    usePressRepeatHandler<HTMLButtonElement>(350, 50)
  ];

  function move(second: number)
  {
    setCurrentTime(currentTime + second);
  }

  function moveFrame(frame: number)
  {
    const target = currentFrame + frame;
    setCurrentTime(target / fps);
  }



  return <div
    className={`
      flex flex-col gap-4 md:flex-row
      mx-4
      w-full
    `}
  >
    <div
      className={`
        flex flex-row gap-4
      `}
    >
      <ControlButton
        onClick={() => move(-1)}
        {...longPressHandlers[0]}
      >←1s</ControlButton>
      
      <ControlButton
        onClick={() => move(-0.1)}
        {...longPressHandlers[1]}
      >←0.1s</ControlButton>
      
      <ControlButton
        onClick={() => moveFrame(-1)}
        {...longPressHandlers[2]}
      >←1F</ControlButton>
    </div>

    <ControlButton 
      className={`
        flex-grow-1
        border rounded-lg
        px-4 py-2
        hover:bg-blue-100
      `}
      onClick={() => props.onSave?.()}
    >フレームを抽出</ControlButton>
    
    <div
      className={`
        flex flex-row gap-4 flex-justify-start
      `}
    >
      <ControlButton
        onClick={() => moveFrame(1)}
        {...longPressHandlers[3]}
      >1F→</ControlButton>

      <ControlButton
        onClick={() => move(0.1)}
        {...longPressHandlers[4]}
      >0.1s→</ControlButton>

      <ControlButton
        onClick={() => move(1)}
        {...longPressHandlers[5]}
      >1s→</ControlButton>
    </div>


  </div>
}


type ButtonProps = {
} & ButtonHTMLAttributes<HTMLButtonElement>

function ControlButton(props: ButtonProps)
{
  return <button
    className={`
      border rounded-lg
      px-5 py-2
      hover:bg-blue-100
    `}
    {...props}
  >
    {props.children}
  </button>
}