import express from 'express';
import productRouter from './routes/productsRoutes.js';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/products', productRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})


