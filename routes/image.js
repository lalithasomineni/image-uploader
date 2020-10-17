const express = require("express");
const multer = require("multer");
const Image = require("../models/image");
const auth = require("../middlewares/auth");
const router = express.Router();
//var upload = multer({ dest: 'uploads/' })
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + '.jpg')
    }
})

var upload = multer({ storage: storage })


router.post("/",auth,upload.array('image',5),async  (req, res, next) => {
    let newImage =  new Image({
        image : './'+ req.files.path,
        text: req.body.text
    })
    await newImage.save().then( (result) =>{
            res.send("succesfull");
        }
    ).catch( (err) =>{
            res.status(500).send("failed");
        }
    )
});


module.exports = router;
