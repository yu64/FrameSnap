import { useRef, useState } from "react";

function App()
{
  const [file, setFile] = useState<File | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  if(file && videoRef.current)
  {
    const url = URL.createObjectURL(file);
    videoRef.current.src = url;
    videoRef.current.play();
  }

  return <>
    <h1>Working!</h1>
    <input type="file" accept="video/*" onChange={(e) => setFile(e.target.files?.[0] ?? null)}></input>
    <video controls width={480} ref={videoRef}></video>
  </>;
}

export default App;
