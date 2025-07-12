




export function formatHhmmssxxx(seconds: number): string
{
  const sign = (seconds < 0 ? "-" : "");

  const h = Math.floor(seconds / 3600);
  const remainingHoures = seconds % 3600;

  const m = Math.floor(remainingHoures / 60);
  const remainingMinutes = remainingHoures % 60;

  const s = Math.floor(remainingMinutes);
  const x = Math.round((remainingMinutes - s) * 1000);
  
  function pad2(n: number): string { return String(n).padStart(2, '0') };
  function pad3(n: number): string { return String(n).padStart(3, '0') };
  
  return `${sign}${pad2(h)}:${pad2(m)}:${pad2(s)}.${pad3(x)}`;
}

/** 指定した実数から最小の値を取り出す。(12.34 => 0.01) */
export function getSmallestUnit(num: number): number | null
{
  const text = String(num);

  if(text.includes("e")) throw new Error(`実数が指数表記である。${text}`);
  if(!text.includes(".")) return null;

  const last = text.split(".")[1];
  const zeroLen = last.length - 1;

  return Number(`0.${"0".repeat(zeroLen)}1`);
}





