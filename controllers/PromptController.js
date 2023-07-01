const mysql = require("mysql");
const connectDB = require("../utils/connectDB");

const db = connectDB.createConnection();

const PromptController = {
    getBasePrompt: async (req, res) => {
        try {
            const sql = "SELECT * FROM base_prompts";
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
    editBasePrompt: async (req, res) => {
        try {
            const { promptSEO } = req.body;
            const sql =
                "UPDATE base_prompts SET promptSEO = " +
                mysql.escape(promptSEO) +
                " WHERE (id = 1)";
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
                        message: "Update base prompt success!",
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
    getAllPrompt: async (req, res) => {
        try {
            const { name, page, size } = req.query;
            let count = 0;
            const sql =
                "SELECT * FROM prompts WHERE name LIKE " +
                mysql.escape("%" + name + "%") +
                "LIMIT " +
                mysql.escape(size * 1) +
                " OFFSET " +
                mysql.escape(page * size);
            const sql_count =
                "SELECT COUNT(*) FROM prompts WHERE name LIKE " +
                mysql.escape("%" + name + "%");
            await db.query(sql_count, (error, results) => {
                if (error) {
                    console.log(error);
                    return res.status(500).json({
                        error: "Unknown error",
                    });
                } else {
                    console.log(results);
                    count = results[0]["COUNT(*)"];
                }
            });
            await db.query(sql, (error, results) => {
                if (error) {
                    console.log(error);
                    return res.status(500).json({
                        error: "Unknown error",
                    });
                } else {
                    return res.json({
                        result: "success",
                        message: "Get all prompts success!",
                        data: {
                            promptList: results,
                            size: parseInt(size),
                            page: parseInt(page),
                            totalElements: count,
                            totalPages: Math.ceil(count / size),
                        },
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

    createPrompt: async (req, res) => {
        try {
            const { name, value } = req.body;
            const sql =
                "INSERT INTO prompts (name, value) VALUES (" +
                mysql.escape(name) +
                ", " +
                mysql.escape(value) +
                ")";
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
                        message: "Create prompt success!",
                        data: {
                            id: results.insertId,
                            name: name,
                            value: value,
                        },
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

    editPrompt: async (req, res) => {
        try {
            const { id } = req.params;
            const { name, value } = req.body;
            console.log(id, name, value);
            const sql =
                "UPDATE prompts SET name = " +
                mysql.escape(name) +
                ", value = " +
                mysql.escape(value) +
                " WHERE (id = " +
                mysql.escape(id) +
                ")";
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
                        message: "Update prompt success!",
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

    deletePrompt: async (req, res) => {
        try {
            const { id } = req.params;
            const sql =
                "DELETE FROM prompts WHERE (id = " + mysql.escape(id) + ")";
            await db.query(sql, (error, results) => {
                if (error) {
                    console.log(error);
                    return res.status(500).json({
                        error: "Unknown error",
                    });
                } else {
                    return res.json({
                        result: "success",
                        message: "Delete prompt success!",
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
