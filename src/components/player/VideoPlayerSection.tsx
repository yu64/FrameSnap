// ファイル選択コンポーネントのプレースホルダ

import { currentTimeAtom, durationAtom, fileUrlAtom, isPlayingAtom } from "@/atoms/index.ts"
import { useAtom } from "jotai"
import { Timeline } from "@/components/player/Timeline.tsx";
import { useEffect, useRef } from "react";



export function VideoPlayerSection()
{
  const videoRef = useRef<HTMLVideoElement>(null);

  const [fileUrl] = useAtom(fileUrlAtom);
  const [, setDuration] = useAtom(durationAtom);
  
  const [currentTime, setCurrentTime] = useAtom(currentTimeAtom);
  const [isPlaying, setPlaying] = useAtom(isPlayingAtom);


  function setVideoMeta(e: React.SyntheticEvent<HTMLVideoElement, Event>)
  {
    setDuration(e.currentTarget.duration);
  }

  // 現在再生位置を適用
  useEffect(() => 
  {
    if(videoRef.current == null) return;
    videoRef.current.currentTime = currentTime;

  }, [currentTime]);

  useEffect(() => 
  {
    if(videoRef.current == null) return;

    if(isPlaying) videoRef.current.play()
    else videoRef.current.pause();

  }, [isPlaying]);
  

  // 非表示
  if(fileUrl == null) return <div></div>;

  return <div
    className={`
      flex flex-col items-center
      p-4
      border border-solid rounded-xl border-gray-500
      shadow-lg
    `}
  >

    <video
      ref={videoRef}
      src={fileUrl}
      controls
      onLoadedMetadata={(e) => { setVideoMeta(e); setCurrentTime(0); }}
      onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime ?? 0)}
      onPlay={(e) => setPlaying(true)}
      onPause={(e) => setPlaying(false)}
    />

    <Timeline/>

  </div>
}