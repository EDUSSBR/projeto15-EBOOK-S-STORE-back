import { MailService } from '@sendgrid/mail';
import dotenv from 'dotenv'

dotenv.config()
const sgMail = new MailService()
console.log(process.env.SENDGRID_API_KEY)
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

export async function sendEmail(email, name, paymentType, cartItems, orderNumber) {
  try {
    let str = "";
    let total = 0;
    for (let item of cartItems) {
      total += Number(item.price) * Number(item.quantity)
      str += `<p>${item.name}: R$${item.price}</p> `
    }

    const message = `
    <h1>${name}, obrigado por seu pedido.</h1> 
    <p>Confirmamos que recebemos seu pedido #${orderNumber} e estamos trabalhando para processá-lo o mais rápido possível.</p>
    <h2>Dados do pedido:</h2>
    ${str}
    <p>Forma de pagamento: ${paymentType}</p>
    <p><strong>Total: R$${total},00</strong></p> 
    `
    const msg = {
      to: `${email}`,
      from: 'bls.dudu@gmail.com',
      subject: 'Compra realizada com sucesso!',
      html: message,
    }
    const emailSended = await sgMail.send(msg)
  } catch (e) {
    console.log("email service is not working properly")
    console.log(e)
  }
}