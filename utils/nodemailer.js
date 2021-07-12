const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
	service:  process.env.MAILER_SERVICE,
	host:  process.env.MAILER_HOST,
	auth: {
		user: process.env.MAILER_USER_SERVER,
        pass: process.env.MAILER_PASS_SERVER
	},
})

module.exports = {
	transporter
}
