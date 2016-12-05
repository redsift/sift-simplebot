/**
 * Simple Bot Sift. DAG's 'Slack' node implementation
 */

'use strict';

var slack = require('./slack.js');

// Entry point for DAG node
module.exports = function (got) {
  /* jshint camelcase: false */
  /* jshint -W069 */
  console.log('slackbot.js:... got', JSON.stringify(got));

  got.lookup.forEach(function (lookup) {
    if (lookup.data && lookup.data.value) {
      process.env._SLACK_BOT_TOKEN = lookup.data.value.toString();
    }
  });
  console.log('slackbot.js:... process.env._SLACK_BOT_TOKEN=', process.env._SLACK_BOT_TOKEN);
  const inData = got['in'];

  //console.log('MAP: inData...', inData);

  var promises = [];

  for (var d of inData.data) {
    console.log('slackbot.js: data: ', d);
    if (d.value) {
      try {
        var msg = JSON.parse(d.value);
        if (msg.subtype === 'message_deleted') {
          continue;
        }

        console.log('slackbot.js: msg: ', msg);

        // TODO: Hash session_id and lookup
        var session_id = msg.channel + '-' + msg.user + '-' + Date.now();

        // remove <@..> direct mention
        msg.text = msg.text.replace(/(^<@.*>:\s+)/i, '');

        promises.push(slack.postMessage(msg.channel, 'Hello from Simple Bot. Stay cool.'));
      } catch (ex) {
        console.error('slackbot.js: Error parsing value for: ', d.key);
        console.error('slackbot.js: Exception: ', ex);
        continue;
      }
    }
  }
  return promises;
};
