const {
    Connection,
    Request
} = require("tedious");

// Create connection to database
const config = {
    authentication: {
        options: {
            userName: "sosi",
            password: "L&on!das01"
        },
        type: "default"
    },
    server: "sosi-db.database.windows.net", // update me
    options: {
        database: "fundamental-analysis", //update me
        encrypt: true
    }
};

const execute_query = function (query, call_back) {
    var return_lst = []
    var connection = new Connection(config);

    connection.on("connect", err => {
        if (err) {
            throw new Error(err.message)
        } else {
            const request = new Request(query,
                (err, rowCount) => {
                    if (err) {
                        throw new Error(err.message)
                    } else {
                        connection.close()
                        call_back(return_lst);
                    }
                }
            );

            request.on("row", (columns) => {
                var row = {}

                columns.forEach(column => {
                    row[column.metadata.colName] = column.value
                });

                return_lst.push(row)
            });

            request.on("doneInProc", (rowCount, more, rows) => {})

            connection.execSql(request);
        }
    });
}

module.exports = class {
    get_dividend_analysis(stock_code, on_success, on_error) {
        try {
            var query = "EXECUTE [dbo].[sp_get_dividend_analysis] @stock_code = '" + stock_code + "';"

            execute_query(query, (result) => {
                on_success(result)
            });
        } catch (error) {
            on_error(error)
        }
    }

    get_dividend_analysis_history(stock_code, on_success, on_error) {
        try {
            var query = "EXECUTE [dbo].[Sp_get_hist_dividend_analysis] @stock_code = '" + stock_code + "';"

            execute_query(query, (result) => {
                on_success(result)
            });
        } catch (error) {
            on_error(error)
        }
    }

    set_dividend_analysis(stock_code, company, sector, second_sector, stock_price, stock_type, valuation, stock_available_volume, vol_negotiated_last_21, dividend_last_price, company_net_profit, dividend_yeld, dividend_avg_payout_12_mos, dividend_avg_payout_5_yrs, major_share_holder, company_roe, company_roe_5_yrs, comp_grossdebt_ebtida, dividend_yield_5_yrs, has_dividend_srd_5_yrs, has_dividend_grwth_5_yrs, has_net_profit_reg_5_yrs, on_success, on_error) {
        try {
            var query = "EXECUTE [dbo].[SP_INSERT_DIVIDEND_ANALYSIS]"
            query = query + "  @STOCK_CODE = '" + stock_code + "'"
            query = query + " ,@COMPANY = '" + company + "'"
            query = query + " ,@SECTOR = '" + sector + "'"
            query = query + " ,@SECOND_SECTOR = '" + second_sector + "'"
            query = query + " ,@STOCK_PRICE = " + stock_price + ""
            query = query + " ,@STOCK_TYPE = '" + stock_type + "'"
            query = query + " ,@VALUATION = " + valuation + ""
            query = query + " ,@STOCK_AVAILABLE_VOLUME = " + stock_available_volume + ""
            query = query + " ,@VOL_NEGOTIATED_LAST_21 = " + vol_negotiated_last_21 + ""
            query = query + " ,@DIVIDEND_LAST_PRICE = " + dividend_last_price + ""
            query = query + " ,@COMPANY_NET_PROFIT = " + company_net_profit + ""
            query = query + " ,@DIVIDEND_YELD = " + dividend_yeld + ""
            query = query + " ,@DIVIDEND_AVG_PAYOUT_12_MOS = " + dividend_avg_payout_12_mos + ""
            query = query + " ,@DIVIDEND_AVG_PAYOUT_5_YRS = " + dividend_avg_payout_5_yrs + ""
            query = query + " ,@MAJOR_SHARE_HOLDER = '" + major_share_holder + "'"
            query = query + " ,@COMPANY_ROE = " + company_roe + ""
            query = query + " ,@COMPANY_ROE_5_YRS = " + company_roe_5_yrs + ""
            query = query + " ,@COMP_GROSSDEBT_EBTIDA = " + comp_grossdebt_ebtida + ""
            query = query + " ,@DIVIDEND_YIELD_5_YRS = " + dividend_yield_5_yrs + ""
            query = query + " ,@HAS_DIVIDEND_SRD_5_YRS = " + has_dividend_srd_5_yrs + ""
            query = query + " ,@HAS_DIVIDEND_GRWTH_5_YRS = " + has_dividend_grwth_5_yrs + ""
            query = query + " ,@HAS_NET_PROFIT_REG_5_YRS = " + has_net_profit_reg_5_yrs + ";"

            execute_query(query, (result) => {
                on_success(result)
            });
        } catch (error) {
            on_error(error)
        }
    }
}