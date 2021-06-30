const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
	host: "smtp.ethereal.email",
	port: 587,
	secure: false,
	auth: {
		user: 'daphnee.tromp@ethereal.email',
        pass: process.env.MAILER_TEST_PASS
	},
})

module.exports = {
	transporter
}
