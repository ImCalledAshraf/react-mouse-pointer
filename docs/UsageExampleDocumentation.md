<p>Import <code>Cursor</code> and <code>CursorStyle</code> from <code>react-mouse-pointer</code></p>
<pre>
import { Cursor, CursorStyle } from 'react-mouse-pointer';
</pre>
<p>Use the <code>Cursor</code> Component within your code flow to create the Mouse Pointer/Cursor</p>
<pre>
<code>&lt;Cursor /&gt;</code>
</pre>
<p>Here we have a functional cursor , you can tinker with the cursor props to achieve the wanted effect,
for more information about the Cursor Component Props, see <code><a href="https://github.com/ImCalledAshraf/react-mouse-pointer/tree/main/docs/cursorComponent.md">Cursor Component</a></code></p>


<p>Now if you want to control the cursor's behaviour within particular elements, 
or add some effects related to the cursor such as:
<code>Make The Targeted Element Magnetic</code>
<code>Make The Targeted Element Magnetic</code>
<code>Make The Targeted Element LookAt the mouse</code>
<code>Make The Cursor Glow Around the Targeted Element</code>
and so on, we have to use <code>CursorStyle</code> Component
</p>
<pre>
<code>&lt;CursorStyle&gt;
  Targeted Elements Here
&lt;/CursorStyle&gt;</code>
</pre>
<p>By using <code>CursorStyle</code> you are able to control the cursor's behavior 
towards certain elements in your app, and/or add certain effects to it that work around the cursor,
for more information about <code>CursorStyle</code> props, see <code> <a href="https://github.com/ImCalledAshraf/react-mouse-pointer/tree/main/docs/cursorStyle.md">Cursor Style Component</a></code>.</p>


<p>to find live examples , see <code> <a href="https://imcalledashraf.github.io/react-mouse-pointer/">Storybook Demo</a></code>.</p>
