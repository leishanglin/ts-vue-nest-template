import logout from "@/assets/svg-icons/log-out.svg?raw";

export const svgIconMap = <const>{
  "log-out": logout,
};

export type SvgIconType = keyof typeof svgIconMap;
