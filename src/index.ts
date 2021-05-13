import dotenv from 'dotenv';
dotenv.config();

import app from './app';
import './database';

const port = process.env.PORT

function init() {
    app.listen(app.get('port'));
    console.log(`Server running http://localhost:${port}/api/`);
};

init();
