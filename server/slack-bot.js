/**
 * Simple Bot Sift. DAG's 'Slack' node implementation
 */

'use strict';

var slack = require('./slack.js');

// Entry point for DAG node
module.exports = function (got) {
  /* jshint camelcase: false */
  /* jshint -W069 */
  const inData = got['in'];

  var promises = [];
  var botToken;
  var accountUuid;
  var accountEmail;

  got.lookup.forEach(function (lookup) {
    if (lookup.bucket === 'server' && lookup.data && lookup.data.key === 'slack/bot_access_token' && lookup.data.value) {
      botToken = lookup.data.value.toString();
    } else if (lookup.bucket === 'server' && lookup.data && lookup.data.key === 'account/uuid' && lookup.data.value) {
      accountUuid = lookup.data.value.toString();
    } else if (lookup.bucket === 'server' && lookup.data && lookup.data.key === 'account/email' && lookup.data.value) {
      accountEmail = lookup.data.value.toString();
    }
  });

  console.log('slackbot.js: accountUuid: ', accountUuid);

  for (var d of inData.data) {
    console.log('slackbot.js: data: ', d);
    if (d.value) {
      try {
        var msg = JSON.parse(d.value);
        if (msg.subtype === 'message_deleted') {
          continue;
        }

        console.log('slackbot.js: msg: ', msg);

        var session_id = msg.channel + '-' + msg.user + '-' + Date.now();

        // remove <@..> direct mention
        msg.text = msg.text.replace(/(^<@.*>:\s+)/i, '');

        promises.push(slack.postMessage(msg.channel, 'Hello. Your email is ' + accountEmail + ', account is ' + accountUuid + '. Regards - sift-simplebot Bot', null, botToken));
      } catch (ex) {
        console.error('slackbot.js: Error parsing value for: ', d.key);
        console.error('slackbot.js: Exception: ', ex);
        continue;
      }
    }
  }
  return promises;
};
