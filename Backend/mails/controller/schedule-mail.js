const cron = require('node-cron'); //scehdules tasks
const moment = require('moment'); // converts dates into cron format
const sendMailFunction = require('./send-mail')

const scheduleMail = (dateTime, users, template) => {
    const cronTime = moment(dateTime).format('m H D M *'); //mins hrs days mths alldays of week {2026-02-20 14:30 -> 30 14 20 02 *}

    cron.schedule(cronTime, async () => {
        await sendMailFunction(users, template);
    }); //trigger table in DB for scehduled jobs
};

module.exports = scheduleMail