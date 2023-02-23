<h2>
📐 Change Cursor Size
</h2>

[//]: # (----)
<hr>

[//]: # (------------------------------------------)
<h3>🌍 Global Cursor Component Props </h3>
<p>This will override the default Cursor Size and set it to 50, the new size will apply everywhere on the website</p>

<p> <b> Change Cursor Size :</b> </p>
<pre><code>&lt;Cursor <b>cursorSize={50}</b> &gt;
</code></pre>

<p> <b> Change Outline Width :</b> </p>
<pre><code>&lt;Cursor <b>cursorOutlineWidth={'4px'}</b> &gt;
</code></pre>

[//]: # (------------------------------------------)

[//]: # (------------------------------------------)
<h3>⭐️ CursorStyle Component Props </h3>
<p> This will override both the default Cursor Size and the size set on the <code>Cursor</code> element above </p>
<p>This is used when you want a particular element to have a certain size compared to the others / the default size</p>
<pre><code>&lt;Cursor cursorSize={50}&gt;

&lt;CursorStyle <b>cursorSize={100}</b> &gt;
  &lt;div&gt;
     &lt;h3 Change Cursor Size&lt;/h3&gt;
  &lt;/div&gt; 
  &lt;/CursorStyle&gt;
</code></pre>
<p><b>Expected Behaviour : </b>The new Cursor Size in the website will become 50, however it will change to 100 when you hover the targeted <code>div</code> inside the <code>CursorStyle</code></p>

<pre><code>&lt;CursorStyle <b>cursorOutlineWidth={'8px'}</b> &gt;
  &lt;div&gt;
     &lt;h3 Change Cursor Outline Width &lt;/h3&gt;
  &lt;/div&gt; 
&lt;/CursorStyle&gt;
</code></pre>
