const CronJob = require('cron').CronJob;
const User = require('./models/user');
const EmailHelper = require('./helpers/email_helper');

class CronJobs {
    static TIME_ZONE = 'Europe/Berlin';

    constructor() {
        this._registerExpiredSubscriptionsDeletion()
        this._registerSubscriptionsReport();
    }

    // Daily remove all unconfirmed entries older then three weeks
    _registerExpiredSubscriptionsDeletion() {
        const job = new CronJob('0 0 * * *', async function () {
            const threeWeeksAgo = new Date();
            threeWeeksAgo.setDate(threeWeeksAgo.getDate() - 21);

            const deletionResult = await User.deleteUnconfirmedBeforeDate(threeWeeksAgo);

            console.info(`Removed ${deletionResult.deletedCount} subscription user(s)`);
        }, null, true, CronJobs.TIME_ZONE);
        job.start();
    }

    // Daily email about subscriptions counts
    _registerSubscriptionsReport() {
        const job = new CronJob('0 0 * * *', async function () {
            const subcriptionCountTotal = await User.countDocuments();
            const subcriptionCountConfirmed = await User.countConfirmed();
            const subcriptionCountUnconfirmed = await User.countUnconfirmed();

            const html = `
              <p>Subscriptions total: ${subcriptionCountTotal}</p>
              <p>Subscriptions confirmed: ${subcriptionCountConfirmed}</p>
              <p>Subscriptions unconfirmed: ${subcriptionCountUnconfirmed}</p>
            `;

            EmailHelper.sendMailWithMailjet(
                'report@think-green.app',
                'think.green - Subscriptions Report',
                html,
                (err, info) => {
                    if (err) {
                        console.error(error);
                    }
                }
            );
        }, null, true, CronJobs.TIME_ZONE);
        job.start();
    }
}

module.exports = new CronJobs();