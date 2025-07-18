const express = require('express');
const cors = require('cors');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

const aidatsPath = './data/aidats.json';
const transactionsPath = './data/transactions.json';
const balancePath = './data/balance.json';


const aidatUcret = 200; // Aidat ücreti

  const months = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran","Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"]
  const currentMonth = new Date().getMonth();

app.get('/api/ok', (req, res) => {
    res.json({ loading: true, message: 'Sunucu çalışıyor.' });
});

app.get('/api/aidat-status', (req, res) => {
    fs.readFile(aidatsPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading aidats file:', err);
            return res.status(500).send('Internal Server Error');
        }
        res.json(JSON.parse(data));
    });
});

app.get('/api/balance', (req, res) => {
    fs.readFile(balancePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading balance file:', err);
            return res.status(500).send('Internal Server Error');
        }
        res.json(JSON.parse(data));
    });
});

app.post('/api/aidats/:id/ver', (req, res) => {
    const data = JSON.parse(fs.readFileSync(aidatsPath));
    const person = data.find(item => item.id == req.params.id);
    if (!person) return res.status(404).json({ message: 'Bulunamadı' });
    person.status = true;
    person.date = new Date().toISOString();
    const balanceData = JSON.parse(fs.readFileSync(balancePath));
    balanceData.amount += aidatUcret;
    fs.writeFileSync(balancePath, JSON.stringify(balanceData, null, 2));
    // son islemler

    const recentTransaction = JSON.parse(fs.readFileSync(transactionsPath));
    
    const newTransaction = {
        id: Date.now(),
        desc: `${person.name} ${months[currentMonth]} ayı aidat ödemesi`,
        cost: aidatUcret,
        status: 'gelir',
        deleted: false,
        date: new Date().toISOString()
    };

    fs.writeFileSync(balancePath, JSON.stringify(balanceData, null, 2));
    recentTransaction.push(newTransaction);
    fs.writeFileSync(transactionsPath, JSON.stringify(recentTransaction, null, 2));

    res.json({ message: 'İşlem eklendi.', transaction: newTransaction });

    // aidat guncellemesi
    fs.writeFileSync(aidatsPath, JSON.stringify(data, null, 2));
    res.json({ message: 'Aidat verildi olarak işaretlendi.' });
});

app.post('/api/aidats-reset', (req, res) => {
    const data = JSON.parse(fs.readFileSync(aidatsPath));
    data.forEach(item => {
        item.status = false;
        item.date = null;
    });
    fs.writeFileSync(aidatsPath, JSON.stringify(data, null, 2));
    res.json({ message: 'Aidatlar sıfırlandı.' });
});

app.get('/api/transactions', (req, res) => {
    const data = JSON.parse(fs.readFileSync(transactionsPath));
    res.json(data);
});


app.post('/api/transactions-add', (req, res) => {
    const data = JSON.parse(fs.readFileSync(transactionsPath));
    const newTransaction = {
        ...req.body
    };
    const balanceData = JSON.parse(fs.readFileSync(balancePath));
    balanceData.amount += req.body.status === 'gelir' ? req.body.cost : -req.body.cost;
    fs.writeFileSync(balancePath, JSON.stringify(balanceData, null, 2));
    data.push(newTransaction);
    fs.writeFileSync(transactionsPath, JSON.stringify(data, null, 2));
    res.json({ message: 'İşlem eklendi.', transaction: newTransaction });
});


app.delete('/api/transactions-delete/:id', (req, res) => {
    // 1. İşlemler dosyasını oku
    const transactions = JSON.parse(fs.readFileSync(transactionsPath));
    const balanceData = JSON.parse(fs.readFileSync(balancePath));

    // 2. Silinecek işlemi bul
    const index = transactions.findIndex(t => t.id == req.params.id);
    if (index === -1) return res.status(404).json({ message: 'İşlem bulunamadı.' });
    const deletedTransaction = transactions[index];
    transactions.splice(index, 1);
    if (deletedTransaction.status === 'gelir') {
        balanceData.amount -= deletedTransaction.cost;
    } else if (deletedTransaction.status === 'gider') {
        balanceData.amount += deletedTransaction.cost;
    }

    fs.writeFileSync(transactionsPath, JSON.stringify(transactions, null, 2));
    fs.writeFileSync(balancePath, JSON.stringify(balanceData, null, 2));

    res.json({ message: 'İşlem silindi ve bakiye güncellendi.' });
});


app.listen(PORT, () => {
    console.log(`✅ Sunucu http://localhost:${PORT} adresinde çalışıyor.`);
});