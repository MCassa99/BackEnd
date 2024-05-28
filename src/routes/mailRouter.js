import { Router } from "express";
import varenv from '../dotenv.js';
import nodemailer from 'nodemailer'
import { __dirname } from '../path.js'


const mailRouter = Router();

const transporter = nodemailer.createTransport({
     service: 'gmail',
     port: 587,
     auth: {
          user: varenv.emailUser,
          pass: varenv.emailPassword
     }
});

mailRouter.get('/sendMail', async (req, res) => {
     const mail = await transporter.sendMail({
          from: 'Test Coder <mcassa1999@gmail.com>',
          to: 'mcassa1999@gmail.com',
          subject: 'Test',
          html: `
               <div>
                    <h1>Test</h1>
                    <p>Esto es una prueba</p>
               </div>
          `,
          attachments: [
               { 
                    /*Se envio una foto, puede ser PDF con facturas, etc*/
                    filename: 'Sender-logo.jpg',
                    path: __dirname + '/public/images/Sender-logo.jpg',
                    cid: 'logo'
               }
          ]
     });
     res.status(200).send('Mail enviado correctamente');
});

export default mailRouter;