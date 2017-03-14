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

  var botToken;

  got.lookup.forEach(function (lookup) {
    if (lookup.bucket === 'server' && lookup.data && lookup.data.key === 'slack/bot_access_token' && lookup.data.value) {
      botToken = lookup.data.value.toString();
    }
  });

console.log('botToken = ', botToken);
  var promises = [];
  for (var d of inData.data) {
    console.log('slackbot.js: data: ', d);
    if (d.value) {
      try {
        var msg = JSON.parse(d.value);
        console.log('slack-actions.js: msg: ', msg);
        promises.push(slack.postMessage('#'+msg.channel.id, 'Hello from sift-simplebot Actions Bot', null, botToken));
      } catch (err) {

      }
    }
  }
  return promises;
};
