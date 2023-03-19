const express = require("express");
const cors = require("cors");
const axios = require("axios");


const app = express();
app.use(cors());



app.get("/api/attom/:address/:zipcode", async (req, res) => {
    const { address, zipcode } = req.params;
  
    try {
      const attomResponse = await axios.get(
        `https://search.onboard-apis.com/propertyapi/v1.0.0/property/address?address1=${encodeURIComponent(
          address
        )}&postalcode=${zipcode}`,
        {
          headers: { "apikey": "39c8e425b2ebca157d43855d5ae44bdf" },
        }
      );
  
      res.json(attomResponse.data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error fetching property information" });
    }
  });


app.get("/api/skipengine/:property_address", async (req, res) => {
    const { property_address } = req.params;
  
    try {
      const skipEngineResponse = await axios.post(
        "https://api.skipengine.io/v1/property",
        {
          address: property_address,
        },
        {
          headers: { "x-api-key": "7acb5f51-673c-40c9-a39e-c220587c1dcf" },
        }
      );
  
      res.json(skipEngineResponse.data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error fetching owner information" });
    }
  });
  

  const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/api/fred/mortgage_rate", async (req, res) => {
    try {
      const fredResponse = await axios.get(
        "https://api.stlouisfed.org/fred/series/observations?series_id=MORTGAGE30US&api_key=ea12b9b105e7e53d15596629510cc863&file_type=json"
      );
  
      res.json(fredResponse.data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error fetching mortgage rate data" });
    }
  });
  
  