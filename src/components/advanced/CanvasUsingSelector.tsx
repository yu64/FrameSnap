
import { useAtom } from "jotai";
import { canvasEnabledAtom } from "@/atoms/configAtoms.ts";

export function CanvasUsingSelector()
{
  const [canvasEnabled, setCanvasEnabled] = useAtom(canvasEnabledAtom);

  return <label className="flex flex-col gap-2 w-full">
    <span className="text-lg">
      <input
        type="checkbox"
        checked={canvasEnabled}
        onChange={e => setCanvasEnabled(e.target.checked)}
        className="w-7 h-7 mr-2 align-middle"
      />
      Canvasによるサムネイルを利用する <span className="text-sm">（実験的）</span>
    </span>
    <span className="text-gray-500 text-sm mt-1">
      ※Android等でvideoタグの描画遅延を回避する目的の機能です。
    </span>
  </label>;
}
