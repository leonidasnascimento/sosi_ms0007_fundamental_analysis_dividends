// Import the Google Cloud client library using default credentials
const {
    BigQuery
} = require('@google-cloud/bigquery');

module.exports = class {
    async get_dividend_analysis(stock_code, on_success, on_error) {
        try {

            var query = ""
            query = "DECLARE IN_STOCK_CODE STRING DEFAULT NULL; ";

            if (stock_code != undefined && stock_code != null && stock_code != "")
                query = query + "SET IN_STOCK_CODE = '" + stock_code + "'; ";

            query = query + "CALL fundamental_analysis.GetDividendAnalysis(IN_STOCK_CODE);";

            // For all options, see https://cloud.google.com/bigquery/docs/reference/rest/v2/jobs/query
            const options = {
                query: query,
                // Location must match that of the dataset(s) referenced in the query.
                location: 'US',
            };

            // Run the query
            const [rows] = await new BigQuery().query(options);
            var return_arr = []

            rows.forEach(row => {
                return_arr.push(row)
            });

            on_success(return_arr)
        } catch (error) {
            on_error(error)
        }
    }
}