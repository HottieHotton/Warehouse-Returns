const router = require("express").Router();
const { Condition } = require("../../models");
// const withAuth = require("../../utils/auth");

router.get("/", (req, res) => {
  Condition.findAll()
    .then((dbConditionData) => res.json(dbConditionData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
