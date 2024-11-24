const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const AylienNewsApi = require('aylien-news-api');

dotenv.config();

const app = express();
const PORT = 8081;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('dist'));


app.get('/', (req, res) => {
    res.sendFile(path.resolve('dist/index.html'));
});

const API_ID = process.env.AYLIEN_APP_ID;
const API_KEY = process.env.AYLIEN_APP_KEY;

const apiInstance = new AylienNewsApi.DefaultApi();
apiInstance.apiClient.authentications['app_id'].apiKey = API_ID;
apiInstance.apiClient.authentications['app_key'].apiKey = API_KEY;

app.post('/analyze', async (req, res) => {
    const { url } = req.body;

    if (!url) {
        return res.status(400).send({ error: 'URL is required for analysis.' });
    }

    console.log('URL received for analysis:', url);

    const opts = {
        linksIn: [url],
        language: ['en'],
    };

    try {
        apiInstance.listStories(opts, (error, data) => {
            if (error) {
                console.error('Error fetching from AYLIEN News API:', error.message);
                return res.status(500).send({ error: 'Failed to analyze the article.' });
            }

            if (data.stories && data.stories.length > 0) {
                const story = data.stories[0];
                console.log('Fetched story:', story);

                const sentiment = story.sentiment?.body || {};
                const entities = story.entities?.map((entity) => entity.title[0]?.text || 'N/A').join(', ') || 'N/A';
                const source = story.source?.name || 'N/A';
                const summary = story.summary?.sentences.join(' ') || 'N/A';
                const categories = story.categories?.map((cat) => cat.label).join(', ') || 'N/A';
                const keywords = story.keywords?.join(', ') || 'N/A';

                res.send({
                    polarity: sentiment.polarity || 'N/A',
                    subjectivity: sentiment.subjectivity || 'N/A',
                    source,
                    summary,
                    entities,
                    categories,
                    keywords,
                });
            } else {
                console.warn('No stories found for the given URL.');
                res.status(404).send({ error: 'No story found for the provided URL.' });
            }
        });
    } catch (error) {
        console.error('Unexpected error:', error.message);
        res.status(500).send({ error: 'Unexpected error occurred while analyzing the article.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
