import { useAtom } from "jotai"
import { Timeline } from "@/components/player/Timeline.tsx";
import { useRef } from "react";
import { VideoPlayer } from "@/components/player/VideoPlayer.tsx";
import { ButtonArea } from "@/components/player/ButtonArea";
import { fileUrlAtom, videoMetaAtom } from "@/atoms/videoFileAtoms.ts";
import { currentTimeAtom, isPlayingAtom } from "@/atoms/playerAtoms.ts";
import { useFileNameFormat } from "@/components/advanced/FileNameSelector.tsx";
import { outputFileNameTemplate as outputFileNameTemplateAtom } from "@/atoms/configAtoms.ts";



export function VideoPlayerSection()
{
  const videoRef = useRef<HTMLVideoElement>(null);


  const [fileUrl] = useAtom(fileUrlAtom);
  const [meta, setMeta] = useAtom(videoMetaAtom);
  
  const [currentTime, setCurrentTime] = useAtom(currentTimeAtom);
  const [isPlaying, setPlaying] = useAtom(isPlayingAtom);

  const {format} = useFileNameFormat();
  const [fileNameTemplate] = useAtom(outputFileNameTemplateAtom);


  // メタデータ取得
  function setVideoMeta(e: React.SyntheticEvent<HTMLVideoElement, Event>)
  {
    setMeta({
      duration: e.currentTarget.duration,
      width: e.currentTarget.videoWidth,
      height: e.currentTarget.videoHeight
    });
  }

  // フレームを保存
  function saveFrame()
  {
    if(videoRef.current == null) return;
    const canvas = document.createElement("canvas");
    canvas.width = meta.width;
    canvas.height = meta.height;
    
    const ctx = canvas.getContext("2d");
    if(ctx == null) return;

    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    
    const dataUrl = canvas.toDataURL('image/png');

    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = format(fileNameTemplate);

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