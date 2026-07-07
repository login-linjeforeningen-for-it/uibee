import { ElementType } from "react";

//#region src/components/container/iconBubble.d.ts
declare const tones: {
  readonly amber: "bg-amber-500/10 text-amber-400";
  readonly blue: "bg-sky-500/10 text-sky-400";
  readonly emerald: "bg-emerald-500/10 text-emerald-400";
  readonly rose: "bg-rose-500/10 text-rose-400";
  readonly slate: "bg-login-600 text-login-100";
  readonly violet: "bg-violet-500/10 text-violet-400";
  readonly orange: "bg-login/10 text-login";
};
type IconBubbleProps = {
  icon: ElementType;
  tone?: keyof typeof tones;
  size?: 'sm' | 'md' | 'lg';
};
type IconBubbleTone = keyof typeof tones;
declare function IconBubble({
  icon: Icon,
  tone,
  size
}: IconBubbleProps): import("react").JSX.Element;
//#endregion
export { IconBubbleTone, IconBubble as default };