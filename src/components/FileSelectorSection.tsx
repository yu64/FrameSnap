// ファイル選択コンポーネントのプレースホルダ

import { fileAtom, fileUrlAtom } from "@/atoms/index.ts"
import { useAtom } from "jotai"
import { useEffect, useRef } from "react";



export function FileSelectorSection()
{
  const [fileUrl, setFileUrl] = useAtom(fileUrlAtom);
  const [file, setFile] = useAtom(fileAtom);

  const fileRef = useRef<HTMLInputElement>(null);


  function setFileStatus(file: File | undefined)
  {
    setFile(file);
    if(fileUrl) URL.revokeObjectURL(fileUrl);
    setFileUrl(file ? URL.createObjectURL(file) : undefined);
  }

  
  useEffect(() =>
  {
    if(fileRef.current == null) return;
    if(file == null) return;
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);
    fileRef.current.files = dataTransfer.files;
  }, [file]);


  return <label
    className={`
      block
      p-1 sm:p-4
      border border-solid rounded-xl border-gray-500
      shadow-lg
      cursor-pointer
    `}
  >
    <input
      ref={fileRef}
      type="file"
      className={`
        file:mr-4 file-py-1 file-px-4
        file:rounded-xl file:border
        file-text-sm
      hover:file:bg-blue-100
        cursor-pointer file:cursor-pointer
      `}
      accept="video/*"
      onChange={(e) => setFileStatus(e.target?.files?.[0])}
    />
  </label>
}