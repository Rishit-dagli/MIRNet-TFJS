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
            console.log(await modelInfo);

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
        let imageTensor = await tf.node.decodePng(image, 3);
        imageTensor = tf.image.resizeBilinear(imageTensor, size = [imageSize, imageSize]);
        imageTensor = tf.cast(imageTensor, "float32");
        imageTensor = tf.div(imageTensor, tf.scalar(255.0));

        let input = imageTensor.expandDims(0);

        // Feed the image tensor into the model for inference.
        const startTime = tf.util.now();

        let outputTensor = await mirNetModel.predict(input);

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
        fs.writeFileSync("output.Png", outputTensor);

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