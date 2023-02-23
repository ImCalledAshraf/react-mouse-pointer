<h2 id="hooks">💅 Cursor Style Props</h2>
<hr>
<p><b>Expected Behaviour : </b> <code>CursorStyle</code> Component wraps around other elements in the DOM / Web 
flow, and can add certain effects and/or override the default <code>Cursor</code>'s behaviour with the targeted (wrapped) element.
(IE: Override Cursor Size for a particular Element , Add Magnetic Effect to a particular Element..)
</p>

<p>
Consider Checking The <a href="https://imcalledashraf.github.io/react-mouse-pointer/">Docs</a> for more Information
</p>

<p>The CursorStyle Component is as follows :</p>
<pre><code>&lt;CursorStyle&gt;
...Elements Here
&lt;/CursorStyle&gt;
</code></pre>
<p>and has the following props to handle the cursor's general behaviour :</p>

|     | Misc Props | Functionality                                |
|-----|------------------------|----------------------------------------------|
| 📎  | `style   `             | Add CSS Styling to the <CursorStyle> Element |

|     | Style Props 	             | Functionality                  |
|-----|---------------------------|--------------------------------|
| 📐  | `cursorSize  `            | Adjust Cursor Size             |
| 📐  | `sizeAnimationDuration  ` | Adjust Size Animation Duration |
| 📐  | `sizeAnimationEase  `     | Adjust Size Animation Ease     |
| 🛑  | `cursorBorderRadius  `    | Adjust Cursor Border Radius    |
| 🔦  | `cursorTransparency  `    | Adjust Cursor Transparency     |

|        |  Sticky Props	           | Functionality                  | Type      |
|--------|--------------------------|--------------------------------|-----------|
| 📌     | `isSticky   `            | Enable/Disable Sticky Effect   | `boolean` |
| 📌     | `stickAnimationAmount  ` | Adjust Stick Animation Amount	 |           |
| 📌     | `stickAnimationEase  `   | Adjust Stick Animation Ease	   |           |

|     |  Magnetic Props	              | Functionality                       | Type      |
|-----|-------------------------------|-------------------------------------|-----------|
| 🧲  | `isMagnetic   `               | Enable/Disable Magnetic Effect      | `boolean` |
| 🧲  | `magneticAnimationAmount  `   | Adjust Magnetic Effect Amount	      |           |
| 🧲  | `magneticAnimationDuration  ` | Adjust Magnetic Animation Duration	 |           |
| 🧲  | `magneticAnimationEase  `     | Adjust Magnetic Animation Ease	     |           |

|     |  Color Animation Props	    | Functionality                    |
|-----|----------------------------|----------------------------------|
| 🎨  | `colorAnimationEase  `     | Adjust Color Animation Duration	 |
| 🎨  | `colorAnimationDuration  ` | Adjust Color Animation Ease	     |

|      |  Background Props	                   | Functionality                         |
|------|--------------------------------------|---------------------------------------|
| 🎨   | `cursorBackgroundColor  `            | Set Cursor Background Color	          |
| 🗺️  | `cursorBackgroundImage  `            | Set Cursor Background Image           |
| 🗺️  | `cursorBackgroundImageScale  `       | Adjust Cursor Background Image Scale  |
| 🗺️  | `backgroundImageAnimationDuration  ` | Adjust BG-Image Animation Duration    |
| 🗺️  | `backgroundImageAnimationEase  `     | Adjust BG-Image Animation Ease	       |

|     |  Outline Props	        | Functionality                 |
|-----|------------------------|-------------------------------|
| ⭕   | `cursorOutlineWidth  ` | Adjust Cursor Outline Width	  |
| ⭕   | `cursorOutlineColor  ` | Adjust Cursor Outline Color	  |

|     |  Shapeshift Props	          | Functionality                                | Type      |
|-----|-----------------------------|----------------------------------------------|-----------|
| 🧬  | `shapeShift  `              | Enable/Disable ShapeShift Effect             | `boolean` |
| 🧬  | `shapeShiftAnimationEase  ` | Adjust ShapeShift Effect Animation Duration	 |           |
| 🧬  | `shapeShiftDuration  `      | Adjust ShapeShift Effect Animation Ease	     |           |
<p>When using the <code>ShapeShift</code> Effect, it will look for styling within 
the first direct child of the <code>CursorStyle</code> Component, however if that element has no styling
(for example : no border radius) and you want to shapeshift the cursor into a particular form,
you can wrap the <code>CursorStyle</code> Component in a div with style of your choice, or ,
use the <code>style</code> prop as shown above</p>

|     |  Text Animation Props	   | Functionality                    | Type               |
|-----|--------------------------|----------------------------------|--------------------|
| 🗛  | `cursorText `            | Set Cursor Text                  | `string`           |
| 🗛  | `cursorTextScale  `      | Adjust Cursor Text Scale         | `number`           |
| 🗛  | `cursorTextColor  `      | Adjust Cursor Text Color         | `string`           |
| 🗛  | `cursorTextOpacity  `    | Adjust Cursor Text Opacity       | `string` /`number` |
| 🗛  | `textAnimationEase  `    | Adjust Text Animation Duration	  |                    |
| 🗛  | `textAnimationDuration ` | Adjust Text Animation Ease	      |                    |

|      | CursorStyle Exclusion Props	 | Functionality                           | Type      |
|------|------------------------------|-----------------------------------------|-----------|
| 🎴   | `exclusion  `                | Enable / Disable Exclusion Effect       | `boolean` |
| 🎴   | `exclusionBackgroundColor  ` | Set Exclusion Effect Background Color	  |           |
<p>Exclusion Behaves as of the Blending Filter : <code>Difference</code> , and will show 
the differences between the Cursor Background & The Targeted Element Background</p>

|     |  Float Element Props	     | Functionality                                       | Type                |
|-----|---------------------------|-----------------------------------------------------|---------------------|
| 🪁  | `float  `                 | Enable / Disable Float Effect                       | `boolean`           |
| 🪁  | `floatAmount  `           | Adjust Float Effect Amount	                         |                     |
| 🪁  | `floatFollow  `           | Floating Elements Follow/Repel against cursor	      |                     |
| 🪁  | `floatTriggerOffset `     | Set Float Enable Trigger Offset                     | `string` / `number` |
| 🪁  | `floatSpringToPosition  ` | Floating Elements will snap to place when inactive	 |                     |
| 🪁  | `floatDuration  `         | Adjust Float Animation Duration	                    |                     |
| 🪁  | `floatEase  `             | Adjust Float Animation Ease	                        |                     |
<p>Elements Set as <code>float={true}</code> will interact with the movement of the mouse 
(will follow the mouse if <code>floatFollow = {true}</code> otherwise, will repel. </p>
<p>by Default, the <code>floatTriggerOffset</code> will be disabled 
(its simply a trigger distance to determine how close a mouse must get to the element for it to start the animation)</p>

|     |  Tilt Element Props	 | Functionality                          | Type               |
|-----|----------------------|----------------------------------------|--------------------|
| 🪞  | `tilt  `             | Enable / Disable Tilt Effect           | `boolean`          |
| 🪞  | `tiltAmount  `       | Adjust Tilt Effect Amount	             |                    |
| 🪞  | `tiltTriggerOffset`  | Set Tilt Enable Trigger Offset         | `string`/`number`  |
| 🪞  | `tiltDuration  `     | Adjust Tilt Effect Animation Duration	 |                    |
| 🪞  | `tiltEase  `         | Adjust Tilt Effect Animation Ease	     |                    |
<p>The Tilt Effect behaves as LookAt Element, where the element will tilt in a 3D perspective following the mouse</p> 

|     |  Glow Props	                  | Functionality                          | Type                |
|-----|-------------------------------|----------------------------------------|---------------------|
| 🌟  | `glow  `                      | Enable / Disable Glow Effect           | `boolean`           |
| 🌟  | `glowProximityColor  `        | Adjust Proximity Glow Color	           |                     |
| 🌟  | `glowHoverColor  `            | Adjust Hover Glow Color	               |                     |
| 🌟  | `glowProximityColorOpacity  ` | Adjust Proximity Color Opacity	        |                     |
| 🌟  | `glowHoverColorOpacity  `     | Adjust Hover Color Opacity	            |                     |
| 🌟  | `glowProximityColorSize  `    | Adjust Proximity Color Size	           |                     |
| 🌟  | `glowHoverColorSize  `        | Adjust Hover Color Size	               |                     |
| 🌟  | `glowTriggerOffset  `         | Set Glow Enable Trigger Offset         | `string`/`number`   |
| 🌟  | `glowDuration  `              | Adjust Glow Effect Animation Duration	 |                     |
| 🌟  | `glowEase  `                  | Adjust Glow Effect Animation Ease	     |                     |

<p><b>Note</b> : Consider Reading <a href="https://github.com/ImCalledAshraf/react-mouse-pointer/tree/main/docs/CursorComponentDocumentation.md">Cursor Component</a> Documentation as well.</p>
