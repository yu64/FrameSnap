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

  // refを取得して、外部に公開
  const videoRef = useRef<HTMLVideoElement>(null);
  useImperativeHandle(ref, () => videoRef.current!, []);

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

  }, [currentTime]); // currentTime の変更のみに反応

  // 音量を適用
  useEffect(() => {
    if(videoRef.current == null) return;
    (volume != null) && (videoRef.current.volume = volume);
  }, [isPlaying]);


  return <video
    ref={videoRef}
    {...videoProps}
  >
    お使いのブラウザはビデオタグをサポートしていません。
  </video>
})