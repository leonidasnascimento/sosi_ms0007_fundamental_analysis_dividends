var express = require('express');
var router = express.Router();
var dividends = require('../data/dividends_data');
var HttpStatus = require('http-status-codes');

/* GET home page. */
router.get('/', function (req, res, next) {
  var stock_code = ""

  if ((Object.keys(req.query).length > 0) || (Object.keys(req.query).indexOf("code") > 0)) {
    stock_code = req.query["code"]
  }

  new dividends().get_dividend_analysis(stock_code, (result) => {
    res.status(HttpStatus.OK).type("json").send(JSON.stringify(result))
  }, (error) => {
    console.error(error)
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error)
  });
});

module.exports = router;