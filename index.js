const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const OpenAI = require('openai');

const client = new Client({
    authStrategy: new LocalAuth()
});

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('🤖 Bot Ready!');
});

client.on('message', async message => {
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: "Reply in Hindi, short and smart." },
                { role: "user", content: message.body }
            ]
        });

        message.reply(response.choices[0].message.content);
    } catch (e) {
        message.reply("Error 😅");
    }
});

client.initialize();
