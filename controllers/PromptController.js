const mysql = require("mysql");
const connectDB = require("../utils/connectDB");

const db = connectDB.createConnection();

const PromptController = {
    getAllPrompt: async (req, res) => {
        try {
            const { name } = req.query;
            const sql =
                "SELECT * FROM prompts WHERE name LIKE " +
                mysql.escape("%" + name + "%");
            await db.query(sql, (error, results) => {
                if (error) {
                    console.log(error);
                    return res.status(500).json({
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
                        message: "Get all prompts success!",
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

module.exports = PromptController;
