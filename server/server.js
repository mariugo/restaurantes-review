const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const port = 3000;

//middleware
app.use(cors());
app.use(express.json());

//ROUTES//

//SELECT ALL RESTAURANTS
app.get("/api/restaurants", async (req, res) => {
    try {
        const allRest = await pool.query(
            "SELECT * FROM restaurants");
        res.json(allRest.rows);
    } catch (error) {
        console.error("Erro ao selecionar " + error.message);
    }
});


//SELECT ONE RESTAURANT
app.get("/api/restaurants/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const restaurant = await pool.query(
            "SELECT * FROM restaurants WHERE id = $1", [id]);
        res.json(restaurant[0]);
    } catch (error) {
        console.error("Erro ao selecionar" + error.message);
    }

});


//INSERT RESTAURANT
app.post("/api/restaurants", async (req, res) => {
    try {
        const {name, location, price_range} = req.body;
        const addRes = await pool.query(
            "INSERT INTO restaurants (name, location, price_range) VALUES ($1, $2, $3) RETURNING *", 
            [name, location, price_range]);
        res.json(addRes.rows[0]);
    } catch (error) {
        console.error("Erro ao inserir restaurante" + error.message);
    }

});


//UPDATE RESTAURANT
app.put("/api/restaurants/:id", async (req, res) => {
    try {
        const {name, location, price_range} = req.body;
        const {id} = req.params;
        const updateRes = await pool.query(
            "UPDATE restaurants SET name = $1, location = $2, price_range = $3 WHERE id = $4 "
            , [name,location,price_range,id]);
        res.json("Restaurante atualizado!");
    } catch (error) {
        console.error("Erro ao selecionar" + error.message);
    }

});


//DELETE RASTAURANT
app.delete("/api/restaurants/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const delRes = await pool.query("DELETE FROM restaurants WHERE id = $1", [id]);
        res.json("Restaurante deletado");
    } catch (error) {
        console.error("Erro ao deletar restaurante" + error.message);
    }
});



app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});