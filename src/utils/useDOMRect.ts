import { useState, type RefObject, useLayoutEffect } from 'react';




export function useDOMRect(ref: RefObject<HTMLElement | null>): DOMRect | undefined;
export function useDOMRect(ref: RefObject<HTMLElement | null>, init: DOMRect): DOMRect;

export function useDOMRect(
  ref: RefObject<HTMLElement | null>,
  init?: DOMRect
): DOMRect | undefined
{
  const [rect, setRect] = useState<DOMRect | undefined>(init);

  useLayoutEffect(() => {
    
    function update()
    {
      if(ref.current == null) setRect(init);
      if(ref.current != null) setRect(ref.current.getBoundingClientRect());
    }

    // 初回更新
    update();

    // ウィンドウリサイズ時に更新
    window.addEventListener('resize', update);

    // 要素サイズ変化時に更新
    const observer = new ResizeObserver(update);
    if(ref.current)
    {
      observer.observe(ref.current);
    }

    return () => {
      window.removeEventListener('resize', update);
      observer.disconnect();
    };
  }, [ref, init]);

  return rect;
}

