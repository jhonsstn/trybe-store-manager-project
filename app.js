const express = require('express');
const productRoutes = require('./routes/product-routes');
const saleRoutes = require('./routes/sale-routes');

const app = express();

app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productRoutes);

app.use('/sales', saleRoutes);

app.use((err, _req, res, _next) => {
  console.log('Log de Erro 500:', err);
  const {
    output: { payload },
  } = err;
  res.status(payload.statusCode).json({
    message: payload.message,
  });
});

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação
module.exports = app;
