import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectionDb } from "./config/db.js"; 
import userRoutes from "./routes/userRoutes/userRoute.js"; 

import productRoutes from "./routes/productRoutes/productRoutes.js"; 
import natureRoutes from "./routes/productRoutes/natureRoutes.js"; 
import typeRoutes from "./routes/productRoutes/typeRoutes.js"; 

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000; 

connectionDb();

const corsOptions = {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  allowedHeaders: ['Content-Type'],  
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(userRoutes);


app.use('/products', productRoutes); 
app.use(natureRoutes); 
app.use(typeRoutes); 

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
