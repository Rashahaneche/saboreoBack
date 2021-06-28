const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
	host: "smtp.ethereal.email",
	port: 587,
	secure: false,
	auth: {
		user: 'daphnee.tromp@ethereal.email',
        pass: 'qeSYrUY7ayMchn988Q'
	},
})

module.exports = {
	transporter
}
