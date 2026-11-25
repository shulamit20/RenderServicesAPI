
require("dotenv").config();

const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

app.get("/services", async (req, res) => {
    try {
        const response = await fetch(
            "https://api.render.com/v1/services",
            {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${process.env.RENDER_API_KEY}`,
                    "Accept": "application/json"
                }
            }
        );

        if (!response.ok) {
            return res.status(response.status).json({
                message: "Failed to get services from Render"
            });
        }

        const services = await response.json();
        res.json(services);

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
