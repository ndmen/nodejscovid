const express = require("express");
const cors = require("cors");
const pool = require("./db");
const axios = require("axios");

const app = express();

//middlware

app.use(cors());
app.use (express.json()); //req.body

//routes//

//get all states

const getStates = "https://api.covidtracking.com/v2/states.json";

app.get("/states/:user_id", async(req, res) => {
    try  {
      const newStates = await axios.get(getStates)
        .then(response => {
            const { user_id } = req.params;
            const request = "get all states";
            const getResult = response.data;
            JSON.stringify(getResult);
            // add data to database
            const addStates = pool.query ("INSERT INTO requests (user_id, request, response) VALUES($1, $2, $3) RETURNING *", 
            [user_id, request, getResult]);
            return getResult;
        });
        res.json(newStates.data);
    }
    catch (err) {
      console.error(err.message);
    }
  });

//get a state

let StateCode = "me";
const getState = "https://api.covidtracking.com/v2/states/" + StateCode + ".json";

app.get("/state/:user_id", async(req, res) => {
    try  {
      const newState = await axios.get(getState)
        .then(response => {
            const { user_id } = req.params;
            const request = "get a state";
            const getResult = response.data;
            JSON.stringify(getResult);
            // add data to database
            const addStates = pool.query ("INSERT INTO requests (user_id, request, response) VALUES($1, $2, $3) RETURNING *", 
            [user_id, request, getResult]);
            return getResult;
        });
        res.json(newState.data);
    }
    catch (err) {
      console.error(err.message);
    }
  });


//get all requests by user_id

app.get("/states/requests/:user_id", async (req, res) => {
    try {
      const {user_id} = req.params;
      const { size } = req.query;
      const getRequests = await pool.query("SELECT * FROM requests WHERE user_id = $1 ORDER BY request LIMIT $2" ,[user_id, size]);
      res.json(getRequests.rows);
    } catch (err) {
      console.error(err.message);
    }
});

//get a request by request_id

app.get("/states/request/:request_id", async (req, res) => {
    try {
      const {request_id} = req.params;
      const getRequest = await pool.query("SELECT * FROM requests WHERE request_id = $1",[request_id]);
      
      res.json(getRequest.rows[0]);
    } catch (err) {
      console.error(err.message);
    }
});


app.listen(4000, () => {
  console.log("Server has started on port 4000")
});