const express = require('express');
const app = express();
const fs = require('fs');
const getStat = require('util').promisify(fs.stat);

app.use(express.static('public'));

// 10 * 1024 * 1024 // 10MB
// usamos um buffer minúsculo! O padrão é 64k
const highWaterMark =  200;

app.get('/audio', async (req, res) => {
  const filePath = './audio.ogg';
  const stat = await getStat(filePath, { highWaterMark });
  console.log(stat);

  res.writeHead(200, {
    'Content-Type': 'audio/ogg',
    'Content-Length': stat.size
  });

  const stream = fs.createReadStream(filePath);
  stream.on('end', () => console.log('acabou'));
  stream.pipe(res);
});

app.listen(3000, () => console.log('App na porta 3000'));
