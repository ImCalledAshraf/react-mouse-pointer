
<h2 id="hooks">💠 Cursor Component Props</h2>
<hr>
<p>The Cursor Component is as follows :</p>
<pre><code>&lt;Cursor/&gt;
</code></pre>
<p>and has the following props to handle the cursor's general behaviour :</p>

|     | Gelly Props               | Functionality                     | Default Value |
|-----|:--------------------------|-----------------------------------|---------------|
| 📎  | `isGelly  `               | Add Gelly Effect to mouse pointer | `false`       |
| 📎  | `gellyAnimationAmount   ` | Adjust Gelly Effect Intensity     | `50`          |

|     | Misc Props               | Functionality                                            | Default Value  |
|-----|--------------------------|----------------------------------------------------------|----------------|
| 🚀  | `animationDuration  `    | Adjust General Animation Duration                        | `1.25`         |
| 🚀  | `animationEase   `       | Adjust General Animation Ease                            | `Expo.easeOut` |
| 🚀  | `disableOnMobile   `     | Enable/Disable the Cursor & its Effect on Mobile Devices | `true`         |

<p>Note that <code>animationDuration</code> and <code>animationEase</code> 
will control the behaviour of the overall cursor Gelly and overal movement animations , along with Sticky Effect Duration</p>

|     | Style Props               | Functionality                   | Default Value  |
|-----|---------------------------|---------------------------------|----------------|
| 📐  | `cursorSize  `            | Adjust Cursor Size              | `30`           |
| 📐  | `sizeAnimationDuration  ` | Adjust Size Animation  Duration | `0.5`          |
| 📐  | `sizeAnimationEase  `     | Adjust Size Animation Ease      | `Expo.easeOut` |
| 🛑  | `cursorBorderRadius  `    | Adjust Cursor Border Radius     | `'100%'`       |
| 🔦  | `cursorTransparency  `    | Adjust Cursor Transparency      | `'100%'`       |

|        | Sticky Props             | Functionality                 | Default Value     |
|--------|--------------------------|-------------------------------|-------------------|
| 📌     | `stickAnimationAmount  ` | Adjust Stick Animation Amount | `0.1`             |
| 📌     | `stickAnimationEase  `   | Adjust Stick Animation Ease   | `Power4.easeOut`  |

|     | Magnetic Props                | Functionality                      | Default Value     |
|-----|-------------------------------|------------------------------------|-------------------|
| 🧲  | `magneticAnimationAmount  `   | Adjust Magnetic Effect Amount      | `0.5`             |
| 🧲  | `magneticAnimationDuration  ` | Adjust Magnetic Animation Duration | `0.9`             |
| 🧲  | `magneticAnimationEase  `     | Adjust Magnetic Animation Ease     | `Power4.easeOut ` |

|     | Color Animation Props      | Functionality                   | Default Value    |
|-----|----------------------------|---------------------------------|------------------|
| 🎨  | `colorAnimationDuration  ` | Adjust Color Animation Duration | `0.2`            |
| 🎨  | `colorAnimationEase  `     | Adjust Color Animation Ease     | `Power4.easeOut` |


|      | Background Props                     | Functionality                      | Default Value |
|------|--------------------------------------|------------------------------------|---------------|
| 🎨   | `cursorBackgroundColor  `            | Set Cursor Background Color        | `''`          |
| 🗺️  | `backgroundImageAnimationDuration  ` | Adjust BG-Image Animation Duration | `0`           |
| 🗺️  | `backgroundImageAnimationEase  `     | Adjust BG-Image Animation Ease     | `undefined `  |
| 🎨   | `cursorInnerColor  `                 | Set Cursor Inner Text Color        | `'#fff'`      |

|     | Outline Props          | Functionality               | Default Value |
|-----|------------------------|-----------------------------|---------------|
| ⭕   | `cursorOutlineWidth  ` | Adjust Cursor Outline Width | `'2px'`       |
| ⭕   | `cursorOutlineColor  ` | Adjust Cursor Outline Color | `'black'`     |
| ⭕   | `cursorOutlineStyle  ` | Adjust Cursor Outline Style | `'solid'`     |

|     | Shapeshift Props            | Functionality                               | Default Value    |
|-----|-----------------------------|---------------------------------------------|------------------|
| 🧬  | `shapeShiftDuration  `      | Adjust ShapeShift Effect Animation Duration | `0.5`            |
| 🧬  | `shapeShiftAnimationEase  ` | Adjust ShapeShift Effect Animation Ease     | `Expo.easeOut  ` |


|     | Text Animation Props     | Functionality                  | Default Value    |
|-----|--------------------------|--------------------------------|------------------|
| 🗛  | `textAnimationDuration ` | Adjust Text Animation Duration | `1`              |
| 🗛  | `textAnimationEase  `    | Adjust Text Animation Ease     | `Expo.easeOut`   |


|      | Exclusion Props              | Functionality                         | Default Value |
|------|------------------------------|---------------------------------------|---------------|
| 🎴   | `exclusionBackgroundColor  ` | Set Exclusion Effect Background Color | `'#fff'`      |

|     | Float Element Props       | Functionality                                      | Default Value   |
|-----|---------------------------|----------------------------------------------------|-----------------|
| 🪁  | `floatAmount  `           | Adjust Float Effect Amount                         | `0.05`          |
| 🪁  | `floatFollow  `           | Floating Elements Follow/Repel against cursor      | `false`         |
| 🪁  | `floatSpringToPosition  ` | Floating Elements will snap to place when inactive | `true`          |
| 🪁  | `floatDuration  `         | Adjust Float Animation Duration                    | `0.5`           |
| 🪁  | `floatEase  `             | Adjust Float Animation Ease                        | `Expo.easeOut ` |

|     | Tilt Element Props | Functionality                         | Default Value   |
|-----|--------------------|---------------------------------------|-----------------|
| 🪞  | `tiltAmount  `     | Adjust Tilt Effect Amount             | `0.05`          |
| 🪞  | `tiltDuration  `   | Adjust Tilt Effect Animation Duration | `0.5`           |
| 🪞  | `tiltEase  `       | Adjust Tilt Effect Animation Ease     | `Expo.easeOut ` |

|     | Glow Props                    | Functionality                         | Default Value   |
|-----|:------------------------------|---------------------------------------|-----------------|
| 🌟  | `glowProximityColor  `        | Adjust Proximity Glow Color           | `'blue'`        |
| 🌟  | `glowHoverColor  `            | Adjust Hover Glow Color               | `'red'`         |
| 🌟  | `glowProximityColorOpacity  ` | Adjust Proximity Color Opacity        | `1`             |
| 🌟  | `glowHoverColorOpacity  `     | Adjust Hover Color Opacity            | `1`             |
| 🌟  | `glowProximityColorSize  `    | Adjust Proximity Color Size           | `'600px'`       |
| 🌟  | `glowHoverColorSize  `        | Adjust Hover Color Size               | `'800px'`       |
| 🌟  | `glowDuration  `              | Adjust Glow Effect Animation Duration | `1.2`           |
| 🌟  | `glowEase  `                  | Adjust Glow Effect Animation Ease     | `Expo.easeOut ` |

<p><b>Note</b> : Consider Reading <a href="https://github.com/ImCalledAshraf/react-mouse-pointer/tree/main/docs/CursorStyleDocumentation.md">Cursor Style Component</a> Documentation as well.</p>
