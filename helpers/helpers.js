const debug = require('debug');
const log = debug('email-service:helpers:');

const __request = require("request");

exports.Post = ({ url, headers, body }) => {
    return new Promise((resolve, reject) => {
        try {
            let options = {
                url     : url,
                headers : headers,
                body    : body,
                json    : true
            };
            __request.post(options, (err, res, body) => {
                if (err) {
                    log('Error', err);
                    reject(err);
                } else {
                    log('response', body);
                    resolve(body);
                }
            });
        } catch (error) {
            reject(error);
        }
    });
};