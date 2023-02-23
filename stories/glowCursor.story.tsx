// import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { Cursor, CursorStyle } from '../src/Cursor';

import '../src/misc/style.css';
// @ts-ignore
import ShowDocs from './util/ShowDocs';
import { number, text, withKnobs } from '@storybook/addon-knobs';
// import './public/glowStyle.css';

export const Docs = () => <ShowDocs md={require('../docs/glowCursor.md')} />;

export const Demo = () => {
  let glowTriggerOffset = number('<CursorStyle>glowTriggerOffset', 200);
  let glowHoverColor = text('glowHoverColor', 'red');
  let glowProximityColor = text('glowProximityColor', 'blue');
  let glowHoverColorSize = text('glowHoverColorSize', '600px');
  let glowProximityColorSize = text('glowProximityColorSize', '800px');
  let glowHoverColorOpacity = text('glowHoverColorOpacity', '50%');
  let glowProximityColorOpacity = text('glowProximityColorOpacity', '50%');
  // let glowAnimationDuration=text('glowAnimationDuration','');
  // let glowAnimationEase=text('glowAnimationEase','');

  const demoComponent = () => {
    return (
      <div style={{ height: '95vh' }}>
        <Cursor
          isGelly={true}
          cursorSize={30}
          // glowHoverColor={}
          // glowProximityColor={}
          // glowHoverColorSize={}
          // glowProximityColorSize={}
          // glowHoverColorOpacity={}
          // glowProximityColorOpacity={}
          // glowAnimationDuration={}
          // glowAnimationEase={}
        />
        <CursorStyle
          glow={true}
          glowTriggerOffset={glowTriggerOffset}
          glowHoverColor={glowHoverColor}
          glowProximityColor={glowProximityColor}
          glowHoverColorSize={glowHoverColorSize}
          glowProximityColorSize={glowProximityColorSize}
          glowHoverColorOpacity={glowHoverColorOpacity}
          glowProximityColorOpacity={glowProximityColorOpacity}
          // glowAnimationDuration={}
          // glowAnimationEase={}
        >
          <div
            // className='glow-card'
            data-cursor-glow-element
            style={{
              width: '320px',
              borderRadius: '20px',
              background: '#E0EFEA',
              // outline: '2px solid orange',
              padding: '2em',
              display: 'grid',
              placeItems: 'center',
            }}>
            <div style={{ textAlign: 'left' }}>
              <h1 style={{ margin: '0' }} id="stick-title">
                Cursor Glow
              </h1>
              <h3 style={{ margin: '0' }}>Hover Around To see Effect</h3>
              <p style={{ margin: '0' }}>
                <b>Has Data Attribute :</b> data-cursor-glow-element
              </p>
              <p style={{ margin: '0' }}>Wrapped with :</p>
              <p></p>

              <p style={{ margin: '0' }}>
                <b> &lt;CursorStyle </b> <br /> glow = &#123;true&#125; <br />
                {/*----*/}
                glowTriggerOffset = &#123;{glowTriggerOffset}&#125;
                <br />
                {/*----*/}
                glowHoverColor = &#123;'{glowHoverColor}'&#125;
                <br />
                {/*----*/}
                glowProximityColor = &#123;'{glowProximityColor}'&#125;
                <br />
                {/*----*/}
                glowHoverColorSize = &#123;'{glowHoverColorSize}'&#125;
                <br />
                {/*----*/}
                glowProximityColorSize = &#123;'{glowProximityColorSize}'&#125; <br />
                {/*----*/}
                glowHoverColorOpacity = &#123;'{glowHoverColorOpacity}'&#125; <br />
                {/*----*/}
                glowProximityColorOpacity = &#123;'{glowProximityColorOpacity}'&#125;
                <br />
                {/*----*/}
                <b>
                  {' '}
                  &#62; <br /> &lt;/CursorStyle&gt;
                </b>
              </p>
            </div>
          </div>
          <br />
          <br />
          <div
            // className='glow-card'
            data-cursor-glow-element
            style={{
              width: '320px',
              borderRadius: '20px',
              background: '#E0EFEA',
              // outline: '2px solid orange',
              padding: '2em',
              display: 'grid',
              placeItems: 'center',
            }}>
            <div style={{ textAlign: 'left' }}>
              <h1 style={{ margin: '0' }} id="stick-title">
                Cursor Glow
              </h1>
              <h3 style={{ margin: '0' }}>Hover Around To see Effect</h3>
              <p style={{ margin: '0' }}>
                <b>Has Data Attribute :</b> data-cursor-glow-element
              </p>
              <p style={{ margin: '0' }}>Wrapped with :</p>
              <p></p>

              <p style={{ margin: '0' }}>
                <b> &lt;CursorStyle </b> <br /> glow = &#123;true&#125; <br />
                {/*----*/}
                glowTriggerOffset = &#123;{glowTriggerOffset}&#125;
                <br />
                {/*----*/}
                glowHoverColor = &#123;'{glowHoverColor}'&#125;
                <br />
                {/*----*/}
                glowProximityColor = &#123;'{glowProximityColor}'&#125;
                <br />
                {/*----*/}
                glowHoverColorSize = &#123;'{glowHoverColorSize}'&#125;
                <br />
                {/*----*/}
                glowProximityColorSize = &#123;'{glowProximityColorSize}'&#125; <br />
                {/*----*/}
                glowHoverColorOpacity = &#123;'{glowHoverColorOpacity}'&#125; <br />
                {/*----*/}
                glowProximityColorOpacity = &#123;'{glowProximityColorOpacity}'&#125;
                <br />
                {/*----*/}
                <b>
                  {' '}
                  &#62; <br /> &lt;/CursorStyle&gt;
                </b>
              </p>
            </div>
          </div>

          {/*</div>*/}
        </CursorStyle>
      </div>
    );
  };
  return demoComponent();
};
export default {
  title: 'Cursor/Glow',
  decorators: [withKnobs],
};
