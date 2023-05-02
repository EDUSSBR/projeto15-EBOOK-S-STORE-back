import { MailService } from '@sendgrid/mail';
import dotenv from 'dotenv'

dotenv.config()
const sgMail = new MailService()
console.log(process.env.SENDGRID_API_KEY)
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

export async function sendEmail(name, email, cart, paymentForm, orderNumber) {
  try {
    let str = "";
    let total = 0;
    let arrItems = []
    for (let item of cart) {
      total += Number(item.price) * Number(item.quantity)
      str += `
    <tr>
    <td><strong>${item.name}   </strong> </td>
    <td style={text-align:center} ><strong>${item.quantity}</strong> </td>
    <td><strong>${item.price}</strong> </td>
    </tr>
    `
    }

    const message = `
    <h1>${name}, obrigado por seu pedido.</h1> 
    <p>Confirmamos que recebemos seu pedido #${orderNumber} e estamos trabalhando para processá-lo o mais rápido possível.</p>
    <h2>Dados do pedido:</h2>
    <table>
    <tr>
    <th>Livro</th>
    <th>Qt.</th>
    <th>Preço(R$)</th>
    </tr>
    ${str}
    </table>
    <p>Forma de pagamento: ${paymentForm}</p>
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