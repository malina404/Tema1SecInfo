const KM = require("./KM");
let CryptoJS = require("crypto-js");
const readline = require("readline");

class node {
    constructor() {
        this.K2 = "12345678";
        this.method = "ECB";
        this.IV = "12345678";
    }

    askForEncKey(cryptedKey) {
        this.cryptedKey = cryptedKey;
        this.key = cryptedKey;
        var decryptedText = CryptoJS.AES.decrypt(cryptedKey, this.K2);
        this.key = decryptedText.toString(CryptoJS.enc.Utf8);
    }

    readMethodFromConsole() {
        const readMethod = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });

        readMethod.question("What method do you want to use? (ECB=1 CFB=2)", (answer) => {
            console.log(answer);
            if (answer === 1) {
                this.method = 1;
                console.log("ECB");
            } else if (answer === 2) {
                this.method = 2;
                console.log("CFB");
            } else console.log("Wrong method!");
            readMethod.close();
        });
    }

    getMethod(method) {
        this.method = method;
    }

    sendMessage(text, node) {
        console.log(text);
    }

    encECB(text) {
        const array = [];
        let cryptedText = "";
        let cryptedArray = [];

        for (let index = 0; index < text.length / 8; index = index + 1)
            array.push(text.substring(index * 8, (index + 1) * 8));

        for (let e of array) {
            var encrptedText = CryptoJS.AES.encrypt(e, this.key).toString();
            cryptedText = cryptedText.concat(encrptedText);
            cryptedArray.push(encrptedText);
        }
        console.log("\nCrypted array with ECB: \n", cryptedArray);
        return cryptedArray;
    }

    decECB(cryptedArray) {
        let decryptedArray = [];
        for (let e of cryptedArray) {
            var decryptedText = CryptoJS.AES.decrypt(e, this.key);
            decryptedArray.push(decryptedText.toString(CryptoJS.enc.Utf8));
        }
        console.log("Decrypted text with ECB: \n", decryptedArray.join(""));
    }

    XOR(a, b) {
        const result = [];
        for (let i = 0; i < a.length; i++) {
            result.push(String.fromCharCode(a.charCodeAt(i) ^ b.charCodeAt(i)));
        }
        return result.join("");
    }

    encCFB(text) {
        let cryptedArray = [];
        let chunks = [];

        for (var i = 0, charsLength = text.length; i < charsLength; i += 16) {
            chunks.push(text.substring(i, i + 16));
        }

        chunks.forEach((chunk, index) => {
            let encryptedText = "";
            if (index === 0) {
                encryptedText = CryptoJS.AES.encrypt(this.IV, this.key).toString();
            } else {
                encryptedText = CryptoJS.AES.encrypt(cryptedArray[index - 1], this.key).toString();
            }

            const ciph = encryptedText.substring(0, 8);

            encryptedText = this.XOR(chunk, ciph);
            cryptedArray.push(encryptedText);
        });

        console.log("\nCrypted text with CFB: \n ", cryptedArray);
        return cryptedArray;
    }

    decCFB(cryptedArray) {
        let decryptedArray = [];
        let decText = "";

        cryptedArray.forEach((ciphertext, index) => {
            let encryptedText = "";
            if (index === 0) {
                encryptedText = CryptoJS.AES.encrypt(this.IV, this.key).toString();
            } else {
                encryptedText = CryptoJS.AES.encrypt(cryptedArray[index - 1], this.key).toString();
            }
            decText = this.XOR(ciphertext, encryptedText.substring(0, 8));
            decryptedArray.push(decText);
        });

        console.log("Decrypted text with CFB: \n ", decryptedArray.join(""));
    }
}

module.exports = node;
