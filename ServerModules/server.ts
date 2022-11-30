import express from 'express';

import { PeopleAPI } from './GoogleAPI/PeopleAPI';

const app:express.Express = express();
const port:number = 8000;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

/**PeopleAPI用 */
app.get("/api/People", async(req, res) => {
    /**request for API */
    const peopleAPI = new PeopleAPI();
    const userPhotoUrl = await peopleAPI.getPhotoURL();
    /**create body */
    const body: {} = {
        "url": userPhotoUrl
    }
    res.send(body);
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});