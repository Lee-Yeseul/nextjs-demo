import { MongoClient } from 'mongodb';

// 서버에서만 코드가 돌아감 디코드해도 클라이언트에게 노출되지 않음
//api/new-meetup
// POST/api/new-meetup
// 'mongodb+srv://yeseul:<password>@cluster0.h2wupcg.mongodb.net/?retryWrites=true&w=majority'
async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;

    const client = await MongoClient.connect(
      'mongodb+srv://yeseul:0309@cluster0.h2wupcg.mongodb.net/?retryWrites=true&w=majority'
    );
    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const result = await meetupsCollection.insertOne(data);
    console.log(result);

    client.close();

    res.status(201).json({ message: 'Meetup inserted!' });
  }
}

export default handler;
