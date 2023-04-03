const debug = require('debug');
const log = debug('email-service:');

const MailListener = require('mail-listener-fixed');
const { convert } = require('html-to-text');
const jwt = require('jsonwebtoken');

const { Post } = require('../helpers/helpers');

const access_token = jwt.sign({ access: true }, config.myConfig.sessionSecret, {});
const headers = { simandesk_token: access_token };

module.exports = {
    ReadEmail: async () => {
        try {
            const mail = new MailListener(config.imap);

            mail.start();

            mail.on('server:connected', () => {
                log('Imap Connected');
                // resolve(true);
            });

            mail.on('server:disconnected', (error) => {
                log('Imap Disconnected', error);
                setTimeout(function() {
                    log("Trying to establish imap connection again");
                    mail.restart();
                }, 5 * 1000);
            });

            mail.on('error', (err) => {
                log('Connection error', err);
            });

            // mail.on('mailbox', (mailbox) => {
            //     log('Total number of email', mailbox.messages.total);
            // });

            mail.on("mail", async (data) => {
                if (data.subject == 'Re: Tiket Berhasil') {
                    log('Not Allowed.');
                } else {
                    const sendTiket = await Post({
                        url: config.ticket_service,
                        headers,
                        body: {
                            judul: data.subject ? data.subject : '',
                            detail: data.text ? convert(data.text) : '',
                            nama_pelapor: data.from[0].address.split('@')[0],
                            email: data.from[0].address ? data.from[0].address : '',
                            type: 'email'
                        }
                    });

                    await Post({
                        url: config.user_service,
                        headers,
                        body: {
                            ip_address: '-', 
                            browser: '-',
                            browser_version: '-',
                            os: '-',
                            logdetail: `(Open) tiket via email dengan pengirim ${data.from[0].address}.`,
                            email: data.from[0].address ? data.from[0].address : ''
                        }
                    });
                    
                    return sendTiket;
                }
            });
        } catch (error) {
            log('error', error);
            throw error;
        }
    }
}