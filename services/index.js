const debug = require('debug');
const log = debug('email-service:services:');

const { Email_config, Logs } = require('../models');

const { validateEmail } = require('../helpers/formatter');

const { isArray } = require('lodash');
const nodemailer = require('nodemailer');

async function Create (mailData, user) {
    const {
        host,
        username,
        password,
        port,
        webmail = 'http://webmail.hanatekindo.co.id',
        template,
        template_footer
    } = mailData;
    log('[Mail] Create', { mailData, user });
    try {
        const created = await Email_config.create({
            host,
            user: username,
            password,
            port,
            tls: true,
            webmail,
            template,
            template_footer
        });

        await Logs.create({
            ip_address: user.ip_address,
            browser: user.browser,
            browser_version: user.browser_version,
            os: user.os,
            logdetail: `(Tambah) email konfigurasi dengan host ${host}.`,
            user_id: user.id
        });

        return {
            message: 'Email konfigurasi berhasil dibuat.',
            data: await Email_config.findOne({
                where: { id: created.id },
                raw: true
            })
        };
    } catch (error) {
        return error;
    }
}

async function Update (mail_id, mailData, user) {
    const {
        host,
        username,
        password,
        port,
        webmail = 'http://webmail.hanatekindo.co.id',
        template,
        template_footer
    } = mailData;
    log('[Mail] Update', { mail_id, mailData, user });
    try {
        const checkMailConfig = await Email_config.findOne({ 
            where: { id: mail_id },
            raw: true
        })
        if (!checkMailConfig) throw { error: 'Email konfigurasi tidak tersedia.' };

        await Email_config.update({
            host,
            user: username,
            password,
            port,
            webmail,
            template,
            template_footer
            },
            { where: { id: mail_id } }
        );

        await Logs.create({
            ip_address: user.ip_address,
            browser: user.browser,
            browser_version: user.browser_version,
            os: user.os,
            logdetail: `(Update) email konfigurasi dengan host ${host}.`,
            user_id: user.id
        });

        return {
            message: 'Email konfigurasi berhasil diubah.',
            data: await Email_config.findOne({
                where: { id: checkMailConfig.id },
                raw: true
            })
        };
    } catch (error) {
        return error;
    }
}

async function Get () {
    log('[Mail] Get');
    try {
        const mailConfig = await Email_config.findAll({ raw: true });
        
        return mailConfig;
    } catch (error) {
        return error;
    }
}

async function GetById (mail_id) {
    log('[Mail] GetById', mail_id);
    try {
        const checkMailConfig = await Email_config.findOne({ 
            where: { id: mail_id },
            raw: true
        })
        if (!checkMailConfig) throw { error: 'Email konfigurasi tidak tersedia.' };

        return checkMailConfig;
    } catch (error) {
        return error;
    }
}

async function Forward (mailData, user) {
    const { 
        to, 
        subject,
        body 
    } = mailData;
    log('[Mail] Forward', { mailData, user });
    try {
        if (!to || !subject || !body) throw { error: 'Form harus diisi.' };

        if (!isArray(to)) throw { error: 'Email penerima harus berupa array.' };

        const email = validateEmail(to);
        if (email == false) throw { error: 'Format email tidak sesuai.' };
        
        const sendMail = await SendMail(mailData);

        if (!sendMail) return { error: 'Email gagal dikirim.' };

        return { message: sendMail };
    } catch (error) {
        return error;
    }
}

async function SendMail (mailData) {
    log('[Mail] SendMail', mailData);
    try {
        const transporter = nodemailer.createTransport({
            host: config.smtp.host,
            port: config.smtp.port,
            secure: true,
            // service: config.smtp.service,
            auth: {
                user: config.smtp.user,
                pass: config.smtp.password
            },
            tls: {
                ciphers: "SSLv3"
            }
        });

        const mailOptions = {
            from: config.smtp.user,
            to: mailData.to,
            subject: mailData.subject,
            text: mailData.body
        } 
        const mail = await transporter.sendMail(mailOptions);

        return mail;
    } catch (error) {
        return error;
    }
}

module.exports = {
    Create,
    Update,
    Get,
    GetById,
    Forward
}