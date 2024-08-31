const db = require("./db");

const check = (req, res, next) => {
    const email = req.body.email

    const query = "SELECT resume_url FROM resumes WHERE email = ?";
    db.query(query, [email], (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Database error occurred" });
        }
        
        else if (results.length > 0 && results[0].resume_url) {
            return res.status(400).json({ error: "You have already submitted your resume" });
        }
        else{
          next();
    }
    });
};

module.exports = check;
