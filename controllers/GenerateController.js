require("dotenv").config();
const OpenAI = require("openai");
const encoder = require("../utils/encoder");

const mysql = require("mysql");
const connectDB = require("../utils/connectDB");
const db = connectDB.createConnection();

const configuration = new OpenAI.Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAI.OpenAIApi(configuration);

const GenetareController = {
    connectOpenAI: (req, res) => {
        let model = "text-davinci-003";
        console.log(req.body);
        let { prompt, maxToken, temperature, topP, stop } = req.body;
        // let maxToken = 1500;
        // let temperature = 0.6;
        // let topP = 0.9;
        let stream = true;
        // let stop = "";
        let resData = "";
        const completion = openai.createCompletion(
            {
                model: model,
                prompt: prompt,
                max_tokens: parseInt(maxToken),
                temperature: parseInt(temperature),
                top_p: parseInt(topP),
                stop: stop,
                stream: stream,
            },
            {
                responseType: "stream",
                headers: {
                    Authorization: "Bearer " + process.env.OPENAI_API_KEY,
                },
            }
        );

        completion.then((resp) => {
            resp.data.on("data", (data) => {
                const lines = data
                    .toString()
                    .split("\n")
                    .filter((line) => line.trim() !== "");
                for (const line of lines) {
                    const message = line.replace(/^data: /, "");
                    if (message === "[DONE]") {
                        res.write("DONE");
                        const sql =
                            "INSERT INTO statistics (prompt_tokens, completion_tokens) Values (" +
                            mysql.escape(encoder(req.body.prompt)) +
                            ", " +
                            mysql.escape(encoder(resData)) +
                            ")";
                        db.query(sql, (err) => {
                            if (err) {
                                console.log(err);
                            }
                        });
                        break;
                    }
                    const parsed = JSON.parse(message);
                    res.write(parsed.choices[0].text);
                    resData += parsed.choices[0].text;
                }
            });
        });
    },
};

module.exports = GenetareController;
