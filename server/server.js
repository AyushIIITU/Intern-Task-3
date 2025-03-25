import express from 'express';
import bodyParser from 'body-parser';
// import { configDotenv } from 'dotenv';
import dotenv from 'dotenv';

dotenv.config();
import cors from 'cors';

import db from './DB/db.js';
// connectDB();
// import { taskRoutes } from './Apis/Routes/task.routes.js';
import taskRoutes from './Apis/Routes/task.routes.js';
const app = express();
app.use(bodyParser.json());
app.use(cors());

const PORT=process.env.PORT || 3000;
app.use(taskRoutes);
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});

