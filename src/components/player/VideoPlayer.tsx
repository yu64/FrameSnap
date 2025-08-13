import { canvasEnabledAtom } from "@/atoms/configAtoms.ts";
import { useAtom } from "jotai";
import { forwardRef, useEffect, useImperativeHandle, useRef, type VideoHTMLAttributes } from "react";


export type Props = {
  currentTime?: number,
  isPlaying?: boolean,
  volume?: number
} & VideoHTMLAttributes<HTMLVideoElement>



export const VideoPlayer = forwardRef<HTMLVideoElement, Props>((props: Props, ref) =>
{
  const {
    currentTime,
    isPlaying,
    volume,
    ...videoProps
  } = props;

  const [canvasEnabled] = useAtom(canvasEnabledAtom);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // refを取得して、外部に公開
  useImperativeHandle(ref, () => videoRef.current!, []);

  function syncCanvas()
  {
    if( !(canvasEnabled && !isPlaying)) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    if(!video || !canvas) return;

    const ctx = canvas.getContext("2d");
    if(!ctx) return;

    if(canvas.width != video.videoWidth) canvas.width = video.videoWidth;
    if(canvas.height != video.videoHeight) canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  }


  // 再生状態を適用
  useEffect(() => {
    if(videoRef.current == null) return;
    if(isPlaying) videoRef.current.play()
    else videoRef.current.pause();
  }, [isPlaying]);


  // 再生位置を適用
  useEffect(() => {

    if(videoRef.current == null) return;
    if(currentTime == null) return;
    syncCanvas();

    // 停止中なら常に再生位置を同期
    if(!isPlaying)
    {
      videoRef.current.currentTime = currentTime;
      return;
    }

    // 再生中なら許容範囲を超えたら同期
    if(0.1 < Math.abs(videoRef.current.currentTime - currentTime))
    {
      videoRef.current.currentTime = currentTime;
      return;
    }

  }, [currentTime]); 


  // 音量を適用
  useEffect(() => {
    if(videoRef.current == null) return;
    (volume != null) && (videoRef.current.volume = volume);
  }, [isPlaying]);



  return <div
  >
    
    <video
      ref={videoRef}
      className={`
        w-full h-full
        ${canvasEnabled && !isPlaying && currentTime != 0 ? "hidden" : ""}
      `}
      {...videoProps}
      onLoadedData={(e) => {
        syncCanvas(); 
        videoProps.onLoadedData?.(e);
      }}
      onTimeUpdate={(e) => {
        syncCanvas(); 
        videoProps.onTimeUpdate?.(e);
      }}
    >
      お使いのブラウザはビデオタグをサポートしていません。
    </video>
    <canvas
      ref={canvasRef}
      className={`
        w-full h-full
        ${canvasEnabled && !isPlaying && currentTime != 0 ? "" : "hidden"}
      `}
      onClick={() => {
        if(videoRef.current == null) return;
        syncCanvas();
        videoRef.current.click();
      }}
    >
    </canvas>
  </div>
})