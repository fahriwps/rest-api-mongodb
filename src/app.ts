import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose,{ ConnectOptions } from 'mongoose';
import { DBConfig } from './config/db.config';
import routes from "./routes/main.route";
import compression from 'compression';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import specs from './config/swagger.config';


const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(compression());
app.use(helmet());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use(routes);

mongoose.connect(DBConfig.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true } as ConnectOptions)
    .then(() => {
        app.listen(DBConfig.port, (): void => {
            console.log('Server is running on port:', DBConfig.port);
        });
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error);
    });
