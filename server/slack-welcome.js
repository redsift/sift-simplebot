/**
 * Simple Bot Sift welcome message. DAG's 'Slack' node implementation
 */

'use strict';

var slack = require('./slack.js');

// Entry point for DAG node
module.exports = function (got) {
  /* jshint camelcase: false */
  /* jshint -W069 */
  const inData = got['in'];

  var promises = [];
  var accountUuid;
  var accountEmail;
  var botToken;
  var userId;

  got.lookup.forEach(function (lookup) {
    if (lookup.bucket === 'server' && lookup.data && lookup.data.key === 'account/uuid' && lookup.data.value) {
      accountUuid = lookup.data.value.toString();
    } else if (lookup.bucket === 'server' && lookup.data && lookup.data.key === 'account/email' && lookup.data.value) {
      accountEmail = lookup.data.value.toString();
    }
  });

  console.log('slack-welcome.js: accountUuid: ', accountUuid);

  for (var d of inData.data) {
    console.log('slack-welcome.js: data: ', d);
    if (d.value) {
      try {
        var botInfo = d.value.toString();

        console.log('slack-welcome.js: botInfo: ', botInfo, d.key);
        if (d.key === 'slack/bot_access_token') {
          botToken = botInfo;
        } else if (d.key === 'slack/user_id') {
          userId = botInfo;
        }

      } catch (ex) {
        console.error('slack-welcome.js: Error parsing value for: ', d.key);
        console.error('slack-welcome.js: Exception: ', ex);
        continue;
      }
    }
  }

  promises.push(slack.postMessage(userId, 'Welcome my friend, welcome to the machine. Regards - sift-simplebot Bot. Your email is ' + accountEmail + ' and account is ' + accountUuid, null, botToken, true));

  return promises;
};
