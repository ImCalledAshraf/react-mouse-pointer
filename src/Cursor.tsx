import React, {
  FC,
  useCallback,
  useLayoutEffect,
  useRef,
} from 'react';
import './misc/style.css';
import { isMobile } from 'react-device-detect';
import { gsap, Expo, Power4 } from 'gsap';

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
  stickAnimationAmount?: number;
  stickAnimationEase?: string | gsap.EaseFunction | undefined;
  /*-Magnetic-*/
  magneticAnimationAmount?: number;
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

export const Cursor: FC<CursorProps> = ({
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
    stickAnimationAmount = 0.1,
    stickAnimationEase = Power4.easeOut,
    /*-Magnetic-*/
    magneticAnimationAmount = 0.5,
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
    // if(!isMobile || !disableOnMobile){

    // @ts-ignore
    let rotateCursor = true;
    const cursor = useRef<HTMLDivElement | null>(null);
    const cursorInner = useRef<HTMLDivElement | null>(null);

    const pos: Pos = useInstance(() => ({ x: 0, y: 0 }));
    const vel: Vel = useInstance(() => ({ x: 0, y: 0 }));
    const set: any = useInstance();
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
          // if (rotateCursor) {
          set.r(rotation);
          set.rt(-rotation);
          // } else {
          //   set.r(rotation);
          //   set.rt(-rotation);
          // }
        }
      } else {
        set.sx(0);
        set.sy(0);
      }


    }, [gellyAnimationAmount,  isGelly, pos.x, pos.y, set, vel.x, vel.y]);
    useLayoutEffect(() => {
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
        '[data-cursor-float]'
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
      let stickStatus = false;
      const setFromEvent = (e: MouseEvent) => {
        const areatarget = e.target as HTMLElement;
        let target: Element | null;
        let bound: DOMRect | undefined;
        let x = e.clientX;
        let y = e.clientY;
        let duration = animationDuration;
        let ease = animationEase;
        if (stickStatus) {
          target = areatarget;
          // @ts-ignore
          let calculatedStickAnimationAmount = !target ? stickAnimationAmount : target.dataset['cursorStickAmount'] ? target.dataset['cursorStickAmount'] : stickAnimationAmount;
          // @ts-ignore
          let calculatedStickAnimationEase = !target ? stickAnimationAmount : target.dataset['cursorStickAnimationEase'] ? target.dataset['cursorStickAnimationEase'] : stickAnimationEase;
          bound = target?.getBoundingClientRect();
          if (target && bound) {
            y =
              bound.top +
              target.clientHeight / 2 -
              (bound.top + target.clientHeight / 2 - e.clientY) * calculatedStickAnimationAmount;
            x =
              bound.left +
              target.clientWidth / 2 -
              (bound.left + target.clientWidth / 2 - e.clientX) * calculatedStickAnimationAmount;
            duration = animationDuration;
            ease = calculatedStickAnimationEase;
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
      if (!isMobile || !disableOnMobile) {

        window.addEventListener('mousemove', (e) => {
          setFromEvent(e);
        });
        document.body.addEventListener('mouseenter', (e: MouseEvent) => {
          if (e.target instanceof HTMLElement && cursor.current) {
            gsap.to(`#${cursor.current.id}`, {
              opacity: 1,
              duration: animationDuration,
              ease: animationEase,
            });
          }
        });
        document.body.addEventListener('mouseleave', (e: MouseEvent) => {
          glowElements.forEach((el) => {
            // @ts-ignore
            let calculatedGlowDuration = el.dataset['cursorGlowAnimationDuration'] ? el.dataset['cursorGlowAnimationDuration'] * 1 : glowAnimationDuration;
            let calculatedGlowEase = el.dataset['cursorGlowAnimationEase'] ? el.dataset['cursorGlowAnimationEase'] : glowAnimationEase;

            // @ts-ignore
            for (const card of document.querySelectorAll('[data-cursor-glow-element]')) {
              gsap.to(card, {
                '--glow-card-proximity-opacity': `0`,
                // '--glow-card-hover-opacity': `0`,
                '--opacity-duration': `300ms`,

                duration: calculatedGlowDuration,
                ease: calculatedGlowEase,
              });
            }
          });
          if (e.target instanceof HTMLElement && cursor.current) {
            gsap.to(`#${cursor.current.id}`, {
              opacity: 0,
              duration: animationDuration,
              ease: animationEase,
            });
          }
        });
        //---------------------------------------------------------------------------------------------------[START OF ELEMENTS]--//
        //---- [ Size Elements ]------------------------------------------------------------------------//
        sizeElements.forEach((el) => {
          // @ts-ignore
          let calculatedSizeAnimationDuration = el.dataset['cursorSizeAnimationDuration'] ? e.target.dataset['cursorSizeAnimationDuration'] : sizeAnimationDuration;
          // @ts-ignore
          let calculatedSizeAnimationEase = el.dataset['cursorSizeAnimationEase'] ? e.target.dataset['cursorSizeAnimationEase'] : sizeAnimationEase;
          /*--------------------------------------------------------------------*/
          el.addEventListener('mouseenter', (e: MouseEvent) => {
            if (e.target instanceof HTMLElement && cursor.current) {
              gsap.to(`#${cursor.current.id}`, {
                width: `${e.target.dataset['cursorSize']}`,
                height: `${e.target.dataset['cursorSize']}`,
                duration: calculatedSizeAnimationDuration,
                ease: calculatedSizeAnimationEase,
              });
            }
          });
          /*--------------------------------------------------------------------*/
          el.addEventListener('mouseleave', (e: MouseEvent) => {
            if (e.target instanceof HTMLElement && cursor.current) {
              gsap.to(`#${cursor.current.id}`, {
                width: `${cursorSize}`,
                height: `${cursorSize}`,
                duration: calculatedSizeAnimationDuration,
                ease: calculatedSizeAnimationEase,
              });
            }
          });
          /*--------------------------------------------------------------------*/
        });
        //---- [ Text Elements ]------------------------------------------------------------------------//
        textElements.forEach((el) => {
          // @ts-ignore
          let calculatedTextAnimationEase = el.dataset['cursorTextAnimationEase'] ? el.dataset['cursorTextAnimationEase'] : textAnimationEase;
          // @ts-ignore
          let calculatedTextAnimationDuration = el.dataset['cursorTextAnimationDuration'] ? el.dataset['cursorTextAnimationDuration'] : textAnimationDuration;
          /*--------------------------------------------------------------------*/
          el.addEventListener('mouseenter', (e: MouseEvent) => {
            if (e.target instanceof HTMLElement && cursorInner.current) {
              /*-------------------------------------------------------------------------------*/
              // @ts-ignore
              let calculatedTextColor = e.target.dataset['cursorTextColor'] ? e.target.dataset['cursorTextColor'] : null;
              // @ts-ignore
              let calculatedTextScale = e.target.dataset['cursorTextScale'] ? 1 * e.target.dataset['cursorTextScale'] : 1;
              // @ts-ignore
              let calculatedTextOpacity = e.target.dataset['cursorTextOpacity'] ? e.target.dataset['cursorTextOpacity'] : 1;
              cursorInner.current.textContent = `${e.target.dataset['cursorText']}`;
              /*-------------------------------------------------------------------------------*/
              gsap.to(`#${cursorInner.current.id}`, {
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
            if (e.target instanceof HTMLElement && cursorInner.current) {
              cursorInner.current.textContent = '';
              gsap.to(`#${cursorInner.current.id}`, {
                scale: 0,
                opacity: 0,
                duration: calculatedTextAnimationDuration,
                ease: calculatedTextAnimationEase,
              });
            }
          });
          /*--------------------------------------------------------------------*/
        });
        //---- [ Floating Elements ]------------------------------------------------------------------------//
        floatingElements.forEach((el) => {
          document.addEventListener('mousemove', (e: MouseEvent) => {
            /*-------------------------------------------------------------------------*/
            let calculatedFloatSpringToPosition = el.dataset['cursorFloatSpringToPosition'] ? el.dataset['cursorFloatSpringToPosition'] : floatSpringToPosition;
            let calculatedFloatAmount = el.dataset['cursorFloatAmount'] ? el.dataset['cursorFloatAmount'] : floatAmount;
            let calculatedFloatDuration = el.dataset['cursorFloatAnimationDuration'] ? el.dataset['cursorFloatAnimationDuration'] : floatAnimationDuration;
            let calculatedFloatFollow = el.dataset['cursorFloatFollow'] ? el.dataset['cursorFloatFollow'] : floatFollow;
            // @ts-ignore
            let triggerDistanceOffset = el.dataset['cursorFloatTriggerOffset'] ? el.dataset['cursorFloatTriggerOffset'] * 1 : null;
            let calculatedFloatEase = el.dataset['cursorFloatAnimationEase'] ? el.dataset['cursorFloatAnimationEase'] : floatAnimationEase;
            /*-------------------------------------------------------------------------*/
            const cursorPosition = {
              left: calculatedFloatFollow === 'true' ? e.clientX : e.clientX,
              top: calculatedFloatFollow === 'true' ? e.clientY : e.clientY,
            };
            const triggerDistance = el.getBoundingClientRect().width + (triggerDistanceOffset ? triggerDistanceOffset : 0);
            const targetPosition = {
              left: el.getBoundingClientRect().left + el.getBoundingClientRect().width / 2,
              top: el.getBoundingClientRect().top + el.getBoundingClientRect().height / 2,
            };
            const distance = {
              x: targetPosition.left - cursorPosition.left,
              y: targetPosition.top - cursorPosition.top,
            };
            const angle = Math.atan2(calculatedFloatFollow === 'true' ? distance.x : -distance.x, calculatedFloatFollow === 'true' ? distance.y : -distance.y);
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
                // @ts-ignore
                animateElement(el, -(Math.sin(angle) * hypotenuse * calculatedFloatAmount), -(Math.cos(angle) * hypotenuse * calculatedFloatAmount), calculatedFloatDuration, calculatedFloatEase);
              } else {
                if (calculatedFloatSpringToPosition === 'true') {
                  animateElement(el, 0, 0, calculatedFloatDuration, calculatedFloatEase);
                }
              }
            } else {
              // @ts-ignore
              animateElement(el, -(Math.sin(angle) * hypotenuse * calculatedFloatAmount), -(Math.cos(angle) * hypotenuse * calculatedFloatAmount), calculatedFloatDuration, calculatedFloatEase);
            }
          });
        });
        //---- [ Tilt Elements ]------------------------------------------------------------------------//
        let tiltTriggerDistance;
        tiltElements.forEach((el) => {
          document.addEventListener('mousemove', (e: MouseEvent) => {
            /*--------------------------------------------------------------------*/
            // @ts-ignore
            let calculatedTiltAmount = el.dataset['cursorTiltAmount'] ? el.dataset['cursorTiltAmount'] * 1 : tiltAmount;
            // @ts-ignore
            let calculatedTiltDuration = el.dataset['cursorTiltAnimationDuration'] ? el.dataset['cursorTiltAnimationDuration'] * 1 : tiltAnimationDuration;
            let calculatedTiltEase = el.dataset['cursorTiltAnimationEase'] ? el.dataset['cursorTiltAnimationEase'] : tiltAnimationEase;
            // @ts-ignore
            let triggerDistanceOffset = el.dataset['cursorTiltTriggerOffset'] ? el.dataset['cursorTiltTriggerOffset'] * 1 : null;
            if (!tiltTriggerDistance) tiltTriggerDistance = el.getBoundingClientRect().width + (triggerDistanceOffset ? triggerDistanceOffset : 0);
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
                  transform: `rotateX(${distance.y * calculatedTiltAmount}deg) rotateY(${-distance.x * calculatedTiltAmount}deg)`,
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
                transform: `rotateX(${distance.y * calculatedTiltAmount}deg) rotateY(${-distance.x * calculatedTiltAmount}deg)`,
                duration: calculatedTiltDuration,
                ease: calculatedTiltEase,
              });
            }
          });
        });
        //---- [ Glow Elements ]------------------------------------------------------------------------//
        glowElements.forEach((el) => {
          document.addEventListener('mousemove', (e: MouseEvent) => {
            /*------------------------------------------------------------------------*/
            // @ts-ignore
            // let calculatedGlowAmount = el.dataset['cursorGlowAmount'] ? el.dataset['cursorGlowAmount'] * 1 : elementTiltAmount;
            // @ts-ignore
            let calculatedGlowDuration = el.dataset['cursorGlowAnimationDuration'] ? el.dataset['cursorGlowAnimationDuration'] * 1 : glowAnimationDuration;
            let calculatedGlowEase = el.dataset['cursorGlowAnimationEase'] ? el.dataset['cursorGlowAnimationEase'] : glowAnimationEase;
            let calculatedGlowProximityColor = el.dataset['cursorGlowProximityColor'] ? el.dataset['cursorGlowProximityColor'] : glowProximityColor;
            let calculatedGlowHoverColor = el.dataset['cursorGlowHoverColor'] ? el.dataset['cursorGlowHoverColor'] : glowHoverColor;
            /*-*/
            let calculatedGlowProximityColorOpacity = el.dataset['cursorGlowProximityColorOpacity'] ? el.dataset['cursorGlowProximityColorOpacity'] : glowProximityColorOpacity;
            let calculatedGlowHoverColorOpacity = el.dataset['cursorGlowHoverColorOpacity'] ? el.dataset['cursorGlowHoverColorOpacity'] : glowHoverColorOpacity;
            /*-*/
            let calculatedGlowProximityColorSize = el.dataset['cursorGlowProximityColorSize'] ? el.dataset['cursorGlowProximityColorSize'] : glowProximityColorSize;
            let calculatedGlowHoverColorSize = el.dataset['cursorGlowHoverColorSize'] ? el.dataset['cursorGlowHoverColorSize'] : glowHoverColorSize;
            /*-*/
            // @ts-ignore
            let triggerDistanceOffset = el.dataset['cursorGlowTriggerOffset'] ? el.dataset['cursorGlowTriggerOffset'] * 1 : null;
            /*------------------------------------------------------------------------*/
            let triggerDistance = el.getBoundingClientRect().width + (triggerDistanceOffset ? triggerDistanceOffset : 0);
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
              // @ts-ignore
              for (const card of document.querySelectorAll('[data-cursor-glow-element]')) {
                !card.classList.contains('glow-card') ? card.classList.add('glow-card') : null;
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
        //---- [ Cursor Transparency Elements ]------------------------------------------------------------------------//
        cursorTransparencyElements.forEach((el) => {
          let calculatedColorAnimationDuration = el.dataset['cursorColorAnimationDuration'] ? el.dataset['cursorColorAnimationDuration'] : colorAnimationDuration;
          let calculatedColorAnimationEase = el.dataset['cursorColorAnimationEase'] ? el.dataset['cursorColorAnimationEase'] : colorAnimationEase;
          el.addEventListener('mouseenter', (e: MouseEvent) => {
            if (e.target instanceof HTMLElement && cursor.current) {
              gsap.to(`#${cursor.current.id}`, {
                filter: `opacity(${e.target.dataset['cursorTransparency']})`,
                duration: calculatedColorAnimationDuration,
                ease: calculatedColorAnimationEase,
              });
            }
          });
          el.addEventListener('mouseleave', (e: MouseEvent) => {
            if (e.target instanceof HTMLElement && cursor.current) {
              gsap.to(`#${cursor.current.id}`, {
                filter: `opacity(${cursorTransparency})`,
                duration: calculatedColorAnimationDuration,
                ease: calculatedColorAnimationEase,
              });
            }
          });
        });
        //---- [ Outline ]--------------------------------------------------------------------------------------------------------------------------------------------------//
        //---- [ Outline Color Elements ]------------------------------------------------------------------------//
        outlineColorElements.forEach((el) => {
          let calculatedColorAnimationDuration = el.dataset['cursorColorAnimationDuration'] ? el.dataset['cursorColorAnimationDuration'] : colorAnimationDuration;
          let calculatedColorAnimationEase = el.dataset['cursorColorAnimationEase'] ? el.dataset['cursorColorAnimationEase'] : colorAnimationEase;
          el.addEventListener('mouseenter', (e: MouseEvent) => {
            if (e.target instanceof HTMLElement && cursor.current) {
              let calculatedOutlineColor = e.target.dataset['cursorOutlineColor'] ? e.target.dataset['cursorOutlineColor'] : cursorOutlineColor;
              gsap.to(`#${cursor.current.id}`, {
                outlineColor: `${calculatedOutlineColor}`,
                duration: calculatedColorAnimationDuration,
                ease: calculatedColorAnimationEase,
              });
            }
          });
          el.addEventListener('mouseleave', (e: MouseEvent) => {
            if (e.target instanceof HTMLElement && cursor.current) {
              gsap.to(`#${cursor.current.id}`, {
                outlineColor: `${cursorOutlineColor}`,
                duration: calculatedColorAnimationDuration,
                ease: calculatedColorAnimationEase,
              });
            }
          });
        });
        //---- [ Outline Size Elements ]------------------------------------------------------------------------//
        outlineWidthElements.forEach((el) => {
          let calculatedColorAnimationDuration = el.dataset['cursorColorAnimationDuration'] ? el.dataset['cursorColorAnimationDuration'] : colorAnimationDuration;
          let calculatedColorAnimationEase = el.dataset['cursorColorAnimationEase'] ? el.dataset['cursorColorAnimationEase'] : colorAnimationEase;
          el.addEventListener('mouseenter', (e: MouseEvent) => {
            if (e.target instanceof HTMLElement && cursor.current) {
              let calculatedOutlineWidth = e.target.dataset['cursorOutlineWidth'] ? e.target.dataset['cursorOutlineWidth'] : cursorOutlineWidth;
              gsap.to(`#${cursor.current.id}`, {
                outlineWidth: `${calculatedOutlineWidth}`,
                duration: calculatedColorAnimationDuration,
                ease: calculatedColorAnimationEase,
              });
            }
          });
          el.addEventListener('mouseleave', (e: MouseEvent) => {
            if (e.target instanceof HTMLElement && cursor.current) {
              gsap.to(`#${cursor.current.id}`, {
                outlineWidth: `${cursorOutlineWidth}`,
                duration: calculatedColorAnimationDuration,
                ease: calculatedColorAnimationEase,
              });
            }
          });
        });
        //---- [ END Outline ]------------------------------------------------------------------------------------------------------------------------------------------------//
        //---- [ Background Color Elements ]------------------------------------------------------------------------//
        backgroundColorElements.forEach((el) => {
          let calculatedColorAnimationDuration = el.dataset['cursorColorAnimationDuration'] ? el.dataset['cursorColorAnimationDuration'] : colorAnimationDuration;
          let calculatedColorAnimationEase = el.dataset['cursorColorAnimationEase'] ? el.dataset['cursorColorAnimationEase'] : colorAnimationEase;
          el.addEventListener('mouseenter', (e: MouseEvent) => {
            if (e.target instanceof HTMLElement && cursor.current) {
              gsap.to(`#${cursor.current.id}`, {
                backgroundColor: `${e.target.dataset['cursorBackgroundColor']}`,
                duration: calculatedColorAnimationDuration,
                ease: calculatedColorAnimationEase,
              });
            }
          });
          el.addEventListener('mouseleave', (e: MouseEvent) => {
            if (e.target instanceof HTMLElement && cursor.current) {
              gsap.to(`#${cursor.current.id}`, {
                backgroundColor: `${cursorBackgroundColor}`,
                duration: calculatedColorAnimationDuration,
                ease: calculatedColorAnimationEase,
              });
            }
          });
        });
        //---- [ Exclusion Elements ]------------------------------------------------------------------------//
        exclusionElements.forEach((el) => {
          el.addEventListener('mouseenter', (e: MouseEvent) => {
            if (e.target instanceof HTMLElement && cursor.current) {
              let calcualtedExclusionBackgroundColor = e.target.dataset['cursorExclusionBackgroundColor'] ? e.target.dataset['cursorExclusionBackgroundColor'] : exclusionBackgroundColor;
              // @ts-ignore: Unreachable code error
              cursor.current.style.mixBlendMode = 'exclusion';
              cursor.current.style.background = `${calcualtedExclusionBackgroundColor}`;
            }
          });
          el.addEventListener('mouseleave', (e: MouseEvent) => {
            if (e.target instanceof HTMLElement && cursor.current) {
              // @ts-ignore: Unreachable code error
              cursor.current.style.mixBlendMode = '';
              cursor.current.style.background = `${cursorBackgroundColor}`;
            }
          });
        });
        //---- [ Background Image Elements ]------------------------------------------------------------------------//
        backgroundImageElements.forEach((el) => {
          let calculatedBackgroundImageAnimationDuration = el.dataset['cursorBackgroundImageAnimationDuration'] ? el.dataset['cursorBackgroundImageAnimationDuration'] : backgroundImageAnimationDuration;
          let calculatedBackgroundImageAnimationEase = el.dataset['cursorBackgroundImageAnimationEase'] ? el.dataset['cursorBackgroundImageAnimationEase'] : backgroundImageAnimationEase;
          el.addEventListener('mouseenter', (e: MouseEvent) => {
            if (e.target instanceof HTMLElement && cursorInner.current) {
              if (cursor.current) {
                // @ts-ignore: Unreachable code error
                if (cursor.current.style.mixBlendMode === 'exclusion') hasExclusionAlready = true;
              }
              // @ts-ignore
              let calculatedBackgroundScale = e.target.dataset['cursorBackgroundImageScale'] ? 1 * e.target.dataset['cursorBackgroundImageScale'] : 1;
              let calculatedBorderRadius = e.target.dataset['cursorBorderRadius'] ? e.target.dataset['cursorBorderRadius'] : '100%';
              rotateCursor = false;
              gsap.to(`#${cursorInner.current.id}`, {
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
            if (e.target instanceof HTMLElement && cursorInner.current) {
              rotateCursor = true;
              if (cursor.current) {
                // @ts-ignore: Unreachable code error
                cursor.current.style.mixBlendMode = '';
                cursor.current.style.zIndex = '999999999';
                cursor.current.style.backgroundColor = `${cursorBackgroundColor}`;
              }
              gsap.to(`#${cursorInner.current.id}`, {
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
          let calculatedShapeShiftDuration = el.dataset['cursorShapeShiftDuration'] ? el.dataset['cursorShapeShiftDuration'] : shapeShiftAnimationDuration;
          let calculatedShapeShiftEase = el.dataset['cursorShapeShiftEase'] ? el.dataset['cursorShapeShiftEase'] : shapeShiftAnimationEase;
          el.addEventListener('mouseenter', (e: MouseEvent) => {
            if (e.target instanceof HTMLElement && cursor.current) {
              let calculatedBorderRadius;
              if (e.target.dataset.cursorBorderRadius) {
                calculatedBorderRadius = e.target.dataset.cursorBorderRadius;
              } else {
                calculatedBorderRadius = cursorBorderRadius;
              }
              gsap.to(`#${cursor.current.id}`, {
                borderRadius: calculatedBorderRadius,
                duration: calculatedShapeShiftDuration,
                ease: calculatedShapeShiftEase,
              });
            }
          });
          el.addEventListener('mouseleave', (e: MouseEvent) => {
            if (e.target instanceof HTMLElement && cursor.current) {
              gsap.to(`#${cursor.current.id}`, {
                borderRadius: `${cursorBorderRadius}`,
                duration: calculatedShapeShiftDuration,
                ease: calculatedShapeShiftEase,
              });
            }
          });
        });
        //---- [ Shape Shift Elements ]------------------------------------------------------------------------//
        shapeShiftElements.forEach((el) => {
          let calculatedShapeShiftDuration = el.dataset['cursorShapeShiftAnimationDuration'] ? el.dataset['cursorShapeShiftAnimationDuration'] : shapeShiftAnimationDuration;
          let calculatedShapeShiftEase = el.dataset['cursorShapeShiftAnimationEase'] ? el.dataset['cursorShapeShiftAnimationEase'] : shapeShiftAnimationEase;
          el.addEventListener('mouseenter', (e: MouseEvent) => {
            if (e.target instanceof HTMLElement && cursor.current) {
              // isShapeShifting = true;
              rotateCursor = false;
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
              gsap.to(`#${cursor.current.id}`, {
                width: `${e.target.clientWidth}`,
                height: `${e.target.clientHeight}`,
                borderRadius: calculatedBorderRadius,
                duration: calculatedShapeShiftDuration,
                ease: calculatedShapeShiftEase,
              });
            }
          });
          el.addEventListener('mouseleave', (e: MouseEvent) => {
            if (e.target instanceof HTMLElement && cursor.current) {
              rotateCursor = true;
              gsap.to(`#${cursor.current.id}`, {
                width: `${cursorSize}`,
                height: `${cursorSize}`,
                borderRadius: `${cursorBorderRadius}`,
                duration: calculatedShapeShiftDuration,
                ease: calculatedShapeShiftEase,
              });
            }
          });
        });
        //---- [ Magnetic Elements ]------------------------------------------------------------------------//
        magneticElements.forEach((el) => {
          // @ts-ignore
          let calculatedMagneticDuration = el.dataset['cursorMagneticAnimationDuration'] ? 1 * el.dataset['cursorMagneticAnimationDuration'] : magneticAnimationDuration;
          let calculatedMagneticEase = el.dataset['cursorMagneticAnimationEase'] ? el.dataset['cursorMagneticAnimationEase'] : magneticAnimationEase;
          el.addEventListener('mousemove', (e) => {
            // @ts-ignore
            let calculatedMagneticAmount = el.dataset['cursorMagneticAmount'] ? 1 * el.dataset['cursorMagneticAmount'] : magneticAnimationAmount;
            const areatarget = e.target as HTMLElement;
            gsap.to(el, {
              x:
                (e.clientX -
                  (areatarget.offsetLeft - window.pageXOffset) -
                  areatarget.clientWidth / 2) *
                calculatedMagneticAmount,
              y:
                (e.clientY -
                  (areatarget.offsetTop - window.pageYOffset) -
                  areatarget.clientHeight / 2) *
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
            stickStatus = true;
          });
          el.addEventListener('mouseleave', () => {
            stickStatus = false;
          });
        });
        //---------------------------------------------------------------------------------------------------[END OF ELEMENTS]--//
      }

      return () => {
        window.removeEventListener('mousemove', setFromEvent);
        document.body.removeEventListener('mouseenter', () => {
        });
        document.body.removeEventListener('mouseleave', () => {
        });
        sizeElements.forEach((el) => {
          el.removeEventListener('mouseenter', () => {
          });
          el.removeEventListener('mouseleave', () => {
          });
        });
        textElements.forEach((el) => {
          el.removeEventListener('mouseenter', () => {
          });
          el.removeEventListener('mouseleave', () => {
          });
        });
        backgroundColorElements.forEach((el) => {
          el.removeEventListener('mouseenter', () => {
          });
          el.removeEventListener('mouseleave', () => {
          });
        });
        exclusionElements.forEach((el) => {
          el.removeEventListener('mouseenter', () => {
          });
          el.removeEventListener('mouseleave', () => {
          });
        });
        backgroundImageElements.forEach((el) => {
          el.removeEventListener('mouseenter', () => {
          });
          el.removeEventListener('mouseleave', () => {
          });
        });
        magneticElements.forEach((el) => {
          el.removeEventListener('mousemove', () => {
          });
          el.removeEventListener('mouseleave', () => {
          });
        });
        stickElements.forEach((el) => {
          el.removeEventListener('mouseenter', () => {
          });
          el.removeEventListener('mouseleave', () => {
          });
        });
        floatingElements.forEach((el) => {
          el.removeEventListener('mouseenter', () => {
          });
          el.removeEventListener('mouseleave', () => {
          });
        });
        tiltElements.forEach((el) => {
          el.removeEventListener('mouseenter', () => {
          });
          el.removeEventListener('mouseleave', () => {
          });
        });
        glowElements.forEach((el) => {
          el.removeEventListener('mouseenter', () => {
          });
          el.removeEventListener('mouseleave', () => {
          });
        });
        cursorBorderRadiusElements.forEach((el) => {
          el.removeEventListener('mouseenter', () => {
          });
          el.removeEventListener('mouseleave', () => {
          });
        });
        outlineColorElements.forEach((el) => {
          el.removeEventListener('mouseenter', () => {
          });
          el.removeEventListener('mouseleave', () => {
          });
        });
        outlineWidthElements.forEach((el) => {
          el.removeEventListener('mouseenter', () => {
          });
          el.removeEventListener('mouseleave', () => {
          });
        });
        shapeShiftElements.forEach((el) => {
          el.removeEventListener('mouseenter', () => {
          });
          el.removeEventListener('mouseleave', () => {
          });
        });
      };
    });

    useTicker(loop);
    return (
      <div
        ref={cursor}
        id={'pointer-cursor'}
        className='pointer-cursor'
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
          className='pointer-cursor__inner'
        />
      </div>
    );
  }
;

interface CrusorStyleProps {
  /*-Misc-*/
  children?: JSX.Element | JSX.Element[] | null,
  style?: CSSStyleDeclaration;
  // animationDuration?: number;
  // animationEase?: string | gsap.EaseFunction | undefined;
  /*-Style-*/
  cursorSize?: number | string,
  sizeAnimationDuration?: number;
  sizeAnimationEase?: string | gsap.EaseFunction | undefined;
  cursorBorderRadius?: string;
  cursorTransparency?: string;
  /*-Stick-*/
  isSticky?: boolean;
  stickAnimationAmount?: number;
  stickAnimationEase?: string | gsap.EaseFunction | undefined;
  /*-Magnetic-*/
  isMagnetic?: boolean,
  magneticAnimationAmount?: number;
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
  // cursorOutlineStyle?: string;
  /*-Shapeshift-*/
  shapeShift?: boolean;
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
  exclusion?: boolean;
  exclusionBackgroundColor?: string;
  /*-Float-*/
  float?: boolean;
  floatAmount?: number | string;
  floatFollow?: boolean;
  floatTriggerOffset?: number | string;
  floatSpringToPosition?: boolean;
  floatAnimationDuration?: number | string;
  floatAnimationEase?: string | gsap.EaseFunction | undefined;
  /*-Tilt-*/
  tilt?: boolean;
  tiltAmount?: number | string;
  tiltTriggerOffset?: number | string;
  tiltAnimationDuration?: number | string;
  tiltAnimationEase?: string | gsap.EaseFunction | undefined;
  /*-Glow-*/
  glow?: boolean;
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

export const CursorStyle: ({ children }: CrusorStyleProps) => React.ReactElement<any, any> | JSX.Element = ({
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
    stickAnimationAmount = null,
    stickAnimationEase = null,
    /*-Magnetic-*/
    isMagnetic = null,
    magneticAnimationAmount = null,
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
    const cursorStyle = useRef<HTMLDivElement | null>(null);
    return (
      <>
        <div
          // id='cards' //
          id={glow ? 'glow-pointer-cards' : undefined}
          // @ts-ignore
          style={{ ...style }}
          ref={cursorStyle}

          /* Misc */
          // data-cursor-animation-duration={animationDuration}
          // data-cursor-animation-ease={animationEase}

          /* Cursor Style */
          data-cursor-size={cursorSize}
          data-cursor-size-animation-duration={sizeAnimationDuration}
          data-cursor-size-animation-ease={sizeAnimationEase}
          data-cursor-border-radius={cursorBorderRadius}
          data-cursor-transparency={cursorTransparency} // Color Animation Ease


          /*Text*/
          data-cursor-text={cursorText}
          data-cursor-text-scale={cursorTextScale}
          data-cursor-text-color={cursorTextColor}
          data-cursor-text-opacity={cursorTextOpacity}
          data-cursor-text-animation-duration={textAnimationDuration}
          data-cursor-text-animation-ease={textAnimationEase}


          /*Float*/
          data-cursor-float={float}
          data-cursor-float-amount={floatAmount}
          data-cursor-float-follow={floatFollow}
          data-cursor-float-trigger-offset={floatTriggerOffset}
          data-cursor-float-spring-to-position={floatSpringToPosition}
          data-cursor-float-animation-duration={floatAnimationDuration}
          data-cursor-float-animation-ease={floatAnimationEase}

          /*Color& Background & Outline*/
          data-cursor-background-color={cursorBackgroundColor}
          data-cursor-outline-color={cursorOutlineColor} // Goes with ColorAnimationDuration & Ease
          data-cursor-outline-width={cursorOutlineWidth}
          data-cursor-color-animation-duration={colorAnimationDuration}
          data-cursor-color-animation-ease={colorAnimationEase}

          /*Background Image*/
          data-cursor-background-image={cursorBackgroundImage}
          data-cursor-background-image-scale={cursorBackgroundImageScale}
          data-cursor-background-image-animation-duration={backgroundImageAnimationDuration}
          data-cursor-background-image-animation-ease={backgroundImageAnimationEase}


          // /*Magnetic*/
          data-cursor-magnetic={isMagnetic}
          data-cursor-magnetic-amount={magneticAnimationAmount}
          data-cursor-magnetic-animation-duration={magneticAnimationDuration}
          data-cursor-magnetic-animation-ease={magneticAnimationEase}

          /*ShapeShift*/
          data-cursor-shapeshift={shapeShift}
          data-cursor-shapeshift-animation-duration={shapeShiftAnimationDuration}
          data-cursor-shapeshift-animation-ease={shapeShiftAnimationEase}


          /*Tilt*/
          data-cursor-tilt={tilt}
          data-cursor-tilt-amount={tiltAmount}
          data-cursor-tilt-trigger-offset={tiltTriggerOffset}
          data-cursor-tilt-animation-duration={tiltAnimationDuration}
          data-cursor-tilt-animation-ease={tiltAnimationEase}

          /*Exclusion*/
          data-cursor-exclusion={exclusion}
          data-cursor-exclusion-background-color={exclusionBackgroundColor}

          /* Sticky */
          data-cursor-stick={isSticky}
          data-cursor-stick-amount={stickAnimationAmount}
          data-cursor-stick-animation-ease={stickAnimationEase}

          /* Glow */
          data-cursor-glow={glow}
          data-cursor-glow-proximity-color={glowProximityColor}
          data-cursor-glow-hover-color={glowHoverColor}
          data-cursor-glow-proximity-color-opacity={glowProximityColorOpacity}
          data-cursor-glow-hover-color-opacity={glowHoverColorOpacity}
          data-cursor-glow-proximity-color-size={glowProximityColorSize}
          data-cursor-glow-hover-color-size={glowHoverColorSize}
          data-cursor-glow-trigger-offset={glowTriggerOffset}
          data-cursor-glow-animation-duration={glowAnimationDuration}
          data-cursor-glow-animation-ease={glowAnimationEase}

        >
          {children}
        </div>
      </>
    );
  }
;
