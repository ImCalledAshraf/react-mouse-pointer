import { storiesOf } from '@storybook/react';
import * as React from 'react';
import '../src/misc/style.css';
// @ts-ignore
import ShowDocs from './util/ShowDocs';


storiesOf('Introduction/Changelog', module)
  .add('Docs', () => <ShowDocs md={require('/CHANGELOG.md')} />)


