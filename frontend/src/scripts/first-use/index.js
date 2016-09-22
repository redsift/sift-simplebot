// import React from 'react/dist/react.js';
import React from 'react';
import ReactDOM from 'react-dom';

import ConnectedFirstUse from './first-use';
// import WizardMinimal from '@redsift/rs-component-wizard';

console.log('ReactDOM', ReactDOM);
console.log('React', React);
console.log('ConnectedFirstUse', ConnectedFirstUse);
console.log('React.createElement', React.createElement);
// console.log('React.default.createElement', React.default.createElement);

Object.keys(React).forEach(item => {
  console.log('key: ', item);
});

// var React__default = React.default;
ReactDOM.render(React.createElement(ConnectedFirstUse, null), document.getElementById('content'));
