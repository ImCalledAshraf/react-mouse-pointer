import React, { FC, useCallback, useLayoutEffect, useRef } from 'react';
import './misc/style.css';

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
  isGelly?: boolean;
  borderRadius?: string;
  animationDuration?: number;
  animationEase?: string | gsap.EaseFunction | undefined;
  gellyAnimationAmount?: number;
  gellyAnimationDuration?: number;
  stickAnimationAmount?: number;
  // stickAnimationDuration?: number;
  stickAnimationEase?: string | gsap.EaseFunction | undefined;
  magneticAnimationAmount?: number;
  magneticAnimationDuration?: number;
  magneticAnimationEase?: string | gsap.EaseFunction | undefined;
  colorAnimationEase?: string | gsap.EaseFunction | undefined;
  colorAnimationDuration?: number;
  backgroundImageAnimationEase?: string | gsap.EaseFunction | undefined;
  backgroundImageAnimationDuration?: number;
  sizeAnimationEase?: string | gsap.EaseFunction | undefined;
  shapeShiftAnimationEase?: string | gsap.EaseFunction | undefined;
  sizeAnimationDuration?: number;
  textAnimationEase?: string | gsap.EaseFunction | undefined;
  textAnimationDuration?: number;
  cursorSize?: number;
  cursorBackgroundColor?: string | undefined;
  exclusionBackgroundColor?: string;
  cursorInnerColor?: string;
  cursorOutlineWidth?: string;
  cursorOutlineColor?: string;
  cursorOutlineStyle?: string;
  shapeShiftDuration?: number;
  cursorTransparency?: string;
  elementFloatAmount?: number;
  elementFloatDuration?: number;
  elementFloatFollow?: boolean;
}

export const Cursor: FC<CursorProps> = ({
  isGelly = false,
  borderRadius = '100%',
  animationDuration = 1.25,
  animationEase = Expo.easeOut,
  gellyAnimationAmount = 50,
  stickAnimationAmount = 0.1,
  // stickAnimationDuration = 0.7,
  stickAnimationEase = Power4.easeOut,
  magneticAnimationAmount = 0.5,
  magneticAnimationDuration = 0.9,
  magneticAnimationEase = Power4.easeOut,
  colorAnimationEase = Power4.easeOut,
  colorAnimationDuration = 0.2,
  backgroundImageAnimationEase = undefined,
  backgroundImageAnimationDuration = 0,
  sizeAnimationEase = Expo.easeOut,
  shapeShiftAnimationEase = Expo.easeOut,
  sizeAnimationDuration = 0.5,
  textAnimationEase = Expo.easeOut,
  textAnimationDuration = 1,
  cursorSize = 48,
  cursorBackgroundColor = '',
  exclusionBackgroundColor = '#fff',
  cursorInnerColor = '#fff',
  cursorOutlineWidth = '2px',
  cursorOutlineColor = 'black',
  cursorOutlineStyle = 'solid',
  shapeShiftDuration = 0.5,
  cursorTransparency = '100%',
  elementFloatAmount = 0.05,
  elementFloatDuration = 0.5,
  elementFloatFollow = false,
}) => {
  let rotateCursor = true;
  const cursor = useRef<HTMLDivElement | null>(null);
  const cursorInner = useRef<HTMLDivElement | null>(null);

  const pos: Pos = useInstance(() => ({ x: 0, y: 0 }));
  const vel: Vel = useInstance(() => ({ x: 0, y: 0 }));
  const set: any = useInstance();

  useLayoutEffect(() => {
    set.x = gsap.quickSetter(cursor.current, 'x', 'px');
    set.y = gsap.quickSetter(cursor.current, 'y', 'px');

    if (isGelly) {
      set.r = gsap.quickSetter(cursor.current, 'rotate', 'deg');
      set.sx = gsap.quickSetter(cursor.current, 'scaleX');
      set.sy = gsap.quickSetter(cursor.current, 'scaleY');
      set.width = gsap.quickSetter(cursor.current, 'width', 'px');
      set.rt = gsap.quickSetter(cursorInner.current, 'rotate', 'deg');
    }
  });

  const loop = useCallback(() => {
    const rotation = getAngle(vel.x, vel.y);
    const scale = getScale(vel.x, vel.y);

    set.x(pos.x);
    set.y(pos.y);

    if (isGelly && scale && rotation && cursor.current) {
      set.width(cursor.current?.style.height + scale * gellyAnimationAmount);
      set.sx(1 + scale);
      set.sy(1 - scale);
      if(rotateCursor){
        set.r(rotation);
        set.rt(-rotation);
      }else{
        set.r(0);
        set.rt(0);
      }
    }
  }, [gellyAnimationAmount, isGelly, pos.x, pos.y, set, vel.x, vel.y]);

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
      '[data-cursor-magnetic]'
    ) as unknown as NodeListOf<HTMLElement>;
    const stickElements = document.querySelectorAll(
      '[data-cursor-stick]'
    ) as unknown as NodeListOf<HTMLElement>;
    const exclusionElements = document.querySelectorAll(
      '[data-cursor-exclusion]'
    ) as unknown as NodeListOf<HTMLElement>;
    // CLEANUP ------------------------------------------------------------
    const floatingElements = document.querySelectorAll(
      '[data-cursor-float]'
    ) as unknown as NodeListOf<HTMLElement>;
    // CLEANUP ------------------------------------------------------------
    const shapeShiftElements = document.querySelectorAll(
      '[data-cursor-shapeshift]'
    ) as unknown as NodeListOf<HTMLElement>;
    const cursorBorderRadiusElements = document.querySelectorAll(
      '[data-cursor-border-radius]'
    ) as unknown as NodeListOf<HTMLElement>;

    let stickStatus = false;

    let hasExclusionAlready = false;

    const setFromEvent = (e: MouseEvent) => {
      const areatarget = e.target as HTMLElement;
      let target: Element | null;
      let bound: DOMRect | undefined;
      let x = e.clientX;
      let y = e.clientY;

      let duration = animationDuration;

      let ease = animationEase;

      if (stickStatus) {
        target = areatarget.querySelector(areatarget.dataset['cursorStick'] as string);
        bound = target?.getBoundingClientRect();
        if (target && bound) {
          y =
            bound.top +
            target.clientHeight / 2 -
            (bound.top + target.clientHeight / 2 - e.clientY) * stickAnimationAmount;
          x =
            bound.left +
            target.clientWidth / 2 -
            (bound.left + target.clientWidth / 2 - e.clientX) * stickAnimationAmount;
          duration = animationDuration;
          ease = stickAnimationEase;
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
      if (e.target instanceof HTMLElement && cursor.current) {
        gsap.to(`#${cursor.current.id}`, {
          opacity: 0,
          duration: animationDuration,
          ease: animationEase,
        });
      }
    });
    //---------------------------------------------------------------------------------------------------[START OF ELEMENTS]--//
    sizeElements.forEach((el) => {
      el.addEventListener('mouseenter', (e: MouseEvent) => {
        if (e.target instanceof HTMLElement && cursor.current) {
          gsap.to(`#${cursor.current.id}`, {
            width: `${e.target.dataset['cursorSize']}`,
            height: `${e.target.dataset['cursorSize']}`,
            duration: sizeAnimationDuration,
            ease: sizeAnimationEase,
          });
        }
      });
    });
    sizeElements.forEach((el) => {
      el.addEventListener('mouseleave', (e: MouseEvent) => {
        if (e.target instanceof HTMLElement && cursor.current) {
          gsap.to(`#${cursor.current.id}`, {
            width: `${cursorSize}`,
            height: `${cursorSize}`,
            duration: sizeAnimationDuration,
            ease: sizeAnimationEase,
          });
        }
      });
    });
    //---- [ Text Elements ]------------------------------------------------------------------------//
    textElements.forEach((el) => {
      el.addEventListener('mouseenter', (e: MouseEvent) => {
        if (e.target instanceof HTMLElement && cursorInner.current) {
          // @ts-ignore
          let calculatedTextColor = e.target.dataset['cursorTextColor']?  e.target.dataset['cursorTextColor']: null;
          // @ts-ignore
          let calculatedTextScale = e.target.dataset['cursorTextScale']? 1 * e.target.dataset['cursorTextScale']: 1;
          // @ts-ignore
          let calculatedTextOpacity = e.target.dataset['cursorTextOpacity']? 1 * e.target.dataset['cursorTextOpacity']: 1;
          cursorInner.current.textContent = `${e.target.dataset['cursorText']}`;
          gsap.to(`#${cursorInner.current.id}`, {
            color: calculatedTextColor? calculatedTextColor :'inherit',
            scale: calculatedTextScale,
            opacity: calculatedTextOpacity,
            duration: textAnimationDuration,
            ease: textAnimationEase,
          });
        }
      });
    });
    textElements.forEach((el) => {
      el.addEventListener('mouseleave', (e: MouseEvent) => {
        if (e.target instanceof HTMLElement && cursorInner.current) {
          cursorInner.current.textContent = '';
          gsap.to(`#${cursorInner.current.id}`, {
            scale: 0,
            opacity: 0,
            duration: textAnimationDuration,
            ease: textAnimationEase,
          });
        }
      });
    });
    //---- [ Floating Elements ]------------------------------------------------------------------------//
    floatingElements.forEach((el) => {
      document.addEventListener('mousemove', (e: MouseEvent) => {
        let calculatedFloatAmount = el.dataset['cursorFloatAmount']
          ? el.dataset['cursorFloatAmount']
          : elementFloatAmount;
        let calculatedFloatDuration = el.dataset['cursorFloatDuration']
          ? el.dataset['cursorFloatDuration']
          : elementFloatDuration;
        let calculatedFloatFollow = el.dataset['cursorFloatFollow']
          ? el.dataset['cursorFloatFollow']
          : elementFloatFollow;

        let triggerDistanceOffset;
        // @ts-ignore
        triggerDistanceOffset = el.dataset['cursorFloatTriggerOffset'] * 1;
        const cursorPosition = {
          left: calculatedFloatFollow ? e.clientX : -e.clientX,
          top: calculatedFloatFollow ? e.clientY : -e.clientY,
        };
        const triggerDistance = el.getBoundingClientRect().width + triggerDistanceOffset;
        const targetPosition = {
          left: el.getBoundingClientRect().left + el.getBoundingClientRect().width / 2,
          top: el.getBoundingClientRect().top + el.getBoundingClientRect().height / 2,
        };
        const distance = {
          x: targetPosition.left - cursorPosition.left,
          y: targetPosition.top - cursorPosition.top,
        };
        const angle = Math.atan2(distance.x, distance.y);
        const hypotenuse = Math.sqrt(distance.x * distance.x + distance.y * distance.y);
        if (triggerDistanceOffset) {
          if (hypotenuse <= triggerDistance) {
            gsap.to(el, {
              // @ts-ignore
              x: -(Math.sin(angle) * hypotenuse * calculatedFloatAmount),
              // @ts-ignore
              y: -(Math.cos(angle) * hypotenuse * calculatedFloatAmount),
              duration: calculatedFloatDuration,
              ease: magneticAnimationEase,
            });
          }
        } else {
          gsap.to(el, {
            // @ts-ignore
            x: -(Math.sin(angle) * hypotenuse * calculatedFloatAmount),
            // @ts-ignore
            y: -(Math.cos(angle) * hypotenuse * calculatedFloatAmount),
            duration: calculatedFloatDuration,
            ease: magneticAnimationEase,
          });
        }
      });
    });
    //---- [ Cursor Transparency Elements ]------------------------------------------------------------------------//
    cursorTransparencyElements.forEach((el) => {
      el.addEventListener('mouseenter', (e: MouseEvent) => {
        if (e.target instanceof HTMLElement && cursor.current) {
          gsap.to(`#${cursor.current.id}`, {
            filter: `opacity(${e.target.dataset['cursorTransparency']})`,
            duration: colorAnimationDuration,
            ease: colorAnimationEase,
          });
        }
      });
    });
    cursorTransparencyElements.forEach((el) => {
      el.addEventListener('mouseleave', (e: MouseEvent) => {
        if (e.target instanceof HTMLElement && cursor.current) {
          gsap.to(`#${cursor.current.id}`, {
            filter: `opacity(${cursorTransparency})`,
            duration: colorAnimationDuration,
            ease: colorAnimationEase,
          });
        }
      });
    });

    //---- [ Outline ]--------------------------------------------------------------------------------------------------------------------------------------------------//
    //---- [ Outline Color Elements ]------------------------------------------------------------------------//
    outlineColorElements.forEach((el) => {
      el.addEventListener('mouseenter', (e: MouseEvent) => {
        if (e.target instanceof HTMLElement && cursor.current) {
          let calculatedOutlineColor = e.target.dataset['cursorOutlineColor'] ? e.target.dataset['cursorOutlineColor'] : cursorOutlineColor;
          gsap.to(`#${cursor.current.id}`, {
            outlineColor: `${calculatedOutlineColor}`,
            duration: colorAnimationDuration,
            ease: colorAnimationEase,
          });
        }
      });
    });
    outlineColorElements.forEach((el) => {
      el.addEventListener('mouseleave', (e: MouseEvent) => {
        if (e.target instanceof HTMLElement && cursor.current) {
          gsap.to(`#${cursor.current.id}`, {
            outlineColor: `${cursorOutlineColor}`,
            duration: colorAnimationDuration,
            ease: colorAnimationEase,
          });
        }
      });
    });
    //---- [ Outline Size Elements ]------------------------------------------------------------------------//
    outlineWidthElements.forEach((el) => {
      el.addEventListener('mouseenter', (e: MouseEvent) => {
        if (e.target instanceof HTMLElement && cursor.current) {
          let calculatedOutlineWidth = e.target.dataset['cursorOutlineWidth'] ? e.target.dataset['cursorOutlineWidth'] : cursorOutlineWidth;
          gsap.to(`#${cursor.current.id}`, {
            outlineWidth: `${calculatedOutlineWidth}`,
            duration: colorAnimationDuration,
            ease: colorAnimationEase,
          });
        }
      });
    });
    outlineWidthElements.forEach((el) => {
      el.addEventListener('mouseleave', (e: MouseEvent) => {
        if (e.target instanceof HTMLElement && cursor.current) {
          gsap.to(`#${cursor.current.id}`, {
            outlineWidth: `${cursorOutlineWidth}`,
            duration: colorAnimationDuration,
            ease: colorAnimationEase,
          });
        }
      });
    });
    //---- [ END Outline ]------------------------------------------------------------------------------------------------------------------------------------------------//

    //---- [ Background Color Elements ]------------------------------------------------------------------------//
    backgroundColorElements.forEach((el) => {
      el.addEventListener('mouseenter', (e: MouseEvent) => {
        if (e.target instanceof HTMLElement && cursor.current) {
          gsap.to(`#${cursor.current.id}`, {
            backgroundColor: `${e.target.dataset['cursorBackgroundColor']}`,
            duration: colorAnimationDuration,
            ease: colorAnimationEase,
          });
        }
      });
    });
    backgroundColorElements.forEach((el) => {
      el.addEventListener('mouseleave', (e: MouseEvent) => {
        if (e.target instanceof HTMLElement && cursor.current) {
          gsap.to(`#${cursor.current.id}`, {
            backgroundColor: `${cursorBackgroundColor}`,
            duration: colorAnimationDuration,
            ease: colorAnimationEase,
          });
        }
      });
    });
    //---- [ Exclusion Elements ]------------------------------------------------------------------------//
    // TODO: Do More Testing
    exclusionElements.forEach((el) => {
      el.addEventListener('mouseenter', (e: MouseEvent) => {
        if (e.target instanceof HTMLElement && cursor.current) {
          // @ts-ignore: Unreachable code error
          cursor.current.style.mixBlendMode = 'exclusion';
          cursor.current.style.background = `${exclusionBackgroundColor}`;
        }
      });
    });
    exclusionElements.forEach((el) => {
      el.addEventListener('mouseleave', (e: MouseEvent) => {
        if (e.target instanceof HTMLElement && cursor.current) {
          // @ts-ignore: Unreachable code error
          cursor.current.style.mixBlendMode = '';
          cursor.current.style.background = `${cursorBackgroundColor}`;
        }
      });
    });
    //---- [ Background Image Elements ]------------------------------------------------------------------------//
    // TODO: Clean up Size Controls
    // TODO: Add Background Image Skew on Mouse Move
    backgroundImageElements.forEach((el) => {
      el.addEventListener('mouseenter', (e: MouseEvent) => {
        if (e.target instanceof HTMLElement && cursorInner.current) {
          if (cursor.current) {
            // @ts-ignore: Unreachable code error
            if (cursor.current.style.mixBlendMode === 'exclusion') hasExclusionAlready = true;
            // @ts-ignore: Unreachable code error
            cursor.current.style.mixBlendMode = 'exclusion';
            cursor.current.style.backgroundColor = 'transform';
          }
          // @ts-ignore
          let calculatedBackgroundScale = e.target.dataset['cursorBackgroundImageScale']? 1 * e.target.dataset['cursorBackgroundImageScale'] : 1;
          let calculatedBorderRadius = e.target.dataset['cursorBorderRadius']?  e.target.dataset['cursorBorderRadius'] : '100%';


          rotateCursor = false
          gsap.to(`#${cursorInner.current.id}`, {
            scale: calculatedBackgroundScale,
            opacity: 1,
            borderRadius: calculatedBorderRadius,
            background: `url("${e.target.dataset['cursorBackgroundImage']}")`,
            filter: 'invert(1)',
            duration: backgroundImageAnimationDuration,
            ease: backgroundImageAnimationEase,
          });
        }
      });
    });
    backgroundImageElements.forEach((el) => {
      el.addEventListener('mouseleave', (e: MouseEvent) => {
        if (e.target instanceof HTMLElement && cursorInner.current) {
          rotateCursor = true
          if (cursor.current) {
            if (!hasExclusionAlready) {
              // @ts-ignore: Unreachable code error
              cursor.current.style.mixBlendMode = '';
              cursor.current.style.zIndex = '999999999';
              cursor.current.style.backgroundColor = `${cursorBackgroundColor}`;
            } else {
              cursor.current.style.backgroundColor = `${exclusionBackgroundColor}`;
            }
          }
          gsap.to(`#${cursorInner.current.id}`, {
            scale: 0,
            opacity: 0,
            background: ``,
            filter: 'none',
            duration: backgroundImageAnimationDuration,
          });
        }
      });
    });
    //---- [ Border Radius Elements ]------------------------------------------------------------------------//
    cursorBorderRadiusElements.forEach((el) => {
      el.addEventListener('mouseenter', (e: MouseEvent) => {
        if (e.target instanceof HTMLElement && cursor.current) {
          let calculatedBorderRadius;
          if (e.target.dataset.cursorBorderRadius) {
            calculatedBorderRadius = e.target.dataset.cursorBorderRadius;
          } else  {
            calculatedBorderRadius = borderRadius;
          }
          gsap.to(`#${cursor.current.id}`, {
            borderRadius: calculatedBorderRadius,
            duration: shapeShiftDuration,
            ease: shapeShiftAnimationEase,
          });
        }
      });
    });
    cursorBorderRadiusElements.forEach((el) => {
      el.addEventListener('mouseleave', (e: MouseEvent) => {
        if (e.target instanceof HTMLElement && cursor.current) {
          gsap.to(`#${cursor.current.id}`, {
            borderRadius: `${borderRadius}`,
            duration: shapeShiftDuration,
            ease: shapeShiftAnimationEase,
          });
        }
      });
    });
    //---- [ Shape Shift Elements ]------------------------------------------------------------------------//
    // TODO: Cleanup Code
    shapeShiftElements.forEach((el) => {
      el.addEventListener('mouseenter', (e: MouseEvent) => {
        if (e.target instanceof HTMLElement && cursor.current) {
          let calculatedBorderRadius;
          if (e.target.dataset.cursorBorderRadius) {
            calculatedBorderRadius = e.target.dataset.cursorBorderRadius;
          } else if (e.target.style.borderRadius.length > 0) {
            calculatedBorderRadius = e.target.style.borderRadius;
          } else {
            calculatedBorderRadius = 0;
          }
          // console.log(e.target.dataset);
          // e.target.style.borderRadius.length === 0 ?calculatedBorderRadius = 0 : calculatedBorderRadius = e.target.style.borderRadius.length;
          gsap.to(`#${cursor.current.id}`, {
            width: `${e.target.clientWidth}`,
            height: `${e.target.clientHeight}`,
            borderRadius: calculatedBorderRadius,
            // outlineColor:`${e.target.dataset.cursorOutlineColor}`,
            duration: shapeShiftDuration,
            ease: shapeShiftAnimationEase,
          });
        }
      });
    });
    shapeShiftElements.forEach((el) => {
      el.addEventListener('mouseleave', (e: MouseEvent) => {
        if (e.target instanceof HTMLElement && cursor.current) {
          gsap.to(`#${cursor.current.id}`, {
            width: `${cursorSize}`,
            height: `${cursorSize}`,
            borderRadius: `${borderRadius}`,
            // outlineColor: `${cursorOutlineColor}`,
            duration: shapeShiftDuration,
            ease: shapeShiftAnimationEase,
          });
        }
      });
    });
    //---- [ Magnetic Elements ]------------------------------------------------------------------------//
    magneticElements.forEach((el) => {
      el.addEventListener('mousemove', (e) => {
        // @ts-ignore
        let calculatedMagneticDuration = el.dataset['cursorMagneticDuration'] ? 1 * el.dataset['cursorMagneticDuration'] : magneticAnimationDuration;
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
          ease: magneticAnimationEase,
        });
      });
    });
    magneticElements.forEach((el) => {
      let calculatedMagneticDuration = el.dataset['cursorMagneticDuration']
        ? el.dataset['cursorMagneticDuration']
        : magneticAnimationDuration;
      el.addEventListener('mouseleave', () => {
        gsap.to(el, {
          x: 0,
          y: 0,
          duration: calculatedMagneticDuration,
          ease: magneticAnimationEase,
        });
      });
    });
    //---- [ Sticky Elements ]------------------------------------------------------------------------//
    stickElements.forEach((el) => {
      el.addEventListener('mouseenter', () => {
        stickStatus = true;
      });
    });
    stickElements.forEach((el) => {
      el.addEventListener('mouseleave', () => {
        stickStatus = false;
      });
    });
    //---------------------------------------------------------------------------------------------------[END OF ELEMENTS]--//

    return () => {
      window.removeEventListener('mousemove', setFromEvent);
      document.body.removeEventListener('mouseenter', () => {});
      document.body.removeEventListener('mouseleave', () => {});
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
      cursorBorderRadiusElements.forEach((el) => {
        el.removeEventListener('mouseenter', () => {});
        el.removeEventListener('mouseleave', () => {});
      });
    };
  });
  useTicker(loop);
  return (
    <div
      ref={cursor}
      id={'c-cursor'}
      className="c-cursor"
      style={{
        width: cursorSize,
        height: cursorSize,
        background: cursorBackgroundColor,
        outlineWidth: cursorOutlineWidth,
        outlineColor: cursorOutlineColor,
        outlineStyle: cursorOutlineStyle,
        borderRadius : `${borderRadius}`,
        filter: `opacity(${cursorTransparency}`,
      }}>
      <div
        style={{ color: cursorInnerColor }}
        ref={cursorInner}
        id={'c-cursorInner'}
        className="c-cursor__inner"
      />
    </div>
  );
};
