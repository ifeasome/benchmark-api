const router = require('express').Router();
const { suite } = require('../../config/benchmark');
const { bubbleSort, quickSort } = require('../../utils/sort');

router.get('/quick', (req, res) => {
  try {
    const numbers = [];
    const rounds = req.query.rounds;

    for (let i = 0; i < rounds; i++) {
      numbers.push(Math.floor(Math.random() * 10000) + 1);
    }

    suite
      .add('quick sort', function () {
        const testArray = [...numbers];
        quickSort(testArray);
      })
      .run();

    res
    .status(200)
    .json(
      `${suite[suite.length - 1].name} averaged ${
        suite[suite.length - 1].stats.mean * 1000
      } milliseconds.`
    );
  } catch (err) {
    res.status(500).end();
  }
});

module.exports = router;