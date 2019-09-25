/**
 * substring js file created by Tamara G. Mack on 24-Sep-19 for
 * tamaramack.github.io
 */

module.exports = {
  baseUrl: '/substring',
  '/:length': length,
  '/:length/:count': lengthCount,
  '/:length/:start,:end': lengthStartEnd,
};

const data = (file) => require(`../data/${ file }.json`);

function length(req, res) {
  const {length} = req.params;
  const lenData = data(length);

  res.json(lenData);
}

function lengthCount(req, res) {
  const {length, count} = req.params;
  const lenData = data(length);

  res.json(lenData);
}

function lengthStartEnd(req, res) {
  const {length, start, end} = req.params;
  const lenData = data(length);

  res.json(lenData);
}
