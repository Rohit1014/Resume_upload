const express = require("express");
const db = require("./db"); 
const cors = require("cors");
require("dotenv").config()

const Jwt = require("jsonwebtoken");
const jwtkey =process.env.jwtkey;
const path=require("path")
const upload=require("./storage")
const check=require("./check")
 
const app = express();


app.use(cors());
app.use(express.json());
app.use("/profile",express.static("./upload/resumes"))



app.post("/register", async (req, res) => {
    const data = req.body;

    db.query('INSERT INTO user SET ?', data, (err, result) => {
        if (err) {
            return res.status(500).send({ error: "Error inserting data" });
        }

        const user = { ...data }; 
        delete user.password; 

        Jwt.sign({ user }, jwtkey, { expiresIn: "2h" }, (err, token) => {
            if (err) {
                return res.status(500).send({ result: "Token generation failed" });
            }
            res.status(200).json({ user:user, auth: token });
        });
    });
});


app.post("/login",(request,response)=>{
    const {email,password}=request.body
    if(email && password){
        const query="select * from user where email=? AND password=?";
        db.query(query,[email,password],(err,result)=>{
            if(err){
                return response.status(500).send({ error: "Error executing query" });
            }
            else{
                if(result.length>0){
                    const user=result[0]
                    delete user.password

                    Jwt.sign({ user }, jwtkey, { expiresIn: "2h" }, (err, token) => {   
                        if (err) {
                            return response.status(500).send({ result: "Token generation failed" });
                        }
                        else{
                      response.status(200).json({ user:user, auth: token });
                        }
                    });

                }
                else{
                    response.status(500).json({err:"please provide correct details"})
                }
            }
        })

    }
    else{
        response.status(500).json({result:"please provide all detail"})

    }
})




app.post("/uploads",verifyToken,upload.single("profile"),check,(req,res)=>{

    const {name,email,phone}=req.body
    const resume_url=`http://localhost:5000/profile/${req.file.filename}`
    if(name && email && phone && resume_url){
        const query="INSERT INTO resumes (name, email, phone, resume_url) VALUES (?, ?, ?, ?)";
        db.query(query,[name,email,phone,resume_url],(err,result)=>{
        if(err){
            res.status(500).json({err:"some error occurs"})
            }
        else{
                res.status(200).json({
                    result:"file uploaded",
                    file:resume_url
                })
                }
            })
    }
    else{
        res.status(500).json({err:"please provide all details"})
    }

    

})


function verifyToken(request, response, next) {
    let token = request.headers["authorization"];
    if (token) {
      token = token.split(" ")[1];
      Jwt.verify(token, jwtkey, (err, valid) => {
        if (err) {
          response.status(401).send({ result: "inavlid key " });
        } else {
          next();
        }
      });
    } else {
      response.send({ result: "please define headers with key" });
    }
  }





app.listen(5000);
