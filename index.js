const express = require('express');
const app = express();
const port = 3000;

app.set('trust proxy', true);

app.use((req, res, next) => {
  const start = Date.now();
  const ips = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const ip = Array.isArray(ips) ? ips[0].replace(/^::ffff:/, '') : ips.replace(/^::ffff:/, '');
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[ ${ip} ] ${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`);
  });
  next();
});

app.use(express.json({ space: 2 }));

app.get('*', require('./case'));

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
