/**
 * Simple Bot Sift. DAG's 'Slack' node implementation
 */

'use strict';

// Entry point for DAG node
module.exports = function (got) {
  /* jshint camelcase: false */
  /* jshint -W069 */
  console.log('slack-actions.js:... got', JSON.stringify(got));
  var inData = got['in'];

  for (var d of inData.data) {
    console.log('slackbot.js: data: ', d);
    if (d.value) {
      try {
        var msg = JSON.parse(d.value);
        console.log('slac-actions.js: msg: ', msg);
      } catch (err) {

      }
    }
  }
};
