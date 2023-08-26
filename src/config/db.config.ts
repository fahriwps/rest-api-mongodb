import dotenv from 'dotenv'

dotenv.config();
export const DBConfig = {
    mongoURI: process.env.DB_URI as string,
    secretKey: process.env.SECRET_KEY as string,
    port: +process.env.PORT!
};
