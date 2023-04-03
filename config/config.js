require('dotenv').config();

module.exports = {
    development: {
        myConfig: {
            sessionSecret: "topSecret!",
            refreshSessionSecret: "topSecret!",
            expiredSessionTime: "24h",
            expiredRefreshSessionTime: "24h" 
        },
        imap: {
            username: process.env.IMAP_USER,
            password: process.env.IMAP_PASSWORD,
            host: process.env.IMAP_HOST,
            port: process.env.IMAP_PORT,
            // service: process.env.IMAP_SERVICE,
            // tls: true,
            connTimeout: 1000, // Default by node-imap
            authTimeout: 1000,
            socketTimeout: 0,
            keepalive: true,
            tlsOptions: { rejectUnauthorized: false },
            mailbox: "INBOX",
            searchFilter: ["UNSEEN"], 
            markSeen: true
        },
        smtp: {
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            // service: process.env.SMTP_SERVICE,
            user: process.env.SMTP_USER,
            password: process.env.SMTP_PASSWORD
        },
        ticket_service: process.env.ticket_service,
        user_service: process.env.user_service
    },
    production: {
        myConfig: {
            sessionSecret: "topSecret!",
            refreshSessionSecret: "topSecret!",
            expiredSessionTime: "2h",
            expiredRefreshSessionTime: "3h" 
        },
        imap: {
            username: process.env.IMAP_USER,
            password: process.env.IMAP_PASSWORD,
            host: process.env.IMAP_HOST,
            port: process.env.IMAP_PORT,
            // service: process.env.IMAP_SERVICE,
            // tls: true,
            connTimeout: 1000, // Default by node-imap
            authTimeout: 1000,
            socketTimeout: 0,
            keepalive: true,
            tlsOptions: { rejectUnauthorized: false },
            mailbox: "INBOX",
            searchFilter: ["UNSEEN"], 
            markSeen: true
        },
        smtp: {
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            // service: process.env.SMTP_SERVICE,
            user: process.env.SMTP_USER,
            password: process.env.SMTP_PASSWORD
        },
        ticket_service: process.env.ticket_service,
        user_service: process.env.user_service
    }
}   