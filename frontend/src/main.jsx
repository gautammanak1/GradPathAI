import React from 'react';
import { createRoot } from 'react-dom/client';

import Page from './Page.jsx';
import './index.css';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>

    <Page/>
  </React.StrictMode>
)
