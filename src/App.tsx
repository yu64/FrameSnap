import { FileSelectorSection } from "./components/FileSelectorSection.tsx";
import { TitleSection } from "./components/TitleSection.tsx";
import { VideoPlayerSection } from "@/components/player/VideoPlayerSection.tsx";

// ...最低限のプレースホルダ...
export default function App() 
{
  return <div
    className={`
      flex flex-col gap-8
      p-4
      min-h-screen
      bg-gray-50
    `}
  >
    <TitleSection/>
    <FileSelectorSection/>
    <VideoPlayerSection/>
  </div>
}
