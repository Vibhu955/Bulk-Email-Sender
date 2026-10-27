const transporter = require('../../utils/mailer');
const placeholders = require('../../utils/placeholders');

const sendMailFunction = async (users, template) => {
    for (const user of users) {
        const html = placeholders(template.body, user);
        // console.log(process.env.USER_EMAIL)
        await transporter.sendMail({
            from: process.env.USER_EMAIL,
            to: user.email,
            subject:`About ${template.name}`,
            html
        });
    }
};
module.exports = sendMailFunction;
