const nodemailer = require('nodemailer');

// Создаем транспорт для SMTP сервера (Gmail)
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true для 465, false для других портов
    auth: {
        user: 'muxriddinshavkatov1@gmail.com',
        pass: 'mukhriddin20070106'
    }
});

// Определяем параметры письма
const mailOptions = {
    from: 'ilyosovamalshox@gmail.com',
    to: 'recipient_email@example.com',
    subject: 'а ты знал что ты даун ?',
    text: 'Нет не знал >:)'
};

// Отправляем письмо
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.log(error);
        console.error('Ошибка при отправке письма:', error);
    } else {
        console.log('Письмо успешно отправлено:', info.response);
    }
});