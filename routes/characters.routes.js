const router = require("express").Router();
const axios = require("axios");

/* GET home page */
router.get("/characters", (req, res, next) => {
    axios.get("https://ih-crud-api.herokuapp.com/characters")
    .then(responseFromAPI => {
        // console.log(responseFromAPI)
        res.render("characters/list-characters", { characters: responseFromAPI.data });
    })
    .catch(err => console.error(err))
});

// Create a new character
router.get("/characters/create-character", (req, res, next) => {
    res.render("characters/create-character");
})

router.post("/characters/create-character", async (req, res, next) => {
    try {
        if (req.body.debt === "on") {
            req.body.debt = true;
        } else {
            req.body.debt = false;
        }
        const response = await axios.post("https://ih-crud-api.herokuapp.com/characters", req.body);
        res.redirect("/characters");
    } catch (err) {
        console.error(err);
    }
})


    ///

router.get("/characters/:id", (req, res, next) => {
    axios.get(`https://ih-crud-api.herokuapp.com/characters/${req.params.id}`)
    .then(responseFromAPI => {
        // console.log("details: ", responseFromAPI.data)
        res.render("characters/details-character", { character: responseFromAPI.data });
    })
    .catch(err => console.error(err))
});

//Edit a character
router.get("/characters/:id/edit", async (req, res, next) => {
    const responseFromAPI = await axios.get(`https://ih-crud-api.herokuapp.com/characters/${req.params.id}`);
    res.render("characters/edit-character", { character: responseFromAPI.data });
})

router.post("/characters/:id/update", async (req, res, next) => {
        const response = await axios.put(`https://ih-crud-api.herokuapp.com/characters/${req.params.id}`, req.body);
        res.redirect(`/characters/${req.params.id}`);
    })


//Delete a character
router.post("/characters/:id/delete", async (req, res, next) => {
    const response = await axios.delete(`https://ih-crud-api.herokuapp.com/characters/${req.params.id}`);
    res.redirect("/characters");
})



module.exports = router;


// https://ih-crud-api.herokuapp.com/characters