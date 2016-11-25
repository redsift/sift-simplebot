/**
 * Simple Bot Sift. DAG's 'Slack' node implementation
 */

'use strict';

var slack = require('./slack.js');

// Entry point for DAG node
module.exports = function (got) {
  /* jshint camelcase: false */
  /* jshint -W069 */
  console.log('slack-actions.js:... got', JSON.stringify(got));
  var inData = got['in'];
  var promises = [];
  for (var d of inData.data) {
    console.log('slackbot.js: data: ', d);
    if (d.value) {
      try {
        var msg = JSON.parse(d.value);
        console.log('slack-actions.js: msg: ', msg);
        promises.push(slack.postMessage('#'+msg.channel.id, 'Hello from Actions Bot'));
      } catch (err) {

      }
    }
  }
  return promises;
};
