const express = require('express');

const tf = require('@tensorflow/tfjs-node');

const helmet = require('helmet');

const compression = require('compression');

const formidable = require('formidable');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const fs = require('fs');
const sharp = require('sharp');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.get('/', function(req, res, next) {
//     res.render('index', { title: 'Express' });
//   });

let mirNetModel;
let modelInfo;
const imageSize = 512;

async function loadModel() {
  try {
    // Warm up the model
    if (!mirNetModel) {

      modelInfo = await tf.node.getMetaGraphsFromSavedModel('./model');
      console.log(await modelInfo);

      mirNetModel = await tf.node.loadSavedModel(
        './model'
      );
      return await mirNetModel;
    }
  } catch (error) {
    console.log(error);
  }
};

const predict = async (imgPath, responseImagePath) => {
  try {
    mirNetModel = await loadModel();
    console.log(mirNetModel);
    console.log("Inside predict");
    let image = fs.readFileSync(imgPath);

    // image = new Uint8Array(image);
    // Decode the image into a tensor.
    let imageTensor = await tf.node.decodePng(image, 3);
    imageTensor = tf.image.resizeBilinear(imageTensor, size = [imageSize, imageSize]);
    imageTensor = tf.cast(imageTensor, "float32");
    imageTensor = tf.div(imageTensor, tf.scalar(255.0));

    let input = imageTensor.expandDims(0);

    // Feed the image tensor into the model for inference.
    const startTime = tf.util.now();

    let outputTensor = mirNetModel.predict(input);

    const endTime = tf.util.now();
    console.log(endTime - startTime);
    console.log("After Predict");

    outputTensor = tf.reshape(outputTensor, [512, 512, 3]);
    
    // outputTensor = outputTensor.squeeze();

    // outputTensor = new Uint8Array(outputTensor);

    // let factor = tf.onesLike(outputTensor);
    // factor = tf.mul(factor, tf.min(outputTensor));
    // outputTensor = tf.add(outputTensor, factor);
    // const mulFactor = tf.max(outputTensor) / 255.0;
    // outputTensor = tf.mul(outputTensor, mulFactor);

    // outputTensor = tf.mul(outputTensor, factor);

    outputTensor = tf.mul(outputTensor, tf.scalar(255.0));
    outputTensor = tf.clipByValue(outputTensor, 0, 255);

    outputTensor = await tf.node.encodePng(outputTensor);
    fs.writeFileSync(responseImagePath, outputTensor);

  } catch (error) {
    console.log(error);
  }
};

const formOptions = {
  // uploadDir: path.join(__dirname, "uploads"),
  encoding: 'utf-8',
  keepExtensions: true,
  maxFileSize: 5 * 1024 * 1024,
  multiples: false,
};
// const form = new formidable.IncomingForm(formOptions);


app.post('/submit', (req, res) => {
  let form = new formidable.IncomingForm(formOptions);
  form.parse(req, async (err, fields, files) => {

    if (err) {
      res.send("Incorrect File Format");
      console.log('\n' + err + '\n');
    } else {
      // console.log("sending File: " + files.image.name);
      // res.sendFile(files.image.path);
      try {
        let toSend = await predict(files.image.path, path.join(__dirname, "public", "responseImages") + files.image.name);
        if (toSend === true) {
          res.sendFile(path.join(__dirname, "public", "responseImages") + files.image.name);
        } else {
          res.status(501).send(toSend);
        }
      } catch (err) {
        res.status(500).send(err);
      }
    }
  });
  const allowedFiles = ["image/jpg", "image/jpeg", "image/png"];
  try {
    form.on('fileBegin', function(name, file) {
      if (!allowedFiles.includes(file.type)) {
        // throw new Error("Incorrect File Type");
        form._error(new Error("Incorrect File Type"));
        return new Error("Incorrect File Type");
      } else {
        file.path = path.join(__dirname, "uploads") + "/" + Date.now() + "-" + file.name;
      }
    });
  } catch (err) {
    form._error(err);
    console.log(err);
    res.send("Incorrect File Type");
  }
});

module.exports = app;
