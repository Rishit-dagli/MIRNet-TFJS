const tf = require("@tensorflow/tfjs-node");
const express = require("express");
const Busboy = require('busboy');

const app = express();

let mirNetModel;
let modelInfo;

async function loadModel() {
  // Warm up the model
  if (!mirNetModel) {

    modelInfo = await tf.node.getMetaGraphsFromSavedModel('./model');

    // Load the TensorFlow SavedModel through tfjs-node API. You can find more
    // details in the API documentation:
    // https://js.tensorflow.org/api_node/1.3.1/#node.loadSavedModel
    mirNetModel = await tf.node.loadSavedModel(
      './model'
    );
  }
}

// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/index.html");
  loadModel();
});

app.post('/predict', async (req, res) => {
  // Receive and parse the image from client side, then feed it into the model
  // for inference.
  const busboy = new Busboy({headers: req.headers});
  let fileBuffer = new Buffer('');
  req.files = {file: []};

  busboy.on('field', (fieldname, value) => {
    req.body[fieldname] = value;
  });

  busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
    file.on('data', (data) => {fileBuffer = Buffer.concat([fileBuffer, data])});

    file.on('end', () => {
      const file_object = {
        fieldname,
        'originalname': filename,
        encoding,
        mimetype,
        buffer: fileBuffer
      };

      req.files.file.push(file_object)
    });
  });

  busboy.on('finish', async () => {
    const buf = req.files.file[0].buffer;
    const uint8array = new Uint8Array(buf);

    loadModel();
    // Decode the image into a tensor.
    const imageTensor = await tf.node.decodeImage(uint8array);
    const input = imageTensor.expandDims(0);

    // Feed the image tensor into the model for inference.
    const startTime = tf.util.now();
    let outputTensor = mirNetModel.predict({'x': input});

    // Parse the model output to get meaningful result(get detection class and
    // object location).
    const endTime = tf.util.now();
    res.send({
      inference: outputTensor,
      inferenceTime: endTime - startTime
    });
  });

  busboy.end(req.rawBody);
  req.pipe(busboy);
});

// listen for requests :)
app.set('port', process.env.PORT || 3001);
app.listen(3001);