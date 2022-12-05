/**Node package */
import express from 'express';
/**Google API */
import { PeopleAPI } from './GoogleAPI/People';
import { FitAPI } from './GoogleAPI/Fit';

const app:express.Express = express();
const port:number = 8000;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

/**PeopleAPI用 */
app.get("/api/People", async(req, res) => {
    const people = new PeopleAPI();
    const profile = await people.getPlofile();
    res.send(profile);
});

/**Fit API用 */
app.get("/api/Fit", (req, res) => {
    res.send('Hello Fit!');
    const fit = new FitAPI();
    fit.getUserData();
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});