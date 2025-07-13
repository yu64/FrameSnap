// ファイル選択コンポーネントのプレースホルダ

import { currentTimeAtom, durationAtom, fileUrlAtom, isPlayingAtom } from "@/atoms/index.ts"
import { useAtom } from "jotai"
import { Timeline } from "@/components/player/Timeline.tsx";
import { useEffect, useRef, useState } from "react";
import { VideoPlayer } from "@/components/player/VideoPlayer.tsx";



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

    <VideoPlayer
      ref={videoRef}
      src={fileUrl}
      currentTime={currentTime}
      isPlaying={isPlaying}
      onLoadedMetadata={(e) => setVideoMeta(e)}
      onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime ?? 0)}
      onPlay={(e) => setPlaying(true)}
      onPause={(e) => setPlaying(false)}
      onClick={(e) => setPlaying(true)}
    />

    <Timeline/>

  </div>
}