const mysql = require("mysql");
const connectDB = require("../utils/connectDB");

const db = connectDB.createConnection();

const StatisticalController = {
    getStatistical: async (req, res) => {
        try {
            const { fromDate, toDate } = req.query;
            const sql =
                "SELECT DATE(createdAt) AS date, SUM(prompt_tokens) AS totalPromptTokens, SUM(completion_tokens) AS totalCompletionTokens COUNT(*) AS queryQuantity FROM statistics WHERE createdAt BETWEEN " +
                mysql.escape(fromDate) +
                " AND " +
                mysql.escape(toDate) +
                "GROUP BY DATE(createdAt)";
            await db.query(sql, (error, results) => {
                if (error) {
                    console.log(error);
                    return res.json({
                        error: "Unknown error",
                    });
                }
                if (results.length === 0) {
                    return res.json({
                        result: "success",
                        message: "Empty!",
                    });
                } else {
                    return res.json({
                        result: "success",
                        message: "Get statistics success!",
                        data: results,
                    });
                }
            });
        } catch (error) {
            res.status(500).json({
                result: "failed",
                message: "Server error",
                error: err,
            });
        }
    },
};

module.exports = StatisticalController;
