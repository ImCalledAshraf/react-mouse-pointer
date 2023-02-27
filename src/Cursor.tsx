import React, { FC, useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import './misc/style.css';
import { isMobile } from 'react-device-detect';
import { gsap, Expo, Power4 } from 'gsap';
import createGlobalState from './misc/util/globalState';

interface Pos {
  x?: number;
  y?: number;
}

interface Vel {
  x?: number;
  y?: number;
}

type Diff = number | undefined;

function getScale(diffX: Diff, diffY: Diff) {
  if (diffX && diffY) {
    const distance = Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));
    return Math.min(distance / 735, 0.35);
  }
  return;
}

function getAngle(diffX: Diff, diffY: Diff) {
  if (diffX && diffY) {
    return (Math.atan2(diffY, diffX) * 180) / Math.PI;
  }
  return;
}

const EMPTY = {};

function useInstance(value = {}) {
  const ref = useRef(EMPTY);
  if (ref.current === EMPTY) {
    ref.current = typeof value === 'function' ? value() : value;
  }
  return ref.current;
}

function useTicker(callback: () => void, paused?: boolean) {
  useLayoutEffect(() => {
    if (!paused && callback) {
      gsap.ticker.add(callback);
    }
    return () => {
      gsap.ticker.remove(callback);
    };
  }, [callback, paused]);
}

interface CursorProps {
  /*-Misc-*/
  animationDuration?: number;
  animationEase?: string | gsap.EaseFunction | undefined;
  disableOnMobile?: boolean;
  /*-Gelly-*/
  isGelly?: boolean;
  gellyAnimationAmount?: number;
  // gellyAnimationDuration?: number;
  /*-Style-*/
  cursorSize?: number;
  sizeAnimationDuration?: number;
  sizeAnimationEase?: string | gsap.EaseFunction | undefined;
  cursorBorderRadius?: string;
  cursorTransparency?: string;
  /*-Stick-*/
  stickAmount?: number;
  stickAnimationEase?: string | gsap.EaseFunction | undefined;
  /*-Magnetic-*/
  magneticAmount?: number;
  magneticAnimationDuration?: number;
  magneticAnimationEase?: string | gsap.EaseFunction | undefined;
  /*-Color-*/
  colorAnimationEase?: string | gsap.EaseFunction | undefined;
  colorAnimationDuration?: number;
  /*-Background-*/
  cursorBackgroundColor?: string | undefined;
  backgroundImageAnimationEase?: string | gsap.EaseFunction | undefined;
  backgroundImageAnimationDuration?: number;
  cursorInnerColor?: string;
  /*-Outline-*/
  cursorOutlineWidth?: string;
  cursorOutlineColor?: string;
  cursorOutlineStyle?: string;
  /*-Shapeshift-*/
  shapeShiftAnimationDuration?: number;
  shapeShiftAnimationEase?: string | gsap.EaseFunction | undefined;
  /*-Text-*/
  textAnimationEase?: string | gsap.EaseFunction | undefined;
  textAnimationDuration?: number;
  /*-Exclusion-*/
  exclusionBackgroundColor?: string;
  /*-Float-*/
  floatAmount?: number;
  floatFollow?: boolean;
  floatSpringToPosition?: boolean;
  floatAnimationDuration?: number;
  floatAnimationEase?: string | gsap.EaseFunction | undefined;
  /*-Tilt-*/
  tiltAmount?: number | string;
  tiltAnimationDuration?: number | string;
  tiltAnimationEase?: string | gsap.EaseFunction | undefined;
  /*-Glow-*/
  glowProximityColor?: string;
  glowHoverColor?: string;
  glowProximityColorOpacity?: string | number;
  glowHoverColorOpacity?: string | number;
  glowProximityColorSize?: string;
  glowHoverColorSize?: string;
  glowAnimationDuration?: number;
  glowAnimationEase?: string | gsap.EaseFunction | undefined;
}

export const useGlobalProps = createGlobalState<CursorProps>({});
export const useGlobalCursorRef = createGlobalState<any>();
export const useGlobalCursorInnerRef = createGlobalState<any>();
export const useGlobalStickStatus = createGlobalState<boolean>(false);
export const useRotateCursor = createGlobalState<boolean>(true);

const Cursor: FC<CursorProps> = ({
  /*-Misc-*/
  animationDuration = 1.25,
  animationEase = Expo.easeOut,
  disableOnMobile = true,
  /*-Gelly-*/
  isGelly = false,
  gellyAnimationAmount = 50,
  /*-Style-*/
  cursorSize = 30,
  sizeAnimationDuration = 0.5,
  sizeAnimationEase = Expo.easeOut,
  cursorBorderRadius = '100%',
  cursorTransparency = '100%',
  /*-Stick-*/
  stickAmount = 0.2,
  stickAnimationEase = Power4.easeOut,
  /*-Magnetic-*/
  magneticAmount = 0.5,
  magneticAnimationDuration = 0.9,
  magneticAnimationEase = Power4.easeOut,
  /*-Color-*/
  colorAnimationEase = Power4.easeOut,
  colorAnimationDuration = 0.2,
  /*-Background-*/
  cursorBackgroundColor = '',
  backgroundImageAnimationEase = undefined,
  backgroundImageAnimationDuration = 0,
  cursorInnerColor = '#fff',
  /*-Outline-*/
  cursorOutlineWidth = '2px',
  cursorOutlineColor = 'black',
  cursorOutlineStyle = 'solid',
  /*-Shapeshift-*/
  shapeShiftAnimationEase = Expo.easeOut,
  shapeShiftAnimationDuration = 0.5,
  /*-Text-*/
  textAnimationEase = Expo.easeOut,
  textAnimationDuration = 1,
  /*-Exclusion-*/
  exclusionBackgroundColor = '#fff',
  /*-Float-*/
  floatAmount = 0.05,
  floatAnimationDuration = 0.5,
  floatFollow = false,
  floatAnimationEase = Expo.easeOut,
  floatSpringToPosition = true,
  /*-Tilt-*/
  tiltAmount = 0.05,
  tiltAnimationDuration = 0.5,
  tiltAnimationEase = Expo.easeOut,
  /*-Glow-*/
  glowAnimationDuration = 1.2,
  glowProximityColor = 'blue',
  glowHoverColor = 'red',
  glowProximityColorOpacity = 1,
  glowHoverColorOpacity = 1,
  glowProximityColorSize = '600px',
  glowHoverColorSize = '800px',
  glowAnimationEase = Expo.easeOut,
}) => {
  // @ts-ignore
  const [globalProps, setGlobalProps] = useGlobalProps();
  // @ts-ignore
  const [globalCursorRef, setGlobalCursorRef] = useGlobalCursorRef();
  // @ts-ignore
  const [globalCursorInnerRef, setGlobalCursorInnerRef] = useGlobalCursorInnerRef();
  const [globalStickStatus, setGlobalStickStatus] = useGlobalStickStatus();
  const [rotateCursor, setRotateCursor] = useRotateCursor();

  // let rotateCursor = true;
  const cursor = useRef<HTMLDivElement | null>(null);
  const cursorInner = useRef<HTMLDivElement | null>(null);

  const pos: Pos = useInstance(() => ({ x: 0, y: 0 }));
  const vel: Vel = useInstance(() => ({ x: 0, y: 0 }));
  const set: any = useInstance();
  useEffect(() => {
    setGlobalCursorRef(cursor.current);
    setGlobalCursorInnerRef(cursorInner.current);
    setGlobalProps({
      /*-Misc-*/
      animationDuration: animationDuration,
      animationEase: animationEase,
      disableOnMobile: disableOnMobile,
      /*-Gelly-*/
      isGelly: isGelly,
      gellyAnimationAmount: gellyAnimationAmount,
      /*-Style-*/
      cursorSize: cursorSize,
      sizeAnimationDuration: sizeAnimationDuration,
      sizeAnimationEase: sizeAnimationEase,
      cursorBorderRadius: cursorBorderRadius,
      cursorTransparency: cursorTransparency,
      /*-Stick-*/
      stickAmount: stickAmount,
      stickAnimationEase: stickAnimationEase,
      /*-Magnetic-*/
      magneticAmount: magneticAmount,
      magneticAnimationDuration: magneticAnimationDuration,
      magneticAnimationEase: magneticAnimationEase,
      /*-Color-*/
      colorAnimationEase: colorAnimationEase,
      colorAnimationDuration: colorAnimationDuration,
      /*-Background-*/
      cursorBackgroundColor: cursorBackgroundColor,
      backgroundImageAnimationEase: backgroundImageAnimationEase,
      backgroundImageAnimationDuration: backgroundImageAnimationDuration,
      cursorInnerColor: cursorInnerColor,
      /*-Outline-*/
      cursorOutlineWidth: cursorOutlineWidth,
      cursorOutlineColor: cursorOutlineColor,
      cursorOutlineStyle: cursorOutlineStyle,
      /*-Shapeshift-*/
      shapeShiftAnimationEase: shapeShiftAnimationEase,
      shapeShiftAnimationDuration: shapeShiftAnimationDuration,
      /*-Text-*/
      textAnimationEase: textAnimationEase,
      textAnimationDuration: textAnimationDuration,
      /*-Exclusion-*/
      exclusionBackgroundColor: exclusionBackgroundColor,
      /*-Float-*/
      floatAmount: floatAmount,
      floatAnimationDuration: floatAnimationDuration,
      floatFollow: floatFollow,
      floatAnimationEase: floatAnimationEase,
      floatSpringToPosition: floatSpringToPosition,
      /*-Tilt-*/
      tiltAmount: tiltAmount,
      tiltAnimationDuration: tiltAnimationDuration,
      tiltAnimationEase: tiltAnimationEase,
      /*-Glow-*/
      glowAnimationDuration: glowAnimationDuration,
      glowProximityColor: glowProximityColor,
      glowHoverColor: glowHoverColor,
      glowProximityColorOpacity: glowProximityColorOpacity,
      glowHoverColorOpacity: glowHoverColorOpacity,
      glowProximityColorSize: glowProximityColorSize,
      glowHoverColorSize: glowHoverColorSize,
      glowAnimationEase: glowAnimationEase,
    });
    setGlobalStickStatus(false);
    setRotateCursor(true);
  }, []);
  useLayoutEffect(() => {
    set.x = gsap.quickSetter(cursor.current, 'x', 'px');
    set.y = gsap.quickSetter(cursor.current, 'y', 'px');
    set.sx = gsap.quickSetter(cursor.current, 'scaleX');
    set.sy = gsap.quickSetter(cursor.current, 'scaleY');
    if (isGelly) {
      set.r = gsap.quickSetter(cursor.current, 'rotate', 'deg');
      set.width = gsap.quickSetter(cursor.current, 'width', 'px');
      set.rt = gsap.quickSetter(cursorInner.current, 'rotate', 'deg');
    }
  });
  const loop = useCallback(() => {
    const rotation = getAngle(vel.x, vel.y);
    const scale = getScale(vel.x, vel.y);

    set.x(pos.x);
    set.y(pos.y);
    if (!isMobile || !disableOnMobile) {
      set.sx(1);
      set.sy(1);
      if (isGelly && scale && rotation && cursor.current) {
        set.width(cursor.current?.style.height + scale * gellyAnimationAmount);
        set.sx(1 + scale);
        set.sy(1 - scale);
        if (rotateCursor) {
          set.r(rotation);
          set.rt(-rotation);
        } else {
          set.r(0);
          set.rt(0);
        }
      }
    } else {
      set.sx(0);
      set.sy(0);
    }
  }, [gellyAnimationAmount, disableOnMobile, isGelly, pos.x, pos.y, set, vel.x, vel.y]);
  useLayoutEffect(() => {
    const setFromEvent = (e: MouseEvent) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const areatarget = e.target as HTMLElement;
      let target: HTMLElement | null;
      let bound: DOMRect | undefined;
      let x = e.clientX;
      let y = e.clientY;
      let duration = animationDuration;
      let ease = animationEase;

      if (globalStickStatus) {
        if (areatarget.dataset['cursorStick']) {
          target = areatarget;
          bound = target?.getBoundingClientRect();
          let calculatedStickAnimationAmount = target.dataset['cursorStickAmount']
            ? target.dataset['cursorStickAmount']
            : stickAmount;
          // @ts-ignore
          let calculatedStickAnimationEase = target.dataset['cursorStickAnimationEase']
            ? target.dataset['cursorStickAnimationEase']
            : stickAnimationEase;
          if (target && bound) {
            y =
              bound.top +
              target.clientHeight / 2 -
              // @ts-ignore
              (bound.top + target.clientHeight / 2 - e.clientY) * calculatedStickAnimationAmount;
            x =
              bound.left +
              target.clientWidth / 2 -
              // @ts-ignore
              (bound.left + target.clientWidth / 2 - e.clientX) * calculatedStickAnimationAmount;
            duration = animationDuration;
            // @ts-ignore
            ease = calculatedStickAnimationEase;
          }
        }
      }
      gsap.set(pos, {});
      const xTo = gsap.quickTo(pos, 'x', {
        duration,
        ease,
        onUpdate: () => {
          if (pos.x) vel.x = x - pos.x;
        },
      });
      const yTo = gsap.quickTo(pos, 'y', {
        duration,
        ease,
        onUpdate: () => {
          if (pos.y) vel.y = y - pos.y;
        },
      });
      xTo(x);
      yTo(y);
      loop();
    };
    //---------------------------------------------------------------------------------------------------[START Listenesers]--//
    if (!isMobile || !disableOnMobile) {
      window.addEventListener('mousemove', (e) => {
        setFromEvent(e);
      });
      document.addEventListener('mouseenter', () => {
        if (cursor.current) {
          // @ts-ignore
          gsap.to(`#${cursor.current.id}`, {
            opacity: 1,
            duration: animationDuration,
            ease: animationEase,
          });
        }
      });
      document.addEventListener('mouseleave', () => {
        if (cursor.current) {
          // @ts-ignore
          gsap.to(`#${cursor.current.id}`, {
            opacity: 0,
            duration: animationDuration,
            ease: animationEase,
          });
        }
      });
    }
    //---------------------------------------------------------------------------------------------------[END Listenesers]--//

    return () => {
      window.removeEventListener('mousemove', setFromEvent);
      document.removeEventListener('mouseenter', () => {});
      document.removeEventListener('mouseleave', () => {});
    };
  });

  useTicker(loop);
  return (
    <div
      ref={cursor}
      id={'pointer-cursor'}
      className="pointer-cursor"
      style={{
        width: cursorSize,
        height: cursorSize,
        background: cursorBackgroundColor,
        outlineWidth: cursorOutlineWidth,
        outlineColor: cursorOutlineColor,
        outlineStyle: cursorOutlineStyle,
        borderRadius: `${cursorBorderRadius}`,
        filter: `opacity(${cursorTransparency}`,
      }}>
      <div
        style={{ color: cursorInnerColor }}
        ref={cursorInner}
        id={'pointer-cursorInner'}
        className="pointer-cursor__inner"
      />
    </div>
  );
};
/*--------------------------------------------------------------------------------*/
/*-*/
/*-*/
/*-*/
/*-*/
/*--------------------------------------------------------------------------------*/
/*-------------------------------CursorStyleProp----------------------------------*/

/*--------------------------------------------------------------------------------*/
interface CrusorStyleProps {
  /*-Misc-*/
  children?: JSX.Element | JSX.Element[] | null;
  style?: CSSStyleDeclaration;
  // animationDuration?: number;
  // animationEase?: string | gsap.EaseFunction | undefined;
  /*-Style-*/
  cursorSize?: number | string;
  sizeAnimationDuration?: number;
  sizeAnimationEase?: string | gsap.EaseFunction | undefined;
  cursorBorderRadius?: string;
  cursorTransparency?: string;
  /*-Stick-*/
  isSticky?: string | boolean;
  stickAmount?: number;
  stickAnimationEase?: string | gsap.EaseFunction | undefined;
  /*-Magnetic-*/
  isMagnetic?: string | boolean;
  magneticAmount?: number;
  magneticAnimationDuration?: number;
  magneticAnimationEase?: string | gsap.EaseFunction | undefined;
  /*-Color-*/
  colorAnimationEase?: string | gsap.EaseFunction | undefined;
  colorAnimationDuration?: number;
  /*-Background-*/
  cursorBackgroundColor?: string | undefined;
  cursorBackgroundImage?: string;
  cursorBackgroundImageScale?: number;
  backgroundImageAnimationEase?: string | gsap.EaseFunction | undefined;
  backgroundImageAnimationDuration?: number;
  cursorInnerColor?: string;
  /*-Outline-*/
  cursorOutlineWidth?: string;
  cursorOutlineColor?: string;
  /*-Shapeshift-*/
  shapeShift?: string | boolean;
  shapeShiftAnimationDuration?: number;
  shapeShiftAnimationEase?: string | gsap.EaseFunction | undefined;
  /*-Text-*/
  cursorText?: string;
  cursorTextScale?: number | string;
  cursorTextColor?: string;
  cursorTextOpacity?: string | number;
  textAnimationEase?: string | gsap.EaseFunction | undefined;
  textAnimationDuration?: number;
  /*-Exclusion-*/
  exclusion?: string | boolean;
  exclusionBackgroundColor?: string;
  /*-Float-*/
  float?: string | boolean;
  floatAmount?: number | string;
  floatFollow?: boolean;
  floatTriggerOffset?: number | string;
  floatSpringToPosition?: boolean;
  floatAnimationDuration?: number | string;
  floatAnimationEase?: string | gsap.EaseFunction | undefined;
  /*-Tilt-*/
  tilt?: string | boolean;
  tiltAmount?: number | string;
  tiltTriggerOffset?: number | string;
  tiltAnimationDuration?: number | string;
  tiltAnimationEase?: string | gsap.EaseFunction | undefined;
  /*-Glow-*/
  glow?: string | boolean;
  glowProximityColor?: string;
  glowHoverColor?: string;
  glowProximityColorOpacity?: string | number;
  glowHoverColorOpacity?: string | number;
  glowProximityColorSize?: string;
  glowHoverColorSize?: string;
  glowTriggerOffset?: number;
  glowAnimationDuration?: number;
  glowAnimationEase?: string | gsap.EaseFunction | undefined;
}

const CursorStyle: FC<CrusorStyleProps> = ({
  /*-Misc-*/
  children,
  style = null,
  // animationDuration = null,
  // animationEase = null,
  /*-Style-*/
  cursorSize = null,
  sizeAnimationDuration = null,
  sizeAnimationEase = null,
  cursorBorderRadius = null,
  cursorTransparency = null,
  /*-Stick-*/
  isSticky = null,
  stickAmount = null,
  stickAnimationEase = null,
  /*-Magnetic-*/
  isMagnetic = null,
  magneticAmount = null,
  magneticAnimationDuration = null,
  magneticAnimationEase = null,
  /*-Color-*/
  colorAnimationEase = null,
  colorAnimationDuration = null,
  /*-Background-*/
  cursorBackgroundColor = null,
  cursorBackgroundImage = null,
  cursorBackgroundImageScale = null,
  backgroundImageAnimationEase = undefined,
  backgroundImageAnimationDuration = null,
  /*-Outline-*/
  cursorOutlineWidth = null,
  cursorOutlineColor = null,
  /*-Shapeshift-*/
  shapeShift = null,
  shapeShiftAnimationDuration = null,
  shapeShiftAnimationEase = null,
  /*-Text-*/
  cursorText = null,
  cursorTextScale = null,
  cursorTextColor = null,
  cursorTextOpacity = null,
  textAnimationEase = null,
  textAnimationDuration = null,
  /*-Exclusion-*/
  exclusion = null,
  exclusionBackgroundColor = null,
  /*-Float-*/
  float = null,
  floatAmount = null,
  floatFollow = null,
  floatTriggerOffset = null,
  floatSpringToPosition = null,
  floatAnimationDuration = null,
  floatAnimationEase = null,
  /*-Tilt-*/
  tilt = null,
  tiltAmount = null,
  tiltTriggerOffset = null,
  tiltAnimationDuration = null,
  tiltAnimationEase = null,
  /*-Glow-*/
  glow = null,
  glowProximityColor = null,
  glowHoverColor = null,
  glowProximityColorOpacity = null,
  glowHoverColorOpacity = null,
  glowProximityColorSize = null,
  glowHoverColorSize = null,
  glowTriggerOffset = null,
  glowAnimationDuration = null,
  glowAnimationEase = null,
}) => {
  // @ts-ignore
  const [globalProps, setGlobalProps] = useGlobalProps();
  // @ts-ignore
  const [globalCursorRef, setGlobalCursorRef] = useGlobalCursorRef();
  // @ts-ignore
  const [globalCursorInnerRef, setGlobalCursorInnerRef] = useGlobalCursorInnerRef();
  // @ts-ignore
  const [globalStickStatus, setGlobalStickStatus] = useGlobalStickStatus();
  // @ts-ignore
  const [rotateCursor, setRotateCursor] = useRotateCursor();

  /*----------------------------------*/
  useLayoutEffect(() => {
    /*---------------------------------------------------------------------------*/
    /* Magnetic */
    // @ts-ignore
    isMagnetic = isMagnetic?.toString();
    // @ts-ignore
    isSticky = isSticky?.toString();
    // @ts-ignore
    shapeShift = shapeShift?.toString();
    // @ts-ignore
    float = float?.toString();
    // @ts-ignore
    floatFollow = floatFollow?.toString();
    // @ts-ignore
    floatSpringToPosition = floatSpringToPosition?.toString();
    // @ts-ignore
    exclusion = exclusion?.toString();
    // @ts-ignore
    tilt = tilt?.toString();
    // @ts-ignore
    glow = glow?.toString();
    /*---------------------------------------------------------------------------*/
    /* Magnetic */
    if (isMagnetic) {
      // @ts-ignore
      for (let item of cursorStyle.current?.children) {
        if (item.className === 'p-c-s') {
          for (let recurItem of item.children) {
            if (recurItem.getAttribute('data-cursor-magnetic') === 'false') {
              recurItem.removeAttribute('data-cursor-magnetic');
            } else {
              recurItem.setAttribute('data-cursor-magnetic', `${isMagnetic}`);
            }
          }
        } else {
          // @ts-ignore
          item.setAttribute('data-cursor-magnetic', `${isMagnetic}`);
        }
      }
    }
    if (magneticAmount) {
      // @ts-ignore
      for (let item of cursorStyle.current?.children) {
        if (item.className === 'p-c-s') {
          for (let recurItem of item.children) {
            if (!recurItem.getAttribute('data-cursor-magnetic-amount')) {
              recurItem.setAttribute('data-cursor-magnetic-amount', `${magneticAmount}`);
            }
          }
        } else {
          // @ts-ignore
          item.setAttribute('data-cursor-magnetic-amount', `${magneticAmount}`);
        }
      }
    }
    if (magneticAnimationDuration) {
      // @ts-ignore
      for (let item of cursorStyle.current?.children) {
        if (item.className === 'p-c-s') {
          for (let recurItem of item.children) {
            if (!recurItem.getAttribute('data-cursor-magnetic-animation-duration')) {
              recurItem.setAttribute(
                'data-cursor-magnetic-animation-duration',
                `${magneticAnimationDuration}`
              );
            }
          }
        } else {
          // @ts-ignore
          item.setAttribute(
            'data-cursor-magnetic-animation-duration',
            `${magneticAnimationDuration}`
          );
        }
      }
    }
    if (magneticAnimationEase) {
      // @ts-ignore
      for (let item of cursorStyle.current?.children) {
        if (item.className === 'p-c-s') {
          for (let recurItem of item.children) {
            if (!recurItem.getAttribute('data-cursor-magnetic-animation-ease')) {
              recurItem.setAttribute(
                'data-cursor-magnetic-animation-ease',
                `${magneticAnimationEase}`
              );
            }
          }
        } else {
          // @ts-ignore
          item.setAttribute('data-cursor-magnetic-animation-ease', `${magneticAnimationEase}`);
        }
      }
    }
    /* Sticky */
    if (isSticky) {
      // @ts-ignore
      for (let item of cursorStyle.current?.children) {
        if (item.className === 'p-c-s') {
          for (let recurItem of item.children) {
            if (recurItem.getAttribute('data-cursor-stick') === 'false') {
              recurItem.removeAttribute('data-cursor-stick');
            } else {
              recurItem.setAttribute('data-cursor-stick', `${isSticky}`);
            }
          }
        } else {
          // @ts-ignore
          item.setAttribute('data-cursor-stick', `${isSticky}`);
        }
      }
    }
    if (stickAmount) {
      // @ts-ignore
      for (let item of cursorStyle.current?.children) {
        if (item.className === 'p-c-s') {
          for (let recurItem of item.children) {
            if (!recurItem.getAttribute('data-cursor-stick-amount')) {
              recurItem.setAttribute('data-cursor-stick-amount', `${stickAmount}`);
            }
          }
        } else {
          // @ts-ignore
          item.setAttribute('data-cursor-stick-amount', `${stickAmount}`);
        }
      }
    }
    if (stickAnimationEase) {
      // @ts-ignore
      for (let item of cursorStyle.current?.children) {
        if (item.className === 'p-c-s') {
          for (let recurItem of item.children) {
            if (!recurItem.getAttribute('data-cursor-stick-animation-ease')) {
              recurItem.setAttribute('data-cursor-stick-animation-ease', `${stickAnimationEase}`);
            }
          }
        } else {
          // @ts-ignore
          item.setAttribute('data-cursor-stick-animation-ease', `${stickAnimationEase}`);
        }
      }
    }
    /* Shapeshift */
    if (shapeShift) {
      // @ts-ignore
      for (let item of cursorStyle.current?.children) {
        if (item.className === 'p-c-s') {
          for (let recurItem of item.children) {
            if (recurItem.getAttribute('data-cursor-shapeshift') === 'false') {
              recurItem.removeAttribute('data-cursor-shapeshift');
            } else {
              recurItem.setAttribute('data-cursor-shapeshift', `${shapeShift}`);
            }
          }
        } else {
          // @ts-ignore
          item.setAttribute('data-cursor-shapeshift', `${shapeShift}`);
        }
      }
    }
    if (shapeShiftAnimationDuration) {
      // @ts-ignore
      for (let item of cursorStyle.current?.children) {
        if (item.className === 'p-c-s') {
          for (let recurItem of item.children) {
            if (!recurItem.getAttribute('data-cursor-shapeshift-animation-duration')) {
              recurItem.setAttribute(
                'data-cursor-shapeshift-animation-duration',
                `${shapeShiftAnimationDuration}`
              );
            }
          }
        } else {
          // @ts-ignore
          item.setAttribute(
            'data-cursor-shapeshift-animation-duration',
            `${shapeShiftAnimationDuration}`
          );
        }
      }
    }
    if (shapeShiftAnimationEase) {
      // @ts-ignore
      for (let item of cursorStyle.current?.children) {
        if (item.className === 'p-c-s') {
          for (let recurItem of item.children) {
            if (!recurItem.getAttribute('data-cursor-shapeshift-animation-ease')) {
              recurItem.setAttribute(
                'data-cursor-shapeshift-animation-ease',
                `${shapeShiftAnimationEase}`
              );
            }
          }
        } else {
          // @ts-ignore
          item.setAttribute('data-cursor-shapeshift-animation-ease', `${shapeShiftAnimationEase}`);
        }
      }
    }
    /* Cursor Style */
    if (cursorSize) {
      // @ts-ignore
      for (let item of cursorStyle.current?.children) {
        if (item.className === 'p-c-s') {
          for (let recurItem of item.children) {
            if (!recurItem.getAttribute('data-cursor-size')) {
              recurItem.setAttribute('data-cursor-size', `${cursorSize}`);
            }
          }
        } else {
          item.setAttribute('data-cursor-size', `${cursorSize}`);
        }
      }
    }
    if (sizeAnimationDuration) {
      // @ts-ignore
      for (let item of cursorStyle.current?.children) {
        if (item.className === 'p-c-s') {
          for (let recurItem of item.children) {
            if (!recurItem.getAttribute('data-cursor-size-animation-duration')) {
              recurItem.setAttribute(
                'data-cursor-size-animation-duration',
                `${sizeAnimationDuration}`
              );
            }
          }
        } else {
          item.setAttribute('data-cursor-size-animation-duration', `${sizeAnimationDuration}`);
        }
      }
    }
    if (sizeAnimationEase) {
      // @ts-ignore
      for (let item of cursorStyle.current?.children) {
        if (item.className === 'p-c-s') {
          for (let recurItem of item.children) {
            if (!recurItem.getAttribute('data-cursor-size-animation-ease')) {
              recurItem.setAttribute('data-cursor-size-animation-ease', `${sizeAnimationEase}`);
            }
          }
        } else {
          item.setAttribute('data-cursor-size-animation-ease', `${sizeAnimationEase}`);
        }
      }
    }
    if (cursorBorderRadius) {
      // @ts-ignore
      for (let item of cursorStyle.current?.children) {
        if (item.className === 'p-c-s') {
          for (let recurItem of item.children) {
            if (!recurItem.getAttribute('data-cursor-border-radius')) {
              recurItem.setAttribute('data-cursor-border-radius', `${cursorBorderRadius}`);
            }
          }
        } else {
          item.setAttribute('data-cursor-border-radius', `${cursorBorderRadius}`);
        }
      }
      // Ease & Duration : Shapeshift  Animation
    }
    if (cursorTransparency) {
      // @ts-ignore
      for (let item of cursorStyle.current?.children) {
        if (item.className === 'p-c-s') {
          for (let recurItem of item.children) {
            if (!recurItem.getAttribute('data-cursor-transparency')) {
              recurItem.setAttribute('data-cursor-transparency', `${cursorTransparency}`);
            }
          }
        } else {
          item.setAttribute('data-cursor-transparency', `${cursorTransparency}`);
        }
      }
      // Ease & Duration : Color Animation
    }
    /*Text*/
    if (cursorText) {
      // @ts-ignore
      for (let item of cursorStyle.current?.children) {
        if (item.className === 'p-c-s') {
          for (let recurItem of item.children) {
            if (!recurItem.getAttribute('data-cursor-text')) {
              recurItem.setAttribute('data-cursor-text', `${cursorText}`);
            }
          }
        } else {
          item.setAttribute('data-cursor-text', `${cursorText}`);
        }
      }
    }
    if (cursorTextScale) {
      // @ts-ignore
      for (let item of cursorStyle.current?.children) {
        if (item.className === 'p-c-s') {
          for (let recurItem of item.children) {
            if (!recurItem.getAttribute('data-cursor-text-scale')) {
              recurItem.setAttribute('data-cursor-text-scale', `${cursorTextScale}`);
            }
          }
        } else {
          item.setAttribute('data-cursor-text-scale', `${cursorTextScale}`);
        }
      }
    }
    if (cursorTextColor) {
      // @ts-ignore
      for (let item of cursorStyle.current?.children) {
        if (item.className === 'p-c-s') {
          for (let recurItem of item.children) {
            if (!recurItem.getAttribute('data-cursor-text-color')) {
              recurItem.setAttribute('data-cursor-text-color', `${cursorTextColor}`);
            }
          }
        } else {
          item.setAttribute('data-cursor-text-color', `${cursorTextColor}`);
        }
      }
    }
    if (cursorTextOpacity) {
      // @ts-ignore
      for (let item of cursorStyle.current?.children) {
        if (item.className === 'p-c-s') {
          for (let recurItem of item.children) {
            if (!recurItem.getAttribute('data-cursor-text-opacity')) {
              recurItem.setAttribute('data-cursor-text-opacity', `${cursorTextOpacity}`);
            }
          }
        } else {
          item.setAttribute('data-cursor-text-opacity', `${cursorTextOpacity}`);
        }
      }
    }
    if (textAnimationDuration) {
      // @ts-ignore
      for (let item of cursorStyle.current?.children) {
        if (item.className === 'p-c-s') {
          for (let recurItem of item.children) {
            if (!recurItem.getAttribute('data-cursor-text-animation-duration')) {
              recurItem.setAttribute(
                'data-cursor-text-animation-duration',
                `${textAnimationDuration}`
              );
            }
          }
        } else {
          item.setAttribute('data-cursor-text-animation-duration', `${textAnimationDuration}`);
        }
      }
    }
    if (textAnimationEase) {
      // @ts-ignore
      for (let item of cursorStyle.current?.children) {
        if (item.className === 'p-c-s') {
          for (let recurItem of item.children) {
            if (!recurItem.getAttribute('data-cursor-text-animation-ease')) {
              recurItem.setAttribute('data-cursor-text-animation-ease', `${textAnimationEase}`);
            }
          }
        } else {
          item.setAttribute('data-cursor-text-animation-ease', `${textAnimationEase}`);
        }
      }
    }
    /*Float*/
    if (float) {
      // @ts-ignore
      for (let item of cursorStyle.current?.children) {
        if (item.className === 'p-c-s') {
          for (let recurItem of item.children) {
            if (recurItem.getAttribute('data-cursor-float') === 'false') {
              recurItem.removeAttribute('data-cursor-float');
            } else {
              recurItem.setAttribute('data-cursor-float', `${float}`);
            }
          }
        } else {
          item.setAttribute('data-cursor-float', `${float}`);
        }
      }
      if (floatAmount) {
        // @ts-ignore
        for (let item of cursorStyle.current?.children) {
          if (item.className === 'p-c-s') {
            for (let recurItem of item.children) {
              if (!recurItem.getAttribute('data-cursor-float-amount')) {
                recurItem.setAttribute('data-cursor-float-amount', `${floatAmount}`);
              }
            }
          } else {
            item.setAttribute('data-cursor-float-amount', `${floatAmount}`);
          }
        }
      }
      if (floatFollow) {
        // @ts-ignore
        for (let item of cursorStyle.current?.children) {
          if (item.className === 'p-c-s') {
            for (let recurItem of item.children) {
              if (recurItem.getAttribute('data-cursor-float-follow') === 'false') {
                recurItem.removeAttribute('data-cursor-float-follow');
              } else {
                recurItem.setAttribute('data-cursor-float-follow', `${floatFollow}`);
              }
            }
          } else {
            item.setAttribute('data-cursor-float-follow', `${floatFollow}`);
          }
        }
      }
      if (floatTriggerOffset) {
        // @ts-ignore
        for (let item of cursorStyle.current?.children) {
          if (item.className === 'p-c-s') {
            for (let recurItem of item.children) {
              if (!recurItem.getAttribute('data-cursor-float-trigger-offset')) {
                recurItem.setAttribute('data-cursor-float-trigger-offset', `${floatTriggerOffset}`);
              }
            }
          } else {
            item.setAttribute('data-cursor-float-trigger-offset', `${floatTriggerOffset}`);
          }
        }
      }
      if (floatSpringToPosition) {
        // @ts-ignore
        for (let item of cursorStyle.current?.children) {
          if (item.className === 'p-c-s') {
            for (let recurItem of item.children) {
              if (recurItem.getAttribute('data-cursor-float-spring-to-position') === 'false') {
                recurItem.removeAttribute('data-cursor-float-spring-to-position');
              } else {
                recurItem.setAttribute(
                  'data-cursor-float-spring-to-position',
                  `${floatSpringToPosition}`
                );
              }
            }
          } else {
            item.setAttribute('data-cursor-float-spring-to-position', `${floatSpringToPosition}`);
          }
        }
      }
      if (floatAnimationDuration) {
        // @ts-ignore
        for (let item of cursorStyle.current?.children) {
          if (item.className === 'p-c-s') {
            for (let recurItem of item.children) {
              if (!recurItem.getAttribute('data-cursor-float-animation-duration')) {
                recurItem.setAttribute(
                  'data-cursor-float-animation-duration',
                  `${floatAnimationDuration}`
                );
              }
            }
          } else {
            item.setAttribute('data-cursor-float-animation-duration', `${floatAnimationDuration}`);
          }
        }
      }
      if (floatAnimationEase) {
        // @ts-ignore
        for (let item of cursorStyle.current?.children) {
          if (item.className === 'p-c-s') {
            for (let recurItem of item.children) {
              if (!recurItem.getAttribute('data-cursor-float-animation-ease')) {
                recurItem.setAttribute('data-cursor-float-animation-ease', `${floatAnimationEase}`);
              }
            }
          } else {
            item.setAttribute('data-cursor-float-animation-ease', `${floatAnimationEase}`);
          }
        }
      }
    }
    /*Color& Background & Outline*/
    if (cursorBackgroundColor) {
      // @ts-ignore
      for (let item of cursorStyle.current?.children) {
        if (item.className === 'p-c-s') {
          for (let recurItem of item.children) {
            if (!recurItem.getAttribute('data-cursor-background-color')) {
              recurItem.setAttribute('data-cursor-background-color', `${cursorBackgroundColor}`);
            }
          }
        } else {
          item.setAttribute('data-cursor-background-color', `${cursorBackgroundColor}`);
        }
      }
    }
    if (cursorOutlineColor) {
      // @ts-ignore
      for (let item of cursorStyle.current?.children) {
        if (item.className === 'p-c-s') {
          for (let recurItem of item.children) {
            if (!recurItem.getAttribute('data-cursor-outline-color')) {
              recurItem.setAttribute('data-cursor-outline-color', `${cursorOutlineColor}`);
            }
          }
        } else {
          item.setAttribute('data-cursor-outline-color', `${cursorOutlineColor}`);
        }
      }
    }
    if (cursorOutlineWidth) {
      // @ts-ignore
      for (let item of cursorStyle.current?.children) {
        if (item.className === 'p-c-s') {
          for (let recurItem of item.children) {
            if (!recurItem.getAttribute('data-cursor-outline-width')) {
              recurItem.setAttribute('data-cursor-outline-width', `${cursorOutlineWidth}`);
            }
          }
        } else {
          item.setAttribute('data-cursor-outline-width', `${cursorOutlineWidth}`);
        }
      }
    }
    if (colorAnimationDuration) {
      // @ts-ignore
      for (let item of cursorStyle.current?.children) {
        if (item.className === 'p-c-s') {
          for (let recurItem of item.children) {
            if (!recurItem.getAttribute('data-cursor-color-animation-duration')) {
              recurItem.setAttribute(
                'data-cursor-color-animation-duration',
                `${colorAnimationDuration}`
              );
            }
          }
        } else {
          item.setAttribute('data-cursor-color-animation-duration', `${colorAnimationDuration}`);
        }
      }
    }
    if (colorAnimationEase) {
      // @ts-ignore
      for (let item of cursorStyle.current?.children) {
        if (item.className === 'p-c-s') {
          for (let recurItem of item.children) {
            if (!recurItem.getAttribute('data-cursor-color-animation-ease')) {
              recurItem.setAttribute('data-cursor-color-animation-ease', `${colorAnimationEase}`);
            }
          }
        } else {
          item.setAttribute('data-cursor-color-animation-ease', `${colorAnimationEase}`);
        }
      }
    }
    /*Background Image*/
    if (cursorBackgroundImage) {
      // @ts-ignore
      for (let item of cursorStyle.current?.children) {
        if (item.className === 'p-c-s') {
          for (let recurItem of item.children) {
            if (!recurItem.getAttribute('data-cursor-background-image')) {
              recurItem.setAttribute('data-cursor-background-image', `${cursorBackgroundImage}`);
            }
          }
        } else {
          item.setAttribute('data-cursor-background-image', `${cursorBackgroundImage}`);
        }
      }
    }
    if (cursorBackgroundImageScale) {
      // @ts-ignore
      for (let item of cursorStyle.current?.children) {
        if (item.className === 'p-c-s') {
          for (let recurItem of item.children) {
            if (!recurItem.getAttribute('data-cursor-background-image-scale')) {
              recurItem.setAttribute(
                'data-cursor-background-image-scale',
                `${cursorBackgroundImageScale}`
              );
            }
          }
        } else {
          item.setAttribute('data-cursor-background-image-scale', `${cursorBackgroundImageScale}`);
        }
      }
    }
    if (backgroundImageAnimationDuration) {
      // @ts-ignore
      for (let item of cursorStyle.current?.children) {
        if (item.className === 'p-c-s') {
          for (let recurItem of item.children) {
            if (!recurItem.getAttribute('data-cursor-background-image-animation-duration')) {
              recurItem.setAttribute(
                'data-cursor-background-image-animation-duration',
                `${backgroundImageAnimationDuration}`
              );
            }
          }
        } else {
          item.setAttribute(
            'data-cursor-background-image-animation-duration',
            `${backgroundImageAnimationDuration}`
          );
        }
      }
    }
    if (backgroundImageAnimationEase) {
      // @ts-ignore
      for (let item of cursorStyle.current?.children) {
        if (item.className === 'p-c-s') {
          for (let recurItem of item.children) {
            if (!recurItem.getAttribute('data-cursor-background-image-animation-ease')) {
              recurItem.setAttribute(
                'data-cursor-background-image-animation-ease',
                `${backgroundImageAnimationEase}`
              );
            }
          }
        } else {
          item.setAttribute(
            'data-cursor-background-image-animation-ease',
            `${backgroundImageAnimationEase}`
          );
        }
      }
    }
    /*Tilt*/
    if (tilt) {
      // @ts-ignore
      for (let item of cursorStyle.current?.children) {
        if (item.className === 'p-c-s') {
          for (let recurItem of item.children) {
            if (recurItem.getAttribute('data-cursor-tilt') === 'false') {
              recurItem.removeAttribute('data-cursor-tilt');
            } else {
              recurItem.setAttribute('data-cursor-tilt', `${tilt}`);
            }
          }
        } else {
          item.setAttribute('data-cursor-tilt', `${tilt}`);
        }
      }
    }
    if (tiltAmount) {
      // @ts-ignore
      for (let item of cursorStyle.current?.children) {
        if (item.className === 'p-c-s') {
          for (let recurItem of item.children) {
            if (!recurItem.getAttribute('data-cursor-tilt-amount')) {
              recurItem.setAttribute('data-cursor-tilt-amount', `${tiltAmount}`);
            }
          }
        } else {
          item.setAttribute('data-cursor-tilt-amount', `${tiltAmount}`);
        }
      }
    }
    if (tiltTriggerOffset) {
      // @ts-ignore
      for (let item of cursorStyle.current?.children) {
        if (item.className === 'p-c-s') {
          for (let recurItem of item.children) {
            if (!recurItem.getAttribute('data-cursor-tilt-trigger-offset')) {
              recurItem.setAttribute('data-cursor-tilt-trigger-offset', `${tiltTriggerOffset}`);
            }
          }
        } else {
          item.setAttribute('data-cursor-tilt-trigger-offset', `${tiltTriggerOffset}`);
        }
      }
    }
    if (tiltAnimationDuration) {
      // @ts-ignore
      for (let item of cursorStyle.current?.children) {
        if (item.className === 'p-c-s') {
          for (let recurItem of item.children) {
            if (!recurItem.getAttribute('data-cursor-tilt-animation-duration')) {
              recurItem.setAttribute(
                'data-cursor-tilt-animation-duration',
                `${tiltAnimationDuration}`
              );
            }
          }
        } else {
          item.setAttribute('data-cursor-tilt-animation-duration', `${tiltAnimationDuration}`);
        }
      }
    }
    if (tiltAnimationEase) {
      // @ts-ignore
      for (let item of cursorStyle.current?.children) {
        if (item.className === 'p-c-s') {
          for (let recurItem of item.children) {
            if (!recurItem.getAttribute('data-cursor-tilt-animation-ease')) {
              recurItem.setAttribute('data-cursor-tilt-animation-ease', `${tiltAnimationEase}`);
            }
          }
        } else {
          item.setAttribute('data-cursor-tilt-animation-ease', `${tiltAnimationEase}`);
        }
      }
    }
    /*Exclusion*/
    if (exclusion) {
      // @ts-ignore
      for (let item of cursorStyle.current?.children) {
        if (item.className === 'p-c-s') {
          for (let recurItem of item.children) {
            if (recurItem.getAttribute('data-cursor-exclusion') === 'false') {
              recurItem.removeAttribute('data-cursor-exclusion');
            } else {
              recurItem.setAttribute('data-cursor-exclusion', `${exclusion}`);
            }
          }
        } else {
          item.setAttribute('data-cursor-exclusion', `${exclusion}`);
        }
      }
    }
    if (exclusionBackgroundColor) {
      // @ts-ignore
      for (let item of cursorStyle.current?.children) {
        if (item.className === 'p-c-s') {
          for (let recurItem of item.children) {
            if (!recurItem.getAttribute('data-cursor-exclusion-background-color')) {
              recurItem.setAttribute(
                'data-cursor-exclusion-background-color',
                `${exclusionBackgroundColor}`
              );
            }
          }
        } else {
          item.setAttribute(
            'data-cursor-exclusion-background-color',
            `${exclusionBackgroundColor}`
          );
        }
      }
    }
    /* Glow */
    if (glow) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      glow === 'true' ? cursorStyle.current?.setAttribute('data-cursor-glow', `${glow}`) : null;
      // @ts-ignore
      for (let item of cursorStyle.current?.children) {
        if (item.className === 'p-c-s') {
          for (let recurItem of item.children) {
            if (recurItem.getAttribute('data-cursor-glow-element') === 'false') {
              recurItem.removeAttribute('data-cursor-glow-element');
            } else {
              if (!recurItem.getAttribute('data-cursor-glow-element')) {
                recurItem.setAttribute('data-cursor-glow-element', `${glow}`);
              }
            }
          }
        } else {
          item.setAttribute('data-cursor-glow-element', `${glow}`);
        }
      }
    }
    if (glowProximityColor) {
      // @ts-ignore
      for (let item of cursorStyle.current?.children) {
        if (item.className === 'p-c-s') {
          for (let recurItem of item.children) {
            if (!recurItem.getAttribute('data-cursor-glow-proximity-color')) {
              recurItem.setAttribute('data-cursor-glow-proximity-color', `${glowProximityColor}`);
            }
          }
        } else {
          item.setAttribute('data-cursor-glow-proximity-color', `${glowProximityColor}`);
        }
      }
    }
    if (glowHoverColor) {
      // @ts-ignore
      for (let item of cursorStyle.current?.children) {
        if (item.className === 'p-c-s') {
          for (let recurItem of item.children) {
            if (!recurItem.getAttribute('data-cursor-glow-hover-color')) {
              recurItem.setAttribute('data-cursor-glow-hover-color', `${glowHoverColor}`);
            }
          }
        } else {
          item.setAttribute('data-cursor-glow-hover-color', `${glowHoverColor}`);
        }
      }
    }
    if (glowProximityColorOpacity) {
      // @ts-ignore
      for (let item of cursorStyle.current?.children) {
        if (item.className === 'p-c-s') {
          for (let recurItem of item.children) {
            if (!recurItem.getAttribute('data-cursor-glow-proximity-color-opacity')) {
              recurItem.setAttribute(
                'data-cursor-glow-proximity-color-opacity',
                `${glowProximityColorOpacity}`
              );
            }
          }
        } else {
          item.setAttribute(
            'data-cursor-glow-proximity-color-opacity',
            `${glowProximityColorOpacity}`
          );
        }
      }
    }
    if (glowHoverColorOpacity) {
      // @ts-ignore
      for (let item of cursorStyle.current?.children) {
        if (item.className === 'p-c-s') {
          for (let recurItem of item.children) {
            if (!recurItem.getAttribute('data-cursor-glow-hover-color-opacity')) {
              recurItem.setAttribute(
                'data-cursor-glow-hover-color-opacity',
                `${glowHoverColorOpacity}`
              );
            }
          }
        } else {
          item.setAttribute('data-cursor-glow-hover-color-opacity', `${glowHoverColorOpacity}`);
        }
      }
    }
    if (glowProximityColorSize) {
      // @ts-ignore
      for (let item of cursorStyle.current?.children) {
        if (item.className === 'p-c-s') {
          for (let recurItem of item.children) {
            if (!recurItem.getAttribute('data-cursor-glow-proximity-color-size')) {
              recurItem.setAttribute(
                'data-cursor-glow-proximity-color-size',
                `${glowProximityColorSize}`
              );
            }
          }
        } else {
          item.setAttribute('data-cursor-glow-proximity-color-size', `${glowProximityColorSize}`);
        }
      }
    }
    if (glowHoverColorSize) {
      // @ts-ignore
      for (let item of cursorStyle.current?.children) {
        if (item.className === 'p-c-s') {
          for (let recurItem of item.children) {
            if (!recurItem.getAttribute('data-cursor-glow-hover-color-size')) {
              recurItem.setAttribute('data-cursor-glow-hover-color-size', `${glowHoverColorSize}`);
            }
          }
        } else {
          item.setAttribute('data-cursor-glow-hover-color-size', `${glowHoverColorSize}`);
        }
      }
    }
    if (glowTriggerOffset) {
      // @ts-ignore
      for (let item of cursorStyle.current?.children) {
        if (item.className === 'p-c-s') {
          for (let recurItem of item.children) {
            if (!recurItem.getAttribute('data-cursor-glow-trigger-offset')) {
              recurItem.setAttribute('data-cursor-glow-trigger-offset', `${glowTriggerOffset}`);
            }
          }
        } else {
          item.setAttribute('data-cursor-glow-trigger-offset', `${glowTriggerOffset}`);
        }
      }
    }
    if (glowAnimationDuration) {
      // @ts-ignore
      for (let item of cursorStyle.current?.children) {
        if (item.className === 'p-c-s') {
          for (let recurItem of item.children) {
            if (!recurItem.getAttribute('data-cursor-glow-animation-duration')) {
              recurItem.setAttribute(
                'data-cursor-glow-animation-duration',
                `${glowAnimationDuration}`
              );
            }
          }
        } else {
          item.setAttribute('data-cursor-glow-animation-duration', `${glowAnimationDuration}`);
        }
      }
    }
    if (glowAnimationEase) {
      // @ts-ignore
      for (let item of cursorStyle.current?.children) {
        if (item.className === 'p-c-s') {
          for (let recurItem of item.children) {
            if (!recurItem.getAttribute('data-cursor-glow-animation-ease')) {
              recurItem.setAttribute('data-cursor-glow-animation-ease', `${glowAnimationEase}`);
            }
          }
        } else {
          item.setAttribute('data-cursor-glow-animation-ease', `${glowAnimationEase}`);
        }
      }
    }
    /*---------------------------------------------------------------------------*/
    const sizeElements = document.querySelectorAll(
      '[data-cursor-size]'
    ) as unknown as NodeListOf<HTMLElement>;
    const textElements = document.querySelectorAll(
      '[data-cursor-text]'
    ) as unknown as NodeListOf<HTMLElement>;
    const backgroundColorElements = document.querySelectorAll(
      '[data-cursor-background-color]'
    ) as unknown as NodeListOf<HTMLElement>;
    const cursorTransparencyElements = document.querySelectorAll(
      '[data-cursor-transparency]'
    ) as unknown as NodeListOf<HTMLElement>;
    const outlineColorElements = document.querySelectorAll(
      '[data-cursor-outline-color]'
    ) as unknown as NodeListOf<HTMLElement>;
    const outlineWidthElements = document.querySelectorAll(
      '[data-cursor-outline-width]'
    ) as unknown as NodeListOf<HTMLElement>;
    const backgroundImageElements = document.querySelectorAll(
      '[data-cursor-background-image]'
    ) as unknown as NodeListOf<HTMLElement>;
    const magneticElements = document.querySelectorAll(
      '[data-cursor-magnetic="true"]'
    ) as unknown as NodeListOf<HTMLElement>;

    const stickElements = document.querySelectorAll(
      '[data-cursor-stick="true"]'
    ) as unknown as NodeListOf<HTMLElement>;
    const exclusionElements = document.querySelectorAll(
      '[data-cursor-exclusion="true"]'
    ) as unknown as NodeListOf<HTMLElement>;
    const floatingElements = document.querySelectorAll(
      '[data-cursor-float="true"]'
    ) as unknown as NodeListOf<HTMLElement>;
    const shapeShiftElements = document.querySelectorAll(
      '[data-cursor-shapeshift="true"]'
    ) as unknown as NodeListOf<HTMLElement>;
    const cursorBorderRadiusElements = document.querySelectorAll(
      '[data-cursor-border-radius]'
    ) as unknown as NodeListOf<HTMLElement>;
    const tiltElements = document.querySelectorAll(
      '[data-cursor-tilt="true"]'
    ) as unknown as NodeListOf<HTMLElement>;
    const glowElements = document.querySelectorAll(
      '[data-cursor-glow="true"]'
    ) as unknown as NodeListOf<HTMLElement>;
    //---------------------------------------------------------------------------------------------------[START OF ELEMENTS]--//
    if (!isMobile || !globalProps.disableOnMobile) {
      //---- [ Size Elements ]------------------------------------------------------------------------//
      sizeElements.forEach((el) => {
        // @ts-ignore
        let calculatedSizeAnimationDuration = el.dataset['cursorSizeAnimationDuration']
          ? el.dataset['cursorSizeAnimationDuration']
          : globalProps.sizeAnimationDuration;
        // @ts-ignore
        let calculatedSizeAnimationEase = el.dataset['cursorSizeAnimationEase']
          ? el.dataset['cursorSizeAnimationEase']
          : globalProps.sizeAnimationEase;
        /*--------------------------------------------------------------------*/
        el.addEventListener('mouseenter', (e: MouseEvent) => {
          if (e.target instanceof HTMLElement && globalCursorRef) {
            gsap.to(`#${globalCursorRef.id}`, {
              width: `${e.target.dataset['cursorSize']}`,
              height: `${e.target.dataset['cursorSize']}`,
              duration: calculatedSizeAnimationDuration,
              ease: calculatedSizeAnimationEase,
            });
          }
        });
        /*--------------------------------------------------------------------*/
        el.addEventListener('mouseleave', (e: MouseEvent) => {
          if (e.target instanceof HTMLElement && globalCursorRef) {
            gsap.to(`#${globalCursorRef.id}`, {
              width: `${globalProps.cursorSize}`,
              height: `${globalProps.cursorSize}`,
              duration: calculatedSizeAnimationDuration,
              ease: calculatedSizeAnimationEase,
            });
          }
        });
        /*--------------------------------------------------------------------*/
      });
      // //---- [ Text Elements ]------------------------------------------------------------------------//
      textElements.forEach((el) => {
        // @ts-ignore
        let calculatedTextAnimationDuration = el.dataset['cursorTextAnimationDuration']
          ? el.dataset['cursorTextAnimationDuration']
          : globalProps.textAnimationDuration;
        // @ts-ignore
        let calculatedTextAnimationEase = el.dataset['cursorTextAnimationEase']
          ? el.dataset['cursorTextAnimationEase']
          : globalProps.textAnimationEase;
        let calculatedText = el.dataset['cursorText'] ? el.dataset['cursorText'] : cursorText;
        /*--------------------------------------------------------------------*/
        el.addEventListener('mouseenter', (e: MouseEvent) => {
          if (e.target instanceof HTMLElement && globalCursorInnerRef) {
            /*-------------------------------------------------------------------------------*/
            // @ts-ignore
            let calculatedTextColor = cursorTextColor ? el.dataset['cursorTextColor'] : null;
            // @ts-ignore
            let calculatedTextScale = cursorTextScale ? el.dataset['cursorTextScale'] : 1;
            // @ts-ignore
            let calculatedTextOpacity = cursorTextOpacity ? el.dataset['cursorTextOpacity'] : 1;
            globalCursorInnerRef.textContent = `${calculatedText}`;
            /*-------------------------------------------------------------------------------*/
            gsap.to(`#${globalCursorInnerRef.id}`, {
              color: calculatedTextColor ? calculatedTextColor : 'inherit',
              scale: calculatedTextScale,
              opacity: calculatedTextOpacity,
              duration: calculatedTextAnimationDuration,
              ease: calculatedTextAnimationEase,
            });
          }
        });
        /*--------------------------------------------------------------------*/
        el.addEventListener('mouseleave', (e: MouseEvent) => {
          if (e.target instanceof HTMLElement && globalCursorInnerRef) {
            globalCursorInnerRef.textContent = '';
            gsap.to(`#${globalCursorInnerRef.id}`, {
              scale: 0,
              opacity: 0,
              duration: calculatedTextAnimationDuration,
              ease: calculatedTextAnimationEase,
            });
          }
        });
        /*--------------------------------------------------------------------*/
      });
      // //---- [ Cursor Transparency Elements ]------------------------------------------------------------------------//
      cursorTransparencyElements.forEach((el) => {
        let calculatedColorAnimationDuration = el.dataset['cursorColorAnimationDuration']
          ? el.dataset['cursorColorAnimationDuration']
          : globalProps.colorAnimationDuration;
        let calculatedColorAnimationEase = el.dataset['cursorColorAnimationEase']
          ? el.dataset['cursorColorAnimationEase']
          : globalProps.colorAnimationEase;
        el.addEventListener('mouseenter', (e: MouseEvent) => {
          if (e.target instanceof HTMLElement && globalCursorRef) {
            gsap.to(`#${globalCursorRef.id}`, {
              filter: `opacity(${e.target.dataset['cursorTransparency']})`,
              duration: calculatedColorAnimationDuration,
              ease: calculatedColorAnimationEase,
            });
          }
        });
        el.addEventListener('mouseleave', (e: MouseEvent) => {
          if (e.target instanceof HTMLElement && globalCursorRef) {
            gsap.to(`#${globalCursorRef.id}`, {
              filter: `opacity(${globalProps.cursorTransparency})`,
              duration: calculatedColorAnimationDuration,
              ease: calculatedColorAnimationEase,
            });
          }
        });
      });
      // //---- [ Outline ]--------------------------------------------------------------------------------------------------------------------------------------------------//
      //---- [ Outline Color Elements ]------------------------------------------------------------------------//
      outlineColorElements.forEach((el) => {
        let calculatedColorAnimationDuration = el.dataset['cursorColorAnimationDuration']
          ? el.dataset['cursorColorAnimationDuration']
          : globalProps.colorAnimationDuration;
        let calculatedColorAnimationEase = el.dataset['cursorColorAnimationEase']
          ? el.dataset['cursorColorAnimationEase']
          : globalProps.colorAnimationEase;
        el.addEventListener('mouseenter', (e: MouseEvent) => {
          if (e.target instanceof HTMLElement && globalCursorRef) {
            let calculatedOutlineColor = e.target.dataset['cursorOutlineColor']
              ? e.target.dataset['cursorOutlineColor']
              : cursorOutlineColor;
            gsap.to(`#${globalCursorRef.id}`, {
              outlineColor: `${calculatedOutlineColor}`,
              duration: calculatedColorAnimationDuration,
              ease: calculatedColorAnimationEase,
            });
          }
        });
        el.addEventListener('mouseleave', (e: MouseEvent) => {
          if (e.target instanceof HTMLElement && globalCursorRef) {
            gsap.to(`#${globalCursorRef.id}`, {
              outlineColor: `${globalProps.cursorOutlineColor}`,
              duration: calculatedColorAnimationDuration,
              ease: calculatedColorAnimationEase,
            });
          }
        });
      });
      //---- [ Outline Size Elements ]------------------------------------------------------------------------//
      outlineWidthElements.forEach((el) => {
        let calculatedColorAnimationDuration = el.dataset['cursorColorAnimationDuration']
          ? el.dataset['cursorColorAnimationDuration']
          : globalProps.colorAnimationDuration;
        let calculatedColorAnimationEase = el.dataset['cursorColorAnimationEase']
          ? el.dataset['cursorColorAnimationEase']
          : globalProps.colorAnimationEase;
        el.addEventListener('mouseenter', (e: MouseEvent) => {
          if (e.target instanceof HTMLElement && globalCursorRef) {
            let calculatedOutlineWidth = e.target.dataset['cursorOutlineWidth']
              ? e.target.dataset['cursorOutlineWidth']
              : globalProps.cursorOutlineWidth;
            gsap.to(`#${globalCursorRef.id}`, {
              outlineWidth: `${calculatedOutlineWidth}`,
              duration: calculatedColorAnimationDuration,
              ease: calculatedColorAnimationEase,
            });
          }
        });
        el.addEventListener('mouseleave', (e: MouseEvent) => {
          if (e.target instanceof HTMLElement && globalCursorRef) {
            gsap.to(`#${globalCursorRef.id}`, {
              outlineWidth: `${globalProps.cursorOutlineWidth}`,
              duration: calculatedColorAnimationDuration,
              ease: calculatedColorAnimationEase,
            });
          }
        });
      });
      //---- [ END Outline ]------------------------------------------------------------------------------------------------------------------------------------------------//
      //---- [ Background Color Elements ]------------------------------------------------------------------------//
      backgroundColorElements.forEach((el) => {
        let calculatedColorAnimationDuration = el.dataset['cursorColorAnimationDuration']
          ? el.dataset['cursorColorAnimationDuration']
          : globalProps.colorAnimationDuration;
        let calculatedColorAnimationEase = el.dataset['cursorColorAnimationEase']
          ? el.dataset['cursorColorAnimationEase']
          : globalProps.colorAnimationEase;
        el.addEventListener('mouseenter', (e: MouseEvent) => {
          if (e.target instanceof HTMLElement && globalCursorRef) {
            gsap.to(`#${globalCursorRef.id}`, {
              backgroundColor: `${e.target.dataset['cursorBackgroundColor']}`,
              duration: calculatedColorAnimationDuration,
              ease: calculatedColorAnimationEase,
            });
          }
        });
        el.addEventListener('mouseleave', (e: MouseEvent) => {
          if (e.target instanceof HTMLElement && globalCursorRef) {
            gsap.to(`#${globalCursorRef.id}`, {
              backgroundColor: `${globalProps.cursorBackgroundColor}`,
              duration: calculatedColorAnimationDuration,
              ease: calculatedColorAnimationEase,
            });
          }
        });
      });
      //---- [ Exclusion Elements ]------------------------------------------------------------------------//
      exclusionElements.forEach((el) => {
        el.addEventListener('mouseenter', (e: MouseEvent) => {
          if (e.target instanceof HTMLElement && globalCursorRef) {
            let calcualtedExclusionBackgroundColor = e.target.dataset[
              'cursorExclusionBackgroundColor'
            ]
              ? e.target.dataset['cursorExclusionBackgroundColor']
              : globalProps.exclusionBackgroundColor;
            // @ts-ignore: Unreachable code error
            globalCursorRef.style.mixBlendMode = 'exclusion';
            globalCursorRef.style.background = `${calcualtedExclusionBackgroundColor}`;
          }
        });
        el.addEventListener('mouseleave', (e: MouseEvent) => {
          if (e.target instanceof HTMLElement && globalCursorRef) {
            // @ts-ignore: Unreachable code error
            globalCursorRef.style.mixBlendMode = '';
            globalCursorRef.style.background = `${globalProps.cursorBackgroundColor}`;
          }
        });
      });
      //---- [ Background Image Elements ]------------------------------------------------------------------------//
      backgroundImageElements.forEach((el) => {
        let calculatedBackgroundImageAnimationDuration = el.dataset[
          'cursorBackgroundImageAnimationDuration'
        ]
          ? el.dataset['cursorBackgroundImageAnimationDuration']
          : globalProps.backgroundImageAnimationDuration;
        let calculatedBackgroundImageAnimationEase = el.dataset[
          'cursorBackgroundImageAnimationEase'
        ]
          ? el.dataset['cursorBackgroundImageAnimationEase']
          : globalProps.backgroundImageAnimationEase;
        el.addEventListener('mouseenter', (e: MouseEvent) => {
          if (e.target instanceof HTMLElement && globalCursorRef) {
            // @ts-ignore
            let calculatedBackgroundScale = e.target.dataset['cursorBackgroundImageScale']
              ? // @ts-ignore
                1 * e.target.dataset['cursorBackgroundImageScale']
              : 1;
            let calculatedBorderRadius = e.target.dataset['cursorBorderRadius']
              ? e.target.dataset['cursorBorderRadius']
              : globalProps.cursorBorderRadius;
            // rotateCursor = false;
            gsap.to(`#${globalCursorInnerRef.id}`, {
              scale: calculatedBackgroundScale,
              borderRadius: calculatedBorderRadius,
              background: `url("${e.target.dataset['cursorBackgroundImage']}")`,
              opacity: 1,
              duration: calculatedBackgroundImageAnimationDuration,
              ease: calculatedBackgroundImageAnimationEase,
            });
          }
        });
        el.addEventListener('mouseleave', (e: MouseEvent) => {
          if (e.target instanceof HTMLElement && globalCursorInnerRef) {
            // rotateCursor = true;
            if (globalCursorRef) {
              // @ts-ignore: Unreachable code error
              globalCursorRef.style.mixBlendMode = '';
              globalCursorRef.style.zIndex = '999999999';
              globalCursorRef.style.backgroundColor = `${globalProps.cursorBackgroundColor}`;
            }
            gsap.to(`#${globalCursorInnerRef.id}`, {
              scale: 0,
              opacity: 0,
              background: ``,
              duration: calculatedBackgroundImageAnimationDuration,
              ease: calculatedBackgroundImageAnimationEase,
            });
          }
        });
      });
      //---- [ Border Radius Elements ]------------------------------------------------------------------------//
      cursorBorderRadiusElements.forEach((el) => {
        let calculatedShapeShiftDuration = el.dataset['cursorShapeShiftDuration']
          ? el.dataset['cursorShapeShiftDuration']
          : globalProps.shapeShiftAnimationDuration;
        let calculatedShapeShiftEase = el.dataset['cursorShapeShiftEase']
          ? el.dataset['cursorShapeShiftEase']
          : globalProps.shapeShiftAnimationEase;
        el.addEventListener('mouseenter', (e: MouseEvent) => {
          if (e.target instanceof HTMLElement && globalCursorRef) {
            let calculatedBorderRadius;
            if (e.target.dataset.cursorBorderRadius) {
              calculatedBorderRadius = e.target.dataset.cursorBorderRadius;
            } else {
              calculatedBorderRadius = globalProps.cursorBorderRadius;
            }
            gsap.to(`#${globalCursorRef.id}`, {
              borderRadius: calculatedBorderRadius,
              duration: calculatedShapeShiftDuration,
              ease: calculatedShapeShiftEase,
            });
          }
        });
        el.addEventListener('mouseleave', (e: MouseEvent) => {
          if (e.target instanceof HTMLElement && globalCursorRef) {
            gsap.to(`#${globalCursorRef.id}`, {
              borderRadius: `${globalProps.cursorBorderRadius}`,
              duration: calculatedShapeShiftDuration,
              ease: calculatedShapeShiftEase,
            });
          }
        });
      });
      //---- [ Floating Elements ]------------------------------------------------------------------------//
      floatingElements.forEach((el) => {
        document.addEventListener('mousemove', (e: MouseEvent) => {
          /*-------------------------------------------------------------------------*/
          let calculatedFloatSpringToPosition = el.dataset['cursorFloatSpringToPosition']
            ? el.dataset['cursorFloatSpringToPosition']
            : globalProps.floatSpringToPosition;
          let calculatedFloatAmount = el.dataset['cursorFloatAmount']
            ? el.dataset['cursorFloatAmount']
            : globalProps.floatAmount;
          let calculatedFloatDuration = el.dataset['cursorFloatAnimationDuration']
            ? el.dataset['cursorFloatAnimationDuration']
            : globalProps.floatAnimationDuration;
          let calculatedFloatFollow = el.dataset['cursorFloatFollow']
            ? el.dataset['cursorFloatFollow']
            : globalProps.floatFollow;
          // @ts-ignore
          let triggerDistanceOffset = el.dataset['cursorFloatTriggerOffset']
            ? // @ts-ignore
              el.dataset['cursorFloatTriggerOffset'] * 1
            : null;
          let calculatedFloatEase = el.dataset['cursorFloatAnimationEase']
            ? el.dataset['cursorFloatAnimationEase']
            : globalProps.floatAnimationEase;
          /*-------------------------------------------------------------------------*/
          const cursorPosition = {
            left: calculatedFloatFollow === 'true' ? e.clientX : e.clientX,
            top: calculatedFloatFollow === 'true' ? e.clientY : e.clientY,
          };
          const triggerDistance =
            el.getBoundingClientRect().width + (triggerDistanceOffset ? triggerDistanceOffset : 0);
          const targetPosition = {
            left: el.getBoundingClientRect().left + el.getBoundingClientRect().width / 2,
            top: el.getBoundingClientRect().top + el.getBoundingClientRect().height / 2,
          };
          const distance = {
            x: targetPosition.left - cursorPosition.left,
            y: targetPosition.top - cursorPosition.top,
          };
          const angle = Math.atan2(
            calculatedFloatFollow === 'true' ? distance.x : -distance.x,
            calculatedFloatFollow === 'true' ? distance.y : -distance.y
          );
          const hypotenuse = Math.sqrt(distance.x * distance.x + distance.y * distance.y);

          /*-------------------------------------------------------------------------*/
          function animateElement(el, x, y, duration, ease) {
            gsap.to(el, {
              x: x,
              y: y,
              duration: duration,
              ease: ease,
            });
          }

          if (triggerDistanceOffset) {
            if (hypotenuse <= triggerDistance) {
              animateElement(
                el,
                // @ts-ignore
                -(Math.sin(angle) * hypotenuse * calculatedFloatAmount),
                // @ts-ignore
                -(Math.cos(angle) * hypotenuse * calculatedFloatAmount),
                calculatedFloatDuration,
                calculatedFloatEase
              );
            } else {
              if (calculatedFloatSpringToPosition === 'true') {
                animateElement(el, 0, 0, calculatedFloatDuration, calculatedFloatEase);
              }
            }
          } else {
            animateElement(
              el,
              // @ts-ignore
              -(Math.sin(angle) * hypotenuse * calculatedFloatAmount),
              // @ts-ignore
              -(Math.cos(angle) * hypotenuse * calculatedFloatAmount),
              calculatedFloatDuration,
              calculatedFloatEase
            );
          }
        });
      });
      //---- [ Tilt Elements ]------------------------------------------------------------------------//
      let tiltTriggerDistance;
      tiltElements.forEach((el) => {
        document.addEventListener('mousemove', (e: MouseEvent) => {
          /*--------------------------------------------------------------------*/
          // @ts-ignore
          let calculatedTiltAmount = el.dataset['cursorTiltAmount']
            ? // @ts-ignore
              el.dataset['cursorTiltAmount'] * 1
            : globalProps.tiltAmount;
          // @ts-ignore
          let calculatedTiltDuration = el.dataset['cursorTiltAnimationDuration']
            ? // @ts-ignore
              el.dataset['cursorTiltAnimationDuration'] * 1
            : globalProps.tiltAnimationDuration;
          let calculatedTiltEase = el.dataset['cursorTiltAnimationEase']
            ? el.dataset['cursorTiltAnimationEase']
            : globalProps.tiltAnimationEase;

          // @ts-ignore
          let triggerDistanceOffset = el.dataset['cursorTiltTriggerOffset']
            ? // @ts-ignore
              el.dataset['cursorTiltTriggerOffset'] * 1
            : null;
          if (!tiltTriggerDistance)
            tiltTriggerDistance =
              el.getBoundingClientRect().width +
              (triggerDistanceOffset ? triggerDistanceOffset : 0);
          /*--------------------------------------------------------------------*/
          const cursorPosition = {
            left: e.clientX,
            top: e.clientY,
          };
          const targetPosition = {
            left: el.getBoundingClientRect().left + el.getBoundingClientRect().width / 2,
            top: el.getBoundingClientRect().top + el.getBoundingClientRect().height / 2,
          };
          const distance = {
            x: targetPosition.left - cursorPosition.left,
            y: targetPosition.top - cursorPosition.top,
          };
          const hypotenuse = Math.sqrt(distance.x * distance.x + distance.y * distance.y);
          /*--------------------------------------------------------------------*/
          if (triggerDistanceOffset) {
            if (hypotenuse <= tiltTriggerDistance) {
              gsap.to(el, {
                // @ts-ignore
                transformStyle: `preserve-3d`,
                // @ts-ignore
                transform: `rotateX(${distance.y * calculatedTiltAmount}deg) rotateY(${
                  // @ts-ignore
                  -distance.x * calculatedTiltAmount
                }deg)`,
                duration: calculatedTiltDuration,
                ease: calculatedTiltEase,
              });
            } else {
              if (triggerDistanceOffset) {
                gsap.to(el, {
                  // @ts-ignore
                  transform: `rotateX(0deg) rotateY(0deg)`,
                  duration: calculatedTiltDuration,
                  ease: calculatedTiltEase,
                });
              }
            }
          } else {
            gsap.to(el, {
              // @ts-ignore
              transformStyle: `preserve-3d`,
              // @ts-ignore
              transform: `rotateX(${distance.y * calculatedTiltAmount}deg) rotateY(${
                // @ts-ignore
                -distance.x * calculatedTiltAmount
              }deg)`,
              duration: calculatedTiltDuration,
              ease: calculatedTiltEase,
            });
          }
        });
      });
      //---- [ Glow Elements ]------------------------------------------------------------------------//
      glowElements.forEach((el) => {
        document.addEventListener('mousemove', (e: MouseEvent) => {
          /*------------------------------------------------------*/
          // @ts-ignore
          let calculatedGlowDuration = el.dataset['cursorGlowAnimationDuration']
            ? // @ts-ignore
              el.dataset['cursorGlowAnimationDuration'] * 1
            : globalProps.glowAnimationDuration;
          let calculatedGlowEase = el.dataset['cursorGlowAnimationEase']
            ? el.dataset['cursorGlowAnimationEase']
            : globalProps.glowAnimationEase;
          // @ts-ignore
          let triggerDistanceOffset = el.dataset['cursorGlowTriggerOffset']
            ? // @ts-ignore
              el.dataset['cursorGlowTriggerOffset'] * 1
            : null;
          /*------------------------------------------------------*/

          let triggerDistance =
            el.getBoundingClientRect().width + (triggerDistanceOffset ? triggerDistanceOffset : 0);
          const cursorPosition = {
            left: e.clientX,
            top: e.clientY,
          };
          const targetPosition = {
            left: el.getBoundingClientRect().left + el.getBoundingClientRect().width / 2,
            top: el.getBoundingClientRect().top + el.getBoundingClientRect().height / 2,
          };
          const distance = {
            x: targetPosition.left - cursorPosition.left,
            y: targetPosition.top - cursorPosition.top,
          };
          const hypotenuse = Math.sqrt(distance.x * distance.x + distance.y * distance.y);

          /*------------------------------------------------------------------------*/
          function handleGlow() {
            /*------------------------------------------------------------------------*/
            // @ts-ignore
            // let calculatedGlowAmount = el.dataset['cursorGlowAmount'] ? el.dataset['cursorGlowAmount'] * 1 : elementTiltAmount;

            /*------------------------------------------------------------------------*/
            // @ts-ignore
            for (const card of document.querySelectorAll('[data-cursor-glow-element]')) {
              if (!card.classList.contains('glow-card')) {
                card.classList.add('glow-card');
              }
              /*-----------------------*/
              let calculatedGlowProximityColor = card.dataset['cursorGlowProximityColor']
                ? card.dataset['cursorGlowProximityColor']
                : globalProps.glowProximityColor;
              let calculatedGlowHoverColor = card.dataset['cursorGlowHoverColor']
                ? card.dataset['cursorGlowHoverColor']
                : globalProps.glowHoverColor;
              /*-*/
              let calculatedGlowProximityColorOpacity = card.dataset[
                'cursorGlowProximityColorOpacity'
              ]
                ? card.dataset['cursorGlowProximityColorOpacity']
                : globalProps.glowProximityColorOpacity;
              let calculatedGlowHoverColorOpacity = card.dataset['cursorGlowHoverColorOpacity']
                ? card.dataset['cursorGlowHoverColorOpacity']
                : globalProps.glowHoverColorOpacity;
              /*-*/
              let calculatedGlowProximityColorSize = card.dataset['cursorGlowProximityColorSize']
                ? card.dataset['cursorGlowProximityColorSize']
                : globalProps.glowProximityColorSize;
              let calculatedGlowHoverColorSize = card.dataset['cursorGlowHoverColorSize']
                ? card.dataset['cursorGlowHoverColorSize']
                : globalProps.glowHoverColorSize;
              /*-----------------------*/

              const rect = card.getBoundingClientRect(),
                x = e.clientX - rect.left,
                y = e.clientY - rect.top;
              gsap.to(card, {
                '--mouse-x': `${x}px`,
                '--mouse-y': `${y}px`,
                /*-*/
                '--color-hover': `${calculatedGlowHoverColor}`,
                '--color-proximity': `${calculatedGlowProximityColor}`,
                /*-*/
                '--glow-card-proximity-opacity': `${calculatedGlowProximityColorOpacity}`,
                '--glow-card-hover-opacity': `${calculatedGlowHoverColorOpacity}`,
                '--opacity-duration': `200ms`,
                /*-*/
                // '--color-hover-transparent': `10%`,
                // '--color-proximity-transparent': `10%`,
                '--color-hover-size': `${calculatedGlowHoverColorSize}`,
                '--color-proximity-size': `${calculatedGlowProximityColorSize}`,
                /*-*/
                duration: calculatedGlowDuration,
                ease: calculatedGlowEase,
              });
            }
          }

          if (triggerDistanceOffset) {
            if (hypotenuse <= triggerDistance) {
              handleGlow();
            } else {
              // @ts-ignore
              for (const card of el.children) {
                gsap.to(card, {
                  '--glow-card-approx-opacity': `0`,
                  duration: calculatedGlowDuration,
                  ease: calculatedGlowEase,
                });
              }
            }
          } else {
            /*----------------------------------------------*/
            handleGlow();
            /*----------------------------------------------*/
          }
        });
      });
      //---- [ Shape Shift Elements ]------------------------------------------------------------------------//
      shapeShiftElements.forEach((el) => {
        let calculatedShapeShiftDuration = el.dataset['cursorShapeshiftAnimationDuration']
          ? el.dataset['cursorShapeshiftAnimationDuration']
          : globalProps.shapeShiftAnimationDuration;
        let calculatedShapeShiftEase = el.dataset['cursorShapeshiftAnimationEase']
          ? el.dataset['cursorShapeshiftAnimationEase']
          : globalProps.shapeShiftAnimationEase;
        el.addEventListener('mouseenter', (e: MouseEvent) => {
          if (e.target instanceof HTMLElement && globalCursorRef) {
            setRotateCursor(false);
            let calculatedBorderRadius;
            if (e.target.style.borderRadius.length > 0) {
              calculatedBorderRadius = e.target.style.borderRadius;
            } else {
              // @ts-ignore
              if (e.target.children[0]?.style.borderRadius.length > 0) {
                // @ts-ignore
                calculatedBorderRadius = e.target.children[0]?.style.borderRadius;
              } else {
                calculatedBorderRadius = 0;
              }
            }
            gsap.to(`#${globalCursorRef.id}`, {
              width: `${e.target.clientWidth}`,
              height: `${e.target.clientHeight}`,
              borderRadius: calculatedBorderRadius,
              duration: calculatedShapeShiftDuration,
              ease: calculatedShapeShiftEase,
            });
          }
        });
        el.addEventListener('mouseleave', (e: MouseEvent) => {
          if (e.target instanceof HTMLElement && globalCursorRef) {
            setRotateCursor(true);
            gsap.to(`#${globalCursorRef.id}`, {
              width: `${globalProps.cursorSize}`,
              height: `${globalProps.cursorSize}`,
              borderRadius: `${globalProps.cursorBorderRadius}`,
              duration: calculatedShapeShiftDuration,
              ease: calculatedShapeShiftEase,
            });
          }
        });
      });
      //---- [ Magnetic Elements ]------------------------------------------------------------------------//
      magneticElements.forEach((el) => {
        // @ts-ignore
        let calculatedMagneticDuration = el.dataset['cursorMagneticAnimationDuration']
          ? el.dataset['cursorMagneticAnimationDuration']
          : globalProps.magneticAnimationDuration;
        let calculatedMagneticEase = el.dataset['cursorMagneticAnimationEase']
          ? el.dataset['cursorMagneticAnimationEase']
          : globalProps.magneticAnimationEase;
        el.addEventListener('mousemove', (e) => {
          let calculatedMagneticAmount = el.dataset['cursorMagneticAmount']
            ? el.dataset['cursorMagneticAmount']
            : globalProps.magneticAmount;
          const areatarget = e.target as HTMLElement;
          gsap.to(el, {
            x:
              (e.clientX -
                (areatarget.offsetLeft - window.pageXOffset) -
                areatarget.clientWidth / 2) *
              // @ts-ignore
              calculatedMagneticAmount,
            y:
              (e.clientY -
                (areatarget.offsetTop - window.pageYOffset) -
                areatarget.clientHeight / 2) *
              // @ts-ignore
              calculatedMagneticAmount,
            duration: calculatedMagneticDuration,
            ease: calculatedMagneticEase,
          });
        });
        el.addEventListener('mouseleave', () => {
          gsap.to(el, {
            x: 0,
            y: 0,
            duration: calculatedMagneticDuration,
            ease: calculatedMagneticEase,
          });
        });
      });
      //---- [ Sticky Elements ]------------------------------------------------------------------------//
      stickElements.forEach((el) => {
        el.addEventListener('mouseenter', () => {
          setGlobalStickStatus(true);
        });

        el.addEventListener('mouseleave', () => {
          setGlobalStickStatus(false);
        });
      });
    }
    //---------------------------------------------------------------------------------------------------[END OF ELEMENTS]--//

    return () => {
      sizeElements.forEach((el) => {
        el.removeEventListener('mouseenter', () => {});
        el.removeEventListener('mouseleave', () => {});
      });
      textElements.forEach((el) => {
        el.removeEventListener('mouseenter', () => {});
        el.removeEventListener('mouseleave', () => {});
      });
      backgroundColorElements.forEach((el) => {
        el.removeEventListener('mouseenter', () => {});
        el.removeEventListener('mouseleave', () => {});
      });
      exclusionElements.forEach((el) => {
        el.removeEventListener('mouseenter', () => {});
        el.removeEventListener('mouseleave', () => {});
      });
      backgroundImageElements.forEach((el) => {
        el.removeEventListener('mouseenter', () => {});
        el.removeEventListener('mouseleave', () => {});
      });
      magneticElements.forEach((el) => {
        el.removeEventListener('mousemove', () => {});
        el.removeEventListener('mouseleave', () => {});
      });
      stickElements.forEach((el) => {
        el.removeEventListener('mouseenter', () => {});
        el.removeEventListener('mouseleave', () => {});
      });
      floatingElements.forEach((el) => {
        el.removeEventListener('mouseenter', () => {});
        el.removeEventListener('mouseleave', () => {});
      });
      tiltElements.forEach((el) => {
        el.removeEventListener('mouseenter', () => {});
        el.removeEventListener('mouseleave', () => {});
      });
      glowElements.forEach((el) => {
        el.removeEventListener('mouseenter', () => {});
        el.removeEventListener('mouseleave', () => {});
      });
      cursorBorderRadiusElements.forEach((el) => {
        el.removeEventListener('mouseenter', () => {});
        el.removeEventListener('mouseleave', () => {});
      });
      outlineColorElements.forEach((el) => {
        el.removeEventListener('mouseenter', () => {});
        el.removeEventListener('mouseleave', () => {});
      });
      outlineWidthElements.forEach((el) => {
        el.removeEventListener('mouseenter', () => {});
        el.removeEventListener('mouseleave', () => {});
      });
      shapeShiftElements.forEach((el) => {
        el.removeEventListener('mouseenter', () => {});
        el.removeEventListener('mouseleave', () => {});
      });
    };
  });
  const cursorStyle = useRef<HTMLDivElement | null>(null);
  return (
    <>
      <div
        className={'p-c-s'}
        // id={'p-c-s'} //
        // @ts-ignore
        style={{ ...style }}
        ref={cursorStyle}
        /* Misc */
        // data-cursor-animation-duration={animationDuration}
        // data-cursor-animation-ease={animationEase}
        /*-*/
      >
        {children}
      </div>
    </>
  );
};

export { Cursor, CursorStyle };
