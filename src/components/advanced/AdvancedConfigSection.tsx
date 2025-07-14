import { FileNameSelector } from "@/components/advanced/FileNameSelector.tsx";
import { FpsSelector } from "@/components/advanced/FpsSelector.tsx";


export function AdvancedConfigSection()
{

  return <div
    className={`
      flex flex-col gap-4 items-center
      p-2 sm:p-4
      border border-solid rounded-xl border-gray-500
      shadow-lg
    `}
  >
    <span className="text-xl text-align-center">高度な設定</span>
    <FpsSelector/>
    <FileNameSelector/>
  </div>
}