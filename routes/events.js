const express = require('express');
const router = express.Router();

const axios = require('axios');

const FLAG_WORDS = ['orange'];

router.post('/', (req, res) => {
  const event = { ...req.body };

  if (event.type === 'CommentCreated') {
    const content = event.data.content.toLowerCase();
    const flagged = FLAG_WORDS.some((flag) => content.includes(flag));
    event.data.status = flagged ? 'REJECTED' : 'APPROVED';
    event.type = 'CommentModerated';
    axios.post('http://localhost:4005/events', event);
  }
  res.send({ status: 'OK' });
});

module.exports = router;
