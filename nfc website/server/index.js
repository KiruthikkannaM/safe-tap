import express from "express";
import argon2 from "argon2";
import bodyParser from "body-parser";
import pg from "pg";
import cors from "cors";
const app=express();
const db=new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "nfc database",
    password: "kiruthik_7275",
    port: 5432,
});

app.use(cors());
db.connect()


// app.get("/loss",async(req,res)=>{
//     const nfcid=req.body;
//     try{
//         // const result=await db.query('SELECT "Name", "Contact-info", "Address", "Age" FROM "User" WHERE "ST_id"=$1', [nfcid]);
//         const result = await db.query("select name,address,age,contact_info from user where st_id=$1",[nfcid]);
//         console.log(result.rows);

//         res.status(200).json(result.rows);

//     }catch(err){
//         console.log(err);
//         res.status(500).json({message:"internal connection error"});
//     }


// });
app.get("/loss", async (req, res) => {
    try {
        const nfcid = req.query.nfcid;
        console.log("Received NFC ID:", nfcid);

        if (!nfcid) {
            return res.status(400).json({ message: "NFC ID is required" });
        }

        const queryText = 'SELECT name, address, age, contact_info FROM "user" WHERE st_id = $1';
        const result = await db.query(queryText, [nfcid]);

        console.log("Query result:", result.rows);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(result.rows[0]);
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).json({ message: "Internal server error" });
    }
});


app.get("/authentication", async (req, res) => {
    const { name, code } = req.query;

    if (!name || !code) {
        return res.status(400).json({ message: "Both hospital name and code are required" });
    }

    try {
        const queryText='SELECT * FROM hospital_authentication WHERE hospital_name = $1 AND hospital_code = $2';
        const result = await db.query(queryText,[name, code]);
        console.log("Query result:", result.rows);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Hospital not found" });
        }

        // Send a success message along with a success status
        res.status(200).json({ message: "Authentication successful", hospital: result.rows[0] });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
});



app.get("/emergency", async (req, res) => {
    const nfcid = req.query.nfcid;

    if (!nfcid) {
        return res.status(400).json({ message: "NFC ID is required" });
    }

    try {
        const result = await db.query(
            'SELECT name, blood_grp AS blood_group, address, father_contact FROM student WHERE st_id = $1',
            [nfcid]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Student not found" });
        }

        res.status(200).json(result.rows);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal connection error" });
    }
});








app.listen(3000,(req,res)=>{
    console.log("running on localhost 3000");
})
