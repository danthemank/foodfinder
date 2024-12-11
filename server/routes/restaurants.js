import express from 'express';
import axios from 'axios';

const router = express.Router();

router.get('/search', async (req, res) => {
  const { lat, lng, radius, type, keyword } = req.query;
  
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json`,
      {
        params: {
          location: `${lat},${lng}`,
          radius: radius || 1500,
          type: 'restaurant',
          keyword,
          key: process.env.GOOGLE_PLACES_API_KEY
        }
      }
    );
    
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching restaurants' });
  }
});

router.get('/details/:placeId', async (req, res) => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/details/json`,
      {
        params: {
          place_id: req.params.placeId,
          fields: 'name,rating,formatted_address,formatted_phone_number,opening_hours,photos,price_level,reviews',
          key: process.env.GOOGLE_PLACES_API_KEY
        }
      }
    );
    
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching restaurant details' });
  }
});

export default router;
