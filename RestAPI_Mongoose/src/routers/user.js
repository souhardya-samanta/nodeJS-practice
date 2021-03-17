const express = require("express");
const jwt = require("jsonwebtoken")
const router = express.Router();
const User = require("../models/user");
const auth = require("../middleware/auth");

router.post("/users", async (req, res) => {
    const user = new User(req.body);
    try {
        const token = await user.generateAuthToken()
        await user.save();
        res.status(201).send({user,token});
    } catch (error) {
        res.status(400).send(error);
    }
});
router.get("/users",auth, async (req, res) => {
    try {
        const users = await User.find({});
        res.send(users);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get("/users/:id", async (req, res) => {
    const _id = req.params.id;
    try {
        const user = await User.findById(_id);
        if (!user) {
            return res.status(404).send();
        }
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.patch("/users/:id", async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ["name", "email", "password", "age"];
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update);
    });
    if (!isValidOperation) {
        return res.status(400).send({ error: "Invalid update props" });
    }
    const _id = req.params.id;
    try {
        const user = await User.findById(_id)
        updates.forEach((update) => (
            user[update] = req.body[update]
        ))
        await user.save()
        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.delete("/users/:id", async (req, res) => {
    const _id = req.params.id;
    try {
        const user = await User.findByIdAndDelete(_id);
        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.post("/users/login", async (req, res) => {
    const email = req.body.email
    const password = req.body.password
    try {
        const user = await User.findByCredentials(email, password)
        const token = await user.generateAuthToken()
            res.send({user,token})
    } catch (error) {
        res.status(404).send()
    }
})

module.exports = router;
