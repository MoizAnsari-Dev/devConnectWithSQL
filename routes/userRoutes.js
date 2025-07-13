import express from "express";
import { pool } from "../database.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name) return res.send("Name can not be empty");
    if (!email) return res.send("Email can not be empty");
    if (!password) return res.send("Password can not be empty");

    const results = await pool.query(
      `INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *`,
      [name, email.toLowerCase(), password]
    );
    console.log(results.rows.length);
    
    console.log("Users Register successfully");
    

    res.json(results.rows[0]);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

//Reading all DATA
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM users`);
    res.json(result.rows);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

//Accessing one User DATA:
router.get("/:id", async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM users WHERE id = $1`, [
      req.params.id,
    ]);
    if (result.rows.length === 0) return res.send("User can not FOUND!!!!!");
    console.log(result.rows);
    res.json(result.rows[0]);
  } catch (error) {
    res.status(404).json({
      message: error.message
    })
  }
});

router.put('/:id', async (req, res) => {
  const findUser = await pool.query(`SELECT * FROM users id = $1 RETURNING *`, [req.params.id]);
  console.log(findUser);
  
  const {name, password} = req.body;
  const result = await pool.query(
    'UPDATE users SET name = $1, password = $2 WHERE id = $3 RETURNING *',
    [name, password, req.params.id]
  );
  res.json(result.rows[0])
});

//Deleting user from DB;
router.delete('/:id', async (req, res) => {
 await pool.query(`DELETE FROM users WHERE id`, [req.params.id])
 res.json({message: 'User Deleted'})
})

export { router };
