CREATE PROCEDURE `fundamental_analysis.GetDividendAnalysis` (IN_STOCK_CODE STRING) 
BEGIN 
  SELECT STOCK_CODE, 
         COMPANY, 
         SECTOR, 
         SECOND_SECTOR, 
         STOCK_PRICE, 
         STOCK_TYPE, 
         VALUATION, 
         STOCK_AVAILABLE_VOLUME, 
         VOL_NEGOTIATED_LAST_21, 
         DIVIDEND_LAST_PRICE, 
         COMPANY_NET_PROFIT, 
         DIVIDEND_YELD, 
         DIVIDEND_AVG_PAYOUT_12_MOS, 
         DIVIDEND_AVG_PAYOUT_5_YRS, 
         MAJOR_SHARE_HOLDER, 
         COMPANY_ROE, 
         COMPANY_ROE_5_YRS, 
         COMP_GROSSDEBT_EBTIDA, 
         DIVIDEND_YIELD_5_YRS, 
         HAS_DIVIDEND_SRD_5_YRS, 
         HAS_DIVIDEND_GRWTH_5_YRS, 
         HAS_NET_PROFIT_REG_5_YRS, 
         DT_LAST_UPDATE 
  FROM   `fundamental_analysis.dividends` 
  WHERE  STOCK_CODE = IFNULL(IN_STOCK_CODE, STOCK_CODE) 
         AND DT_LAST_UPDATE = (SELECT DISTINCT DT_LAST_UPDATE 
                               FROM   `fundamental_analysis.dividends` 
                               ORDER  BY DT_LAST_UPDATE DESC 
                               LIMIT  1); 
END; 