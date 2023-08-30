import axios from 'axios';

export default async function handler(req, res) {
  try {
    const imageUrl = req.query.imageUrl;
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    const contentType = response.headers['content-type'];

    res.setHeader('Content-Type', contentType);
    res.status(200).send(response.data);
  } catch (error) {
    res.status(500).send('Error fetching and proxying image');
  }
}
