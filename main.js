const KM = require("./KM");
const node = require("./node");
const fs = require("fs");

async function program() {
    const keym = new KM();

    const nodeA = new node();
    nodeA.askForEncKey(keym.K1);
    console.log("[A] Key:", nodeA.key);

    const nodeB = new node();
    nodeB.askForEncKey(nodeA.cryptedKey);
    console.log("[B] Key:", nodeB.key);

    nodeB.getMethod(nodeA.method);
    nodeB.sendMessage("\n\nStart encryption:\n", nodeA);

    let text = fs.readFileSync("/home/malina/Desktop/file.txt", "utf-8");
    console.log("Before encryption text:", text);
    text = text.padEnd(text.length + (8 - (text.length % 8)), " ");

    const cryptedArrayECB = nodeA.encECB(text);
    nodeB.decECB(cryptedArrayECB);

    const cryptedArrayCFB = nodeA.encCFB(text);
    nodeB.decCFB(cryptedArrayCFB);
}

program();
