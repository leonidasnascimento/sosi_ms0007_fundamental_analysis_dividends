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
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error)
  });
});

router.get('/dividend_history', function (req, res, next) {
  var stock_code = ""

  if ((Object.keys(req.query).length > 0) || (Object.keys(req.query).indexOf("code") > 0)) {
    stock_code = req.query["code"]
  }else{
    res.status(HttpStatus.BAD_REQUEST).type("json").send(JSON.stringify("Stock code is required"))
  }

  new dividends().get_dividend_analysis_history(stock_code, (result) => {
    res.status(HttpStatus.OK).type("json").send(JSON.stringify(result))
  }, (error) => {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error)
  });
});

router.post('/', function (req, res, next) {
  if (!("stock_code" in req.body)) {
    res.status(HttpStatus.BAD_REQUEST).send("Field 'stock_code' is required");
    return;
  }

  if (!("company" in req.body)) {
    res.status(HttpStatus.BAD_REQUEST).send("Field 'company' is required");
    return;
  }

  if (!("sector" in req.body)) {
    res.status(HttpStatus.BAD_REQUEST).send("Field 'sector' is required");
    return;
  }

  if (!("second_sector" in req.body)) {
    res.status(HttpStatus.BAD_REQUEST).send("Field 'second_sector' is required");
    return;
  }

  if (!("stock_price" in req.body)) {
    res.status(HttpStatus.BAD_REQUEST).send("Field 'stock_price' is required");
    return;
  }

  if (!("stock_type" in req.body)) {
    res.status(HttpStatus.BAD_REQUEST).send("Field 'stock_type' is required");
    return;
  }

  if (!("valuation" in req.body)) {
    res.status(HttpStatus.BAD_REQUEST).send("Field 'valuation' is required");
    return;
  }

  if (!("stock_available_volume" in req.body)) {
    res.status(HttpStatus.BAD_REQUEST).send("Field 'stock_available_volume' is required");
    return;
  }

  if (!("vol_negotiated_last_21" in req.body)) {
    res.status(HttpStatus.BAD_REQUEST).send("Field 'vol_negotiated_last_21' is required");
    return;
  }

  if (!("dividend_last_price" in req.body)) {
    res.status(HttpStatus.BAD_REQUEST).send("Field 'dividend_last_price' is required");
    return;
  }

  if (!("company_net_profit" in req.body)) {
    res.status(HttpStatus.BAD_REQUEST).send("Field 'company_net_profit' is required");
    return;
  }

  if (!("dividend_yield" in req.body)) {
    res.status(HttpStatus.BAD_REQUEST).send("Field 'dividend_yeld' is required");
    return;
  }

  if (!("dividend_avg_payout_12_mos" in req.body)) {
    res.status(HttpStatus.BAD_REQUEST).send("Field 'dividend_avg_payout_12_mos' is required");
    return;
  }

  if (!("dividend_avg_payout_5_yrs" in req.body)) {
    res.status(HttpStatus.BAD_REQUEST).send("Field 'dividend_avg_payout_5_yrs' is required");
    return;
  }

  if (!("major_share_holder" in req.body)) {
    res.status(HttpStatus.BAD_REQUEST).send("Field 'major_share_holder' is required");
    return;
  }

  if (!("company_roe" in req.body)) {
    res.status(HttpStatus.BAD_REQUEST).send("Field 'company_roe' is required");
    return;
  }

  if (!("company_roe_5_yrs" in req.body)) {
    res.status(HttpStatus.BAD_REQUEST).send("Field 'company_roe_5_yrs' is required");
    return;
  }

  if (!("comp_grossdebt_ebtida" in req.body)) {
    res.status(HttpStatus.BAD_REQUEST).send("Field 'comp_grossdebt_ebtida' is required");
    return;
  }

  if (!("dividend_yield_5_yrs" in req.body)) {
    res.status(HttpStatus.BAD_REQUEST).send("Field 'dividend_yield_5_yrs' is required");
    return;
  }

  if (!("has_dividend_srd_5_yrs" in req.body)) {
    res.status(HttpStatus.BAD_REQUEST).send("Field 'has_dividend_srd_5_yrs' is required");
    return;
  }

  if (!("has_dividend_grwth_5_yrs" in req.body)) {
    res.status(HttpStatus.BAD_REQUEST).send("Field 'has_dividend_grwth_5_yrs' is required");
    return;
  }

  if (!("has_net_profit_reg_5_yrs" in req.body)) {
    res.status(HttpStatus.BAD_REQUEST).send("Field 'has_net_profit_reg_5_yrs' is required");
    return;
  }

  new dividends().set_dividend_analysis(req.body.stock_code, req.body.company, req.body.sector, req.body.second_sector, req.body.stock_price, req.body.stock_type, req.body.valuation, req.body.stock_available_volume, req.body.vol_negotiated_last_21, req.body.dividend_last_price, req.body.company_net_profit, req.body.dividend_yield, req.body.dividend_avg_payout_12_mos, req.body.dividend_avg_payout_5_yrs, req.body.major_share_holder, req.body.company_roe, req.body.company_roe_5_yrs, req.body.comp_grossdebt_ebtida, req.body.dividend_yield_5_yrs, req.body.has_dividend_srd_5_yrs, req.body.has_dividend_grwth_5_yrs, req.body.has_net_profit_reg_5_yrs, (result) => {
    res.status(HttpStatus.OK).type("json").send(JSON.stringify(result))
  }, (error) => {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).type("json").send(JSON.stringify(error))
  });
});

module.exports = router;