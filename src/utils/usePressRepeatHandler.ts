import { useCallback, useEffect, useState } from "react"

type Mode = {
  type: "cleanup"
} | {
  type: "startup"
  timeoutId: NodeJS.Timeout | null
  intervalId: NodeJS.Timeout | null
}

type RetrunHandlers<E extends HTMLElement> = {
  onMouseDown: React.MouseEventHandler<E>
  onMouseUp: React.MouseEventHandler<E>,
  onMouseLeave: React.MouseEventHandler<E>,
  onTouchStart: React.TouchEventHandler<E>,
  onTouchEnd: React.TouchEventHandler<E>,
  onTouchCancel: React.TouchEventHandler<E>,
  onPointerDown: React.PointerEventHandler<E>,
  onPointerUp: React.PointerEventHandler<E>,
  onPointerLeave: React.PointerEventHandler<E>,
  onPointerCancel: React.PointerEventHandler<E>,
}

function fallbackCallback<E extends HTMLElement>(ele: E)
{
  const clickEvent = new MouseEvent(
    'click',
    {
      bubbles: true,
      cancelable: true,
      view: window,
    }
  );
  ele.dispatchEvent(clickEvent);
}


export function usePressRepeatHandler<E extends HTMLElement>(
  startDelay: number = 500,
  interval: number = 100,
  callback: ((ele: E) => void) = fallbackCallback
): RetrunHandlers<E>
{
  const [mode, setMode] = useState<Mode>({ type: "cleanup" });

  const repeat = useCallback(callback, []);

  // 長押し処理を開始する関数
  const startup = useCallback((ele: E) => 
    {
      // 既にタイマーが動作中であれば何もしない
      if (mode.type !== "cleanup") return;

      // 長押し判定のためのsetTimeoutを設定
      const timeoutId = setTimeout(() =>
      {

        repeat(ele);
        const intervalId = setInterval(() =>
        {
          repeat(ele);
        }, interval);

        setMode({
          type: "startup",
          timeoutId: null,
          intervalId: intervalId,
        });
      }, startDelay);

      console.log("startup")

      // 初期状態としてtimeoutIdのみを保持
      setMode({
        type: "startup",
        timeoutId: timeoutId,
        intervalId: null,
      });
    },
    [startDelay, interval, mode.type, repeat]
  );

  // 長押し処理を停止し、すべてのタイマーをクリアする関数
  const cleanup = useCallback(() => 
    {
      if (mode.type !== "startup") return;

      // タイマーをクリア
      if(mode.timeoutId) clearTimeout(mode.timeoutId);
      if(mode.intervalId) clearInterval(mode.intervalId);

      // 状態をクリーンアップモードに戻す
      setMode({ type: "cleanup" });
    }, 
    [mode]
  );


  // アンマウント時にクリーンアップ
  useEffect(() => 
  {
    return () => 
    {
      if(mode.type !== "startup") return;
      if(mode.timeoutId) clearTimeout(mode.timeoutId);
      if(mode.intervalId) clearTimeout(mode.intervalId);
    }
  }, [mode]);


  
  return {
    onMouseDown: useCallback(e => 
      {
        if(e.button !== 0) return;
        startup(e.currentTarget)
      },
      [startup]
    ),
    onMouseUp: useCallback(() => cleanup(), [cleanup]),
    onMouseLeave: useCallback(() => cleanup(), [cleanup]),
    onTouchStart: useCallback(e => 
      {
        if(e.touches.length !== 1) return;
        startup(e.currentTarget);
      },
      [startup]
    ),
    onTouchEnd: useCallback(() => cleanup(), [cleanup]),
    onTouchCancel: useCallback(() => cleanup(), [cleanup]),
    onPointerDown: useCallback(e =>
      {
        if(e.pointerType !== "mouse" && e.pointerType !== "touch") return;
        startup(e.currentTarget);
      },
      [startup]
    ),
    onPointerUp: useCallback(e =>
      {
        e.currentTarget.releasePointerCapture(e.pointerId);
        startup(e.currentTarget);
      },
      [startup]
    ),
    onPointerLeave: useCallback(e =>
      {
        if(mode.type !== "startup") return;
        e.currentTarget.releasePointerCapture(e.pointerId);
        startup(e.currentTarget);
      },
      [startup]
    ),
    onPointerCancel: useCallback(e =>
      {
        e.currentTarget.releasePointerCapture(e.pointerId);
        startup(e.currentTarget);
      },
      [startup]
    )
  }
}

