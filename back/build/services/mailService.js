import htmlEmail, { htmlWelcomeEmail } from '../utils/htmlEmail';
export async function sendWelcomeEmail(email, verificationtoken = '123-123-321') {
    const url = 'https://api.brevo.com/v3/smtp/email';
    const options = {
        method: 'POST',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            'api-key': process.env.BREVO_API_KEY ?? ''
        },
        body: JSON.stringify({
            sender: { name: 'SecureID', email: 'nc.equipo21@gmail.com' },
            replyTo: { email: 'nc.equipo21@gmail.com', name: 'Equipo 21' },
            to: [{ email: email, name: 'Nuevo Usuario' }],
            textContent: '¡Te damos la bienvenida SecureID! Tu registro se ha completado exitosamente!. Ahora verifica tu email.',
            subject: '¡Bienvenido a SecureId - Tu registro se ha completado!',
            htmlContent: htmlWelcomeEmail(email, verificationtoken)
        })
    };
    fetch(url, options)
        .then((res) => res.json())
        .then((json) => console.log(json))
        .catch((err) => console.error(err));
}
export async function sendEmail(email, messages, subject) {
    const url = 'https://api.brevo.com/v3/smtp/email';
    const options = {
        method: 'POST',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            'api-key': process.env.BREVO_API_KEY ?? ''
        },
        body: JSON.stringify({
            sender: { name: 'SecureID', email: 'nc.equipo21@gmail.com' },
            replyTo: { email: 'nc.equipo21@gmail.com', name: 'Equipo 21' },
            to: [{ email: email, name: 'Nuevo Usuario' }],
            textContent: '¡Te damos la bienvenida SecureID! Tu registro se ha completado exitosamente!. Ahora verifica tu email.',
            subject: subject,
            htmlContent: htmlEmail(messages)
        })
    };
    fetch(url, options)
        .then((res) => res.json())
        .then((json) => console.log(json))
        .catch((err) => console.error(err));
}
