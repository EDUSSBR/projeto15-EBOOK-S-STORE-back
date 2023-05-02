import { MailService } from '@sendgrid/mail';
import dotenv from 'dotenv'

dotenv.config()
const sgMail = new MailService()
console.log(process.env.SENDGRID_API_KEY)
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

export function sendEmail(email, name, paymentType, cartItems, orderNumber) {
  try {
    let str = "";
    let total = 0;
    for (let item of cartItems) {
      total += Number(item.price) * Number(item.quantity)
      str += `<p>${item.name}: R$${item.price}</p> `
    }

    const message = `
    <h1>${name}, Obrigado por seu pedido.</h1> 
    <p>Confirmamos que recebemos seu pedido #${orderNumber} e estamos trabalhando para processá-lo o mais rápido possível.</p>
    <h2>Dados do pedido:</h2>
    ${str}
    <p>Forma de pagamento: ${paymentType}</p>
    <p><strong>Total: ${total}</strong></p> 
    `
    const msg = {
      to: `${email}`,
      from: 'ebookstore@ebookstore.com',
      subject: 'Compra realizada com sucesso!',
      html: message,
    }
    console.log(msg)
    sgMail
      .send(msg)
      .then(() => {
        console.log('Email sent')
      })
      .catch((error) => {
        console.log("entrou aqui")
        console.error(error.body)
      })
  } catch (e) {
    console.log("email service is not working properly")
    console.log(e.body)
  }

}

const cart=[{name: "Hobbit", price: 200, quantity:2},{name: "Hobbit", price: 200, quantity:2},{name: "Hobbit", price: 200, quantity:2}]
sendEmail("bls.dudu@gmail.com", "Eduardo", "CreditCard", cart, '644a844c982c2750f6711758')
