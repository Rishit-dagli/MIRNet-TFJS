const tf = require('@tensorflow/tfjs-node');
const fs = require('fs');
let mirNetModel;
let modelInfo;
const imageSize = 512;

async function loadModel() {
    try {
        // Warm up the model
        if (!mirNetModel) {

              modelInfo = await tf.node.getMetaGraphsFromSavedModel('./model');
              console.log("\n\n\n");
              console.log(await modelInfo);
              console.log("\n\n\n");

            // Load the TensorFlow SavedModel through tfjs-node API. You can find more
            // details in the API documentation:
            // https://js.tensorflow.org/api_node/1.3.1/#node.loadSavedModel
            mirNetModel = await tf.node.loadSavedModel(
                './model'
            );
            return await mirNetModel;
        }
    } catch (error) {
        console.log(error);
    }
}
const predict = async () => {
    try {
        await loadModel();
        console.log("Inside predict");
        let image = fs.readFileSync("Capture.PNG");

        // image = new Uint8Array(image);
        // Decode the image into a tensor.
        let imageTensor = await tf.node.decodeImage(image, 3);
        imageTensor = tf.image.resizeBilinear(imageTensor, size = [imageSize, imageSize])
        console.log("after img 2 tensor");

        let input = imageTensor.expandDims(0);
        // [:,:,:3]
        // input = input[[,,], [,,], [,3]]
        console.log(input);

        // Feed the image tensor into the model for inference.
        const startTime = tf.util.now();
        input = tf.cast(input, "float32");

        let outputTensor = await mirNetModel.predict({ 'input_1': input });

        const endTime = tf.util.now();
        console.log(endTime - startTime);
        console.log("After Predict");

        console.log(outputTensor.add_171);

        outputTensor = outputTensor.add_171;
        // outputTensor = tf.reshape(outputTensor, [512, 512, 3]);
        outputTensor = outputTensor.squeeze(axis = 0);

        // outputTensor = new Uint8Array(outputTensor);
        outputTensor = await tf.node.encodeJpeg(outputTensor, "rgb");

        fs.writeFileSync("./uploads/NEW-1.jpeg", outputTensor);

    } catch (error) {
        console.log(error);
    }
};

(async () => {
    await predict();
    console.log("DONE");
})()



// fs.writeFileSync("./uploads/NEW-1.png", a);
// fs.readFileSync()