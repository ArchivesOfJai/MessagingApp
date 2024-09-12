const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const con = require("../config/db");

// Register user
exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    let sql =
      `INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)`;
    const values = [name, email, hashedPassword, role];
    con.query(sql, values, function (err, result) {
      if (err){
        res.status(404).json({message:"already exist"});
      }else{
        console.log("1 record inserted ");
         res.status(201).json({message:"User created successfully"});
      }
    });
  } catch (error) {
   res.status(500).json({message:"Error creating user"});
    console.log(error);
  }
};
// Login user
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    con.query("SELECT * FROM users WHERE email = ?", email, (err, rows) => {
      if (err) {
        console.log("error", err);
        return res.status(500).json({ error: "Error querying database" });
      }
      console.log(rows);
      if (rows.length === 0)
        return res.status(404).json({ error: "User not found" });

      const user = rows[0];
      bcrypt.compare(password, user.password, (err, validPassword) => {
        if (err) {
          console.log("error", err);
          return res.status(500).json({ error: "Error comparing passwords" });
        }
        if (!validPassword)
          return res.status(401).json({ error: "Invalid password" });

        const token = jwt.sign(
          { id: user.id, role: user.role },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
        );

        con.query("UPDATE users SET status = ? WHERE id = ?", [
          "online",
          user.id,
        ], (err) => {
          if (err) {
            console.log("error", err);
            return res.status(500).json({ error: "Error updating user status" });
          }
        });

        res.status(200).json({ token,user, message: "Login successful" });
      });
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: "Error logging in user" });
  }
};

// Logout user
exports.logout = async (req, res) => {
  try {
    const userId = req.user.id;
    con.query("UPDATE users SET status = ? WHERE id = ?", [
      "offline",
      userId,
    ]);
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ error: "Error logging out user" });
  }
};
