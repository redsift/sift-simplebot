import React from 'react';
import ReactDOM from 'react-dom';

// import FirstUse from './first-use';
// import FirstUse from '@redsift/rs-component-wizard';

ReactDOM.render(
  // React.createElement(FirstUse, null),
  React.createElement('div', {className: "commentBox"},
        "Hello, world! I am a CommentBox."
      );
  document.getElementById('content')
);
