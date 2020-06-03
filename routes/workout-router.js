const Workout = require("../models/Workout");
const router = require("express").Router();
const { ObjectId } = require("mongoose").Types;
// module.exports = (router) => {

router.get("/api/workouts", async (req, res) => {
    const workouts = await Workout.find({});
    res.json(workouts).end();
})
router.get("/api/workouts/range", async (req, res) => {
    const workouts = await Workout.find({})
    res.json(workouts).end();
})
router.get("/api/workouts/:id", async (req, res) => {
    const workout = await Workout.find({ _id: ObjectId(req.params.id) });
    res.json(workout).end();
})
router.put("/api/workouts/:id", async (req, res) => {
    const workout = await Workout.updateOne({ _id: ObjectId(req.params.id) }, req.body);
    res.json(workout).end();
})
router.post("/api/workouts", async (req, res) => {
    const workout = await Workout.create(req.body);
    res.json(workout).end();
})

    
// }

module.exports = router;
