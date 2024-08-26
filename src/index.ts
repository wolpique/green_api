import express from "express"
import { runDb } from "./db"
import cors from "cors";

const app = express()

app.use(express.json())
app.use(cors())

app.get('/:idInstance/getSettings/:apiTokenInstance', async (req, res) => {
    const { idInstance, apiTokenInstance } = req.params
    const apiUrl = `https://api.green-api.com/waInstance${idInstance}/getSettings/${apiTokenInstance}`;
    const response = await fetch(apiUrl);
    if (!response.ok) {
        return res.status(400).json({ error: 'Ошибка при получении настроек' })
    }
    const data = await response.json()
    return res.json(data);
});

app.get('/:idInstance/getStateInstance/:apiTokenInstance', async (req, res) => {
    const { idInstance, apiTokenInstance } = req.params
    const apiUrl = `https://api.green-api.com/waInstance${idInstance}/getStateInstance/${apiTokenInstance}`
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
        return res.status(400).json({ error: 'Ошибка при получении состояния инстанса' })
    }
    const data = await response.json()
    return res.json(data)
});

app.post('/:idInstance/sendMessage/:apiTokenInstance', async (req, res) => {
    const { idInstance, apiTokenInstance } = req.params
    const { chatId, message } = req.body;
    const apiUrl = `https://api.green-api.com/waInstance${idInstance}/sendMessage/${apiTokenInstance}`
    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            chatId: chatId + "@c.us", 
            message 
        })
    })
    if (!response.ok) {
        return res.status(400).json({ error: 'Ошибка при отправке сообщения' })
    }
    const data = await response.json()
    return res.json(data);
})

app.post('/:idInstance/sendFileByUrl/:apiTokenInstance/', async  (req, res) => {
    const { idInstance, apiTokenInstance } = req.params
    const {chatId, urlFile, fileName } = req.body;
    const apiUrl = `https://api.green-api.com/waInstance${idInstance}/sendFileByUrl/${apiTokenInstance}`
    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            chatId: chatId + "@c.us", 
            urlFile, 
            fileName })
    })

    if (!response.ok) {
        return res.status(400).json({ error: 'Ошибка при отправке файла' })
    }
    const data = await response.json()
    return res.json(data);
})

const port = 3000;
app.listen(port, async () => {
    await runDb();
    console.log(`Listen on port ${port}`);
});

