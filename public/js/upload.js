function encode (input) {
    var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var output = "";
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    var i = 0;

    while (i < input.length) {
        chr1 = input[i++];
        chr2 = i < input.length ? input[i++] : Number.NaN; // Not sure if the index 
        chr3 = i < input.length ? input[i++] : Number.NaN; // checks are needed here

        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;

        if (isNaN(chr2)) {
            enc3 = enc4 = 64;
        } else if (isNaN(chr3)) {
            enc4 = 64;
        }
        output += keyStr.charAt(enc1) + keyStr.charAt(enc2) +
                  keyStr.charAt(enc3) + keyStr.charAt(enc4);
    }
    return output;
}
document.getElementById('submitImage').addEventListener("submit", (event) => {
    event.preventDefault();
    document.getElementById('displayImage').innerHTML="";
    const formData = new FormData();
    formData.append("image", document.forms[0].image.files[0]);

    axios.post("/submit", formData, {
        headers: {
            'Content-Type': "multipart/form-data"
        },
        responseType: 'arraybuffer'
    }).then((result) => {
        let arrayBuffer = result.data;
        let bytes = new Uint8Array(arrayBuffer);


        let imageElement = document.createElement('img');
        imageElement.src = 'data:image/png;base64,' + encode(bytes);
        document.getElementById("displayImage").appendChild(imageElement);
        // document.getElementById("displayImage").children(imageElement);
        alert(result.data);
    }).catch((err) => {
        alert(err);
    });
    return false;
});