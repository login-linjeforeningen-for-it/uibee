import React from "react";

//#region src/icons/icons.d.ts
interface LogfontIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}
declare const Circle: ({
  size,
  ...props
}: LogfontIconProps) => React.JSX.Element;
declare const Rect: ({
  size,
  ...props
}: LogfontIconProps) => React.JSX.Element;
declare const Login: ({
  size,
  ...props
}: LogfontIconProps) => React.JSX.Element;
declare const LoginText: ({
  size,
  ...props
}: LogfontIconProps) => React.JSX.Element;
declare const StyretCorners: ({
  size,
  ...props
}: LogfontIconProps) => React.JSX.Element;
declare const Styret: ({
  size,
  ...props
}: LogfontIconProps) => React.JSX.Element;
declare const StyretFilled: ({
  size,
  ...props
}: LogfontIconProps) => React.JSX.Element;
declare const EventkomCorners: ({
  size,
  ...props
}: LogfontIconProps) => React.JSX.Element;
declare const Eventkom: ({
  size,
  ...props
}: LogfontIconProps) => React.JSX.Element;
declare const EventkomFilled: ({
  size,
  ...props
}: LogfontIconProps) => React.JSX.Element;
declare const BedkomCorners: ({
  size,
  ...props
}: LogfontIconProps) => React.JSX.Element;
declare const Bedkom: ({
  size,
  ...props
}: LogfontIconProps) => React.JSX.Element;
declare const BedkomFilled: ({
  size,
  ...props
}: LogfontIconProps) => React.JSX.Element;
declare const TekkomCorners: ({
  size,
  ...props
}: LogfontIconProps) => React.JSX.Element;
declare const Tekkom: ({
  size,
  ...props
}: LogfontIconProps) => React.JSX.Element;
declare const CtfkomCorners: ({
  size,
  ...props
}: LogfontIconProps) => React.JSX.Element;
declare const Ctfkom: ({
  size,
  ...props
}: LogfontIconProps) => React.JSX.Element;
declare const CtfkomFilled: ({
  size,
  ...props
}: LogfontIconProps) => React.JSX.Element;
declare const SatkomCorners: ({
  size,
  ...props
}: LogfontIconProps) => React.JSX.Element;
declare const Satkom: ({
  size,
  ...props
}: LogfontIconProps) => React.JSX.Element;
declare const SatkomFilled: ({
  size,
  ...props
}: LogfontIconProps) => React.JSX.Element;
declare const PrCorners: ({
  size,
  ...props
}: LogfontIconProps) => React.JSX.Element;
declare const Pr: ({
  size,
  ...props
}: LogfontIconProps) => React.JSX.Element;
declare const PrFilled: ({
  size,
  ...props
}: LogfontIconProps) => React.JSX.Element;
declare const Ntnu: ({
  size,
  ...props
}: LogfontIconProps) => React.JSX.Element;
declare const Sit: ({
  size,
  ...props
}: LogfontIconProps) => React.JSX.Element;
declare const SitText: ({
  size,
  ...props
}: LogfontIconProps) => React.JSX.Element;
declare const NtnuiGjvik: ({
  size,
  ...props
}: LogfontIconProps) => React.JSX.Element;
declare const NtnuiSimple: ({
  size,
  ...props
}: LogfontIconProps) => React.JSX.Element;
declare const Huset: ({
  size,
  ...props
}: LogfontIconProps) => React.JSX.Element;
declare const HusetText: ({
  size,
  ...props
}: LogfontIconProps) => React.JSX.Element;
declare const GjvikKommune: ({
  size,
  ...props
}: LogfontIconProps) => React.JSX.Element;
declare const Peppes: ({
  size,
  ...props
}: LogfontIconProps) => React.JSX.Element;
declare const Pizzabakeren: ({
  size,
  ...props
}: LogfontIconProps) => React.JSX.Element;
declare const Chaplin: ({
  size,
  ...props
}: LogfontIconProps) => React.JSX.Element;
declare const Discord: ({
  size,
  ...props
}: LogfontIconProps) => React.JSX.Element;
declare const Instagram: ({
  size,
  ...props
}: LogfontIconProps) => React.JSX.Element;
declare const Facebook: ({
  size,
  ...props
}: LogfontIconProps) => React.JSX.Element;
declare const Linkedin: ({
  size,
  ...props
}: LogfontIconProps) => React.JSX.Element;
declare const Gitlab: ({
  size,
  ...props
}: LogfontIconProps) => React.JSX.Element;
declare const Wikijs: ({
  size,
  ...props
}: LogfontIconProps) => React.JSX.Element;
declare const Snapchat: ({
  size,
  ...props
}: LogfontIconProps) => React.JSX.Element;
declare const Twitter: ({
  size,
  ...props
}: LogfontIconProps) => React.JSX.Element;
declare const Youtube: ({
  size,
  ...props
}: LogfontIconProps) => React.JSX.Element;
declare const Microsoft: ({
  size,
  ...props
}: LogfontIconProps) => React.JSX.Element;
declare const Windows: ({
  size,
  ...props
}: LogfontIconProps) => React.JSX.Element;
declare const Android: ({
  size,
  ...props
}: LogfontIconProps) => React.JSX.Element;
declare const Apple: ({
  size,
  ...props
}: LogfontIconProps) => React.JSX.Element;
declare const Ubuntu: ({
  size,
  ...props
}: LogfontIconProps) => React.JSX.Element;
declare const Archlinux: ({
  size,
  ...props
}: LogfontIconProps) => React.JSX.Element;
declare const Manjaro: ({
  size,
  ...props
}: LogfontIconProps) => React.JSX.Element;
declare const Debian: ({
  size,
  ...props
}: LogfontIconProps) => React.JSX.Element;
declare const Linux: ({
  size,
  ...props
}: LogfontIconProps) => React.JSX.Element;
declare const Tux: ({
  size,
  ...props
}: LogfontIconProps) => React.JSX.Element;
declare const Bitcoin: ({
  size,
  ...props
}: LogfontIconProps) => React.JSX.Element;
declare const Raspberrypi: ({
  size,
  ...props
}: LogfontIconProps) => React.JSX.Element;
declare const Arduino: ({
  size,
  ...props
}: LogfontIconProps) => React.JSX.Element;
declare const Cisco: ({
  size,
  ...props
}: LogfontIconProps) => React.JSX.Element;
declare const Codepen: ({
  size,
  ...props
}: LogfontIconProps) => React.JSX.Element;
declare const Postgresql: ({
  size,
  ...props
}: LogfontIconProps) => React.JSX.Element;
declare const Digitalocean: ({
  size,
  ...props
}: LogfontIconProps) => React.JSX.Element;
declare const Kubernetes: ({
  size,
  ...props
}: LogfontIconProps) => React.JSX.Element;
declare const Docker: ({
  size,
  ...props
}: LogfontIconProps) => React.JSX.Element;
declare const Python: ({
  size,
  ...props
}: LogfontIconProps) => React.JSX.Element;
declare const Html5: ({
  size,
  ...props
}: LogfontIconProps) => React.JSX.Element;
declare const Css3: ({
  size,
  ...props
}: LogfontIconProps) => React.JSX.Element;
declare const Cpp: ({
  size,
  ...props
}: LogfontIconProps) => React.JSX.Element;
declare const Go: ({
  size,
  ...props
}: LogfontIconProps) => React.JSX.Element;
declare const Rust: ({
  size,
  ...props
}: LogfontIconProps) => React.JSX.Element;
declare const Java: ({
  size,
  ...props
}: LogfontIconProps) => React.JSX.Element;
declare const Firefox: ({
  size,
  ...props
}: LogfontIconProps) => React.JSX.Element;
declare const Tor: ({
  size,
  ...props
}: LogfontIconProps) => React.JSX.Element;
declare const Duckduckgo: ({
  size,
  ...props
}: LogfontIconProps) => React.JSX.Element;
declare const Mysql: ({
  size,
  ...props
}: LogfontIconProps) => React.JSX.Element;
declare const Nintendoswitch: ({
  size,
  ...props
}: LogfontIconProps) => React.JSX.Element;
declare const Javascript: ({
  size,
  ...props
}: LogfontIconProps) => React.JSX.Element;
declare const ReactLogo: ({
  size,
  ...props
}: LogfontIconProps) => React.JSX.Element;
declare const NodeDotJs: ({
  size,
  ...props
}: LogfontIconProps) => React.JSX.Element;
declare const Npm: ({
  size,
  ...props
}: LogfontIconProps) => React.JSX.Element;
declare const Webpack: ({
  size,
  ...props
}: LogfontIconProps) => React.JSX.Element;
declare const Powershell: ({
  size,
  ...props
}: LogfontIconProps) => React.JSX.Element;
declare const Postman: ({
  size,
  ...props
}: LogfontIconProps) => React.JSX.Element;
declare const Redmine: ({
  size,
  ...props
}: LogfontIconProps) => React.JSX.Element;
declare const Stackoverflow: ({
  size,
  ...props
}: LogfontIconProps) => React.JSX.Element;
declare const Udemy: ({
  size,
  ...props
}: LogfontIconProps) => React.JSX.Element;
declare const Untappd: ({
  size,
  ...props
}: LogfontIconProps) => React.JSX.Element;
declare const Vim: ({
  size,
  ...props
}: LogfontIconProps) => React.JSX.Element;
declare const Visualstudio: ({
  size,
  ...props
}: LogfontIconProps) => React.JSX.Element;
declare const Vscode: ({
  size,
  ...props
}: LogfontIconProps) => React.JSX.Element;
declare const Figma: ({
  size,
  ...props
}: LogfontIconProps) => React.JSX.Element;
declare const Redhat: ({
  size,
  ...props
}: LogfontIconProps) => React.JSX.Element;
declare const Zoom: ({
  size,
  ...props
}: LogfontIconProps) => React.JSX.Element;
declare const Onepassword: ({
  size,
  ...props
}: LogfontIconProps) => React.JSX.Element;
declare const Github: ({
  size,
  ...props
}: LogfontIconProps) => React.JSX.Element;
declare const Git: ({
  size,
  ...props
}: LogfontIconProps) => React.JSX.Element;
declare const GitText: ({
  size,
  ...props
}: LogfontIconProps) => React.JSX.Element;
declare const GitText2: ({
  size,
  ...props
}: LogfontIconProps) => React.JSX.Element;
declare const Database: ({
  size,
  ...props
}: LogfontIconProps) => React.JSX.Element;
declare const Pacman: ({
  size,
  ...props
}: LogfontIconProps) => React.JSX.Element;
declare const Usb: ({
  size,
  ...props
}: LogfontIconProps) => React.JSX.Element;
declare const Pizza: ({
  size,
  ...props
}: LogfontIconProps) => React.JSX.Element;
declare const Tree: ({
  size,
  ...props
}: LogfontIconProps) => React.JSX.Element;
declare const Trophy: ({
  size,
  ...props
}: LogfontIconProps) => React.JSX.Element;
//#endregion
export { Android, Apple, Archlinux, Arduino, Bedkom, BedkomCorners, BedkomFilled, Bitcoin, Chaplin, Circle, Cisco, Codepen, Cpp, Css3, Ctfkom, CtfkomCorners, CtfkomFilled, Database, Debian, Digitalocean, Discord, Docker, Duckduckgo, Eventkom, EventkomCorners, EventkomFilled, Facebook, Figma, Firefox, Git, GitText, GitText2, Github, Gitlab, GjvikKommune, Go, Html5, Huset, HusetText, Instagram, Java, Javascript, Kubernetes, Linkedin, Linux, LogfontIconProps, Login, LoginText, Manjaro, Microsoft, Mysql, Nintendoswitch, NodeDotJs, Npm, Ntnu, NtnuiGjvik, NtnuiSimple, Onepassword, Pacman, Peppes, Pizza, Pizzabakeren, Postgresql, Postman, Powershell, Pr, PrCorners, PrFilled, Python, Raspberrypi, ReactLogo, Rect, Redhat, Redmine, Rust, Satkom, SatkomCorners, SatkomFilled, Sit, SitText, Snapchat, Stackoverflow, Styret, StyretCorners, StyretFilled, Tekkom, TekkomCorners, Tor, Tree, Trophy, Tux, Twitter, Ubuntu, Udemy, Untappd, Usb, Vim, Visualstudio, Vscode, Webpack, Wikijs, Windows, Youtube, Zoom };