const express = require("express");
const router = express.Router();
const Task = require("../models/task");

router.post("/tasks", async (req, res) => {
  const task = new Task(req.body);
  try {
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send(error);
  }
  // task.save().then(() => {
  //     res.send(task)
  // }).catch((e) => {
  //     res.status(400).send()
  // })
});

router.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).send(tasks);
  } catch (error) {
    res.status(400).send(error);
  }
});
router.get("/tasks/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const task = await Task.findById({ _id });
    res.status(200).send(task);
  } catch (error) {
    res.status(400).send(error);
  }
  // Task.findById(_id).then((task)=>{
  //     if(!task){
  //         return res.status(404).send()
  //     }
  //     res.send(task)
  // }).catch((e)=>{
  //     res.status(500).send()
  // })
});

router.patch("/tasks/:id", async (req, res) => {
  const _id = req.params.id;
  const allowedUpdates = ["isCompleted", "description"];
  const updates = Object.keys(req.body);
  const check = updates.every((update) => {
    return allowedUpdates.includes(update);
  });
  if (!check) {
    return res.status(400).send({ error: "Invalid update props" });
  }
  try {
    const task = await Task.findById(_id);
    updates.forEach((update) => (task[update] = req.body[update]));
    await task.save();
    if (!task) {
      return res.status(404).send();
    }
    res.status(200).send(task);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.delete("/tasks/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const task = await Task.findByIdAndDelete(_id);
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (error) {
    res.status(500).send();
  }
});

module.exports = router;
