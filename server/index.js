import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import postRoutes from './routes/posts.js'

const app = express();
const PORT = process.env.PORT || 5000;
dotenv.config();
// All application level middleware

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(cors());
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(express.json());


// External middleware 

app.use('/posts',postRoutes);

// Database connection
mongoose
	.connect(process.env.MONGODB_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() =>
		app.listen(PORT, () =>
			console.log(
				`port :${PORT} in browser http://localhost:${PORT}`
			)
		)
	)
	.catch((err) => console.log(err));
