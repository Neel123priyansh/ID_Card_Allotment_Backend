const express = require("express");
const router = express.Router();

const Student = require("./Student");

router.get("/check-epc/:epc", async (req, res) => {
  try {

    const student = await Student.findOne({
      epc: req.params.epc.toUpperCase()
    });

    res.json({
      exists: !!student
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
});

router.post("/register", async (req, res) => {

  try {

    const existing =
      await Student.findOne({
        epc: req.body.epc.toUpperCase()
      });

    if (existing) {
      return res.status(400).json({
        message: "EPC already registered"
      });
    }

    const student =
      await Student.create(req.body);

    res.status(201).json(student);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});

module.exports = router;