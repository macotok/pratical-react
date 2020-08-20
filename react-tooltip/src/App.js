import './App.css';
import 'tippy.js/dist/tippy.css';

import React, { forwardRef } from 'react';

import Tippy from '@tippyjs/react';

const ColoredTooltip = () => <span style={{ color: 'yellow' }}>Colored</span>;

const CustomChild = forwardRef((props, ref) => {
  return (
    <div ref={ref}>
      <div>First line</div>
      <div>Second line</div>
    </div>
  );
});

function App() {
  return (
    <div className="App">
      <div style={{ paddingBottom: '20px' }}>
        <Tippy
          placement="right"
          arrow={false}
          delay={1000}
          content="Hello tooltip"
        >
          <button>My button</button>
        </Tippy>
      </div>

      <div style={{ paddingBottom: '20px' }}>
        <Tippy content={<ColoredTooltip />}>
          <button>My button</button>
        </Tippy>
      </div>

      <div style={{ paddingBottom: '20px' }}>
        <Tippy content={<ColoredTooltip />} placement="top-end">
          <CustomChild />
        </Tippy>
      </div>
    </div>
  );
}

export default App;
