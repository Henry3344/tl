export const DIFF_SETTINGS = {
  easy: {
    turns: 11,
    label: '推理新手',
    shortHint: '讯问宽裕，容错更高；适合刚接触推理径路的读者。',
    hint: '讯问宽裕，容错高一些——也别指望叙事替你结案'
  },
  normal: {
    turns: 8,
    label: '进阶推理',
    shortHint: '节奏标准；假话越体面，越要靠时间线与权限去拆。',
    hint: '节奏收紧：假话包装得越体面，越要看时间线与权限'
  },
  hard: {
    turns: 6,
    label: '硬核老手',
    shortHint: '回合紧、容错低；每一下深挖都要对准承重疑点。',
    hint: '回合吝啬；每一处深挖都得对准承重疑点，否则会被叙事噎死'
  }
};

/** Mulberry32 RNG (deterministic from seed) */
export function makeRng(seed) {
  let t = seed >>> 0;
  return function rand() {
    t += 0x6D2B79F5;
    let x = t;
    x = Math.imul(x ^ (x >>> 15), x | 1);
    x ^= x + Math.imul(x ^ (x >>> 7), x | 61);
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
  };
}

export function pick(rng, arr) {
  return arr[Math.floor(rng() * arr.length)];
}

export function shuffleInPlace(rng, arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}
