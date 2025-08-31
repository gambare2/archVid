declare module "vanta/dist/vanta.dots.min" {
    import * as THREE from "three";
  
    export interface VantaOptions {
      el: HTMLElement;
      THREE: typeof THREE;
      mouseControls?: boolean;
      touchControls?: boolean;
      gyroControls?: boolean;
      minHeight?: number;
      minWidth?: number;
      scale?: number;
      scaleMobile?: number;
      color?: number;
      color2?: number;
      backgroundColor?: number;
      size?: number;
      spacing?: number;
      showLines?: boolean;
    }
  
    export type VantaEffect = (options: VantaOptions) => { destroy: () => void };
  
    const DOTS: VantaEffect;
    export default DOTS;
  }
  