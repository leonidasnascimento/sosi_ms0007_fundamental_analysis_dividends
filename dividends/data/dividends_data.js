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
            console.error(error)
            on_error(error)
        }
    }
}