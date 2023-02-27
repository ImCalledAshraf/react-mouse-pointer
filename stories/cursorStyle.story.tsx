import { withKnobs } from '@storybook/addon-knobs';
// @ts-ignore
import ShowDocs from './util/ShowDocs';
import * as React from 'react';

export default {
  title: 'Cursor/CursorStyle',
  decorators: [withKnobs],
};

export const Docs = () => <ShowDocs md={require('../docs/CursorStyleDocumentation.md')} />;
