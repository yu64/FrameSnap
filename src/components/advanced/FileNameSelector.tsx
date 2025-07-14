import { defaultFileTempate, fpsAtom, outputFileNameTemplate } from "@/atoms/configAtoms.ts";
import { currentFrameAtom, currentTimeAtom } from "@/atoms/playerAtoms.ts";
import { fileAtom, maxFrameAtom, videoMetaAtom } from "@/atoms/videoFileAtoms.ts";
import { useAtom } from "jotai";
import * as TimeUtil from "@/utils/timeUtils.ts";
import interpole  from "string-interpolation-js";


export function FileNameSelector()
{
  const [fileTemplate, setFileTemplate] = useAtom(outputFileNameTemplate);
  const {format, ...args} = useFileNameFormat();

  return <div
    className="flex flex-col w-full gap-2"
  >
    <label className="flex flex-col gap-2">
      <span className="text-lg">
        ファイル名 <span className="text-sm">(デフォルト: {defaultFileTempate} )</span>
      </span>
      <input
        type="text"
        value={fileTemplate}
        className={`
          border rounded-lg
          py-2 px-1
        `}
        onChange={(e) => setFileTemplate(e.currentTarget.value)}
      />
    </label>
    <div
      className={`
        flex flex-col
        mt-2
        p-4
        border rounded-lg
        bg-gray-100
      `}
    >
      <span className="text-lg">プレースホルダ</span>
      <div className="flex flex-col mt-2">
        <span>{args.srcBaseName.text}</span>
        <span>{args.srcExt.text}</span>
        <span>{args.fps.text}</span>
      </div>
      <div className="flex flex-col mt-2">
        <span>{args.yyyy.text}</span>
        <span>{args.MM.text}</span>
        <span>{args.dd.text}</span>
        <span>{args.hh.text}</span>
        <span>{args.mm.text}</span>
        <span>{args.ss.text}</span>
        <span>{args.xxx.text}</span>
      </div>
      <div className="flex flex-col mt-2">
        <span>{args.v_hh.text}</span>
        <span>{args.v_mm.text}</span>
        <span>{args.v_ss.text}</span>
        <span>{args.v_xxx.text}</span>
        <span>{args.v_frame.text}</span>
      </div>
      <div className="flex flex-col mt-2">
        <span>{args.tv_hh.text}</span>
        <span>{args.tv_mm.text}</span>
        <span>{args.tv_ss.text}</span>
        <span>{args.tv_xxx.text}</span>
        <span>{args.tv_frame.text}</span>
      </div>
    </div>
  </div>
}

export function useFileNameFormat()
{
  const [file] = useAtom(fileAtom);
  const [fps] = useAtom(fpsAtom);

  const [currentTime] = useAtom(currentTimeAtom);
  const [currentFrame] = useAtom(currentFrameAtom);

  const [meta] = useAtom(videoMetaAtom);
  const [maxFrame] = useAtom(maxFrameAtom);

  const max = TimeUtil.splitHhmmssxxx(meta.duration);
  const current = TimeUtil.splitHhmmssxxx(currentTime);

  const date = new Date();
  const paramProfiles = {
    srcBaseName: {
      value: file?.name?.split('.')?.shift(),
      text: `{srcBaseName} = 動画ファイルの名称`
    },
    srcExt: {
      value: file?.type,
      text: `{srcExt} = 動画ファイルの拡張子`
    },
    fps: {
      value: fps,
      text: `{fps} = フレームレート`
    },
    yyyy: {
      value: date.getFullYear(),
      text: `{yyyy} = 現在の年(4桁)`
    },
    MM: {
      value: TimeUtil.pad2(date.getMonth()),
      text: `{MM} = 現在の月(2桁)`
    },
    dd: {
      value: TimeUtil.pad2(date.getDate()),
      text: `{dd} = 現在の日(2桁)`
    },
    hh: {
      value: TimeUtil.pad2(date.getHours()),
      text: `{hh} = 現在の時(2桁)`
    },
    mm: {
      value: TimeUtil.pad2(date.getMinutes()),
      text: `{mm} = 現在の分(2桁)`
    },
    ss: {
      value: TimeUtil.pad2(date.getSeconds()),
      text: `{ss} = 現在の秒(2桁)`
    },
    xxx: {
      value: TimeUtil.pad2(date.getMilliseconds()),
      text: `{xxx} = 現在のミリ秒(3桁)`
    },
    v_hh: {
      value: TimeUtil.pad2(current.h),
      text: `{v_hh} = 対象フレームの時(2桁)`
    },
    v_mm: {
      value: TimeUtil.pad2(current.m),
      text: `{v_mm} = 対象フレームの分(2桁)`
    },
    v_ss: {
      value: TimeUtil.pad2(current.s),
      text: `{v_ss} = 対象フレームの秒(2桁)`
    },
    v_xxx: {
      value: TimeUtil.pad2(current.x),
      text: `{v_xxx} = 対象フレームのミリ秒(3桁)`
    },
    v_frame: {
      value: currentFrame,
      text: `{v_frame} = 対象フレームのフレーム番号`
    },
    tv_hh: {
      value: TimeUtil.pad2(max.h),
      text: `{tv_hh} = 動画の最大時(2桁)`
    },
    tv_mm: {
      value: TimeUtil.pad2(max.m),
      text: `{tv_mm} = 動画の最大分(2桁)`
    },
    tv_ss: {
      value: TimeUtil.pad2(max.s),
      text: `{tv_ss} = 動画の最大秒(2桁)`
    },
    tv_xxx: {
      value: TimeUtil.pad2(max.x),
      text: `{tv_xxx} = 動画の最大ミリ秒(3桁)`
    },
    tv_frame: {
      value: maxFrame,
      text: `{tv_frame} = 動画の総フレーム数`
    }
  };

  const args = Object.fromEntries(
    Object.entries(paramProfiles).map(([key, obj]) => [key, obj.value])
  );

  return {
    format: function(template: string)
    {
      return interpole(
        template,
        args,
        {
          exactMatch: true,
          specElement: '_',
          pattern: '{_}',
        }
      );
    },
    ...paramProfiles
  }
}










