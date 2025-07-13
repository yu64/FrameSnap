// ファイル選択コンポーネントのプレースホルダ

import { currentTimeAtom, durationAtom, fileUrlAtom, isPlayingAtom, videoHeightAtom, videoWidthAtom } from "@/atoms/index.ts"
import { useAtom } from "jotai"
import { Timeline } from "@/components/player/Timeline.tsx";
import { useRef } from "react";
import { VideoPlayer } from "@/components/player/VideoPlayer.tsx";
import { ButtonArea } from "@/components/player/ButtonArea";



export function VideoPlayerSection()
{
  const videoRef = useRef<HTMLVideoElement>(null);

  const [fileUrl] = useAtom(fileUrlAtom);
  const [, setDuration] = useAtom(durationAtom);
  const [, setVideoWidth] = useAtom(videoWidthAtom);
  const [, setVideoHeight] = useAtom(videoHeightAtom);
  
  const [currentTime, setCurrentTime] = useAtom(currentTimeAtom);
  const [isPlaying, setPlaying] = useAtom(isPlayingAtom);


  function setVideoMeta(e: React.SyntheticEvent<HTMLVideoElement, Event>)
  {
    setDuration(e.currentTarget.duration);
    setVideoWidth(e.currentTarget.videoWidth);
    setVideoHeight(e.currentTarget.videoHeight);
  }

  function saveFrame()
  {
    if(videoRef.current == null) return;
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    
    const ctx = canvas.getContext("2d");
    if(ctx == null) return;

    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    
    const dataUrl = canvas.toDataURL('image/png');

    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = 'video.png';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }


  // 非表示
  if(fileUrl == null) return <div></div>;

  return <div
    className={`
      flex flex-col gap-4 items-center 
      p-2 sm:p-4
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
      onPlay={() => setPlaying(true)}
      onPause={() => setPlaying(false)}
      onClick={() => setPlaying(!isPlaying)}
    />

    <Timeline/>
    <ButtonArea onSave={() => saveFrame()}/>

  </div>
}