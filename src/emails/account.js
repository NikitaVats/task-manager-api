const sgMail = require('@sendgrid/mail')
const sendgridAPIKey="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"
sgMail.setApiKey(sendgridAPIKey)
const sendWelcomeEmail=(email,name)=>{
    sgMail.send({
    to:email,
    from:'nikitavats03@gmail.com',
    subject:'Thisismyfirstcreation!',
    text:'I hope customer '+name+ ' actually get to you'
})}
module.exports=sendWelcomeEmail