const CryptoJS = require("crypto-js");

class KM {
    constructor() {
        this.K2 = "12345678";
        this.K1 = this.getRandomString(8);

        console.log("[KM] Not yet encrypted KEY: ", this.K1);
        var encrptedText = CryptoJS.AES.encrypt(this.K1, this.K2);
        this.K1 = encrptedText.toString();
        console.log("[KM] Crypted KEY: " + this.K1);
    }

    getRandomString(length) {
        var randomChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        var result = "";
        for (var i = 0; i < length; i++) {
            result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
        }
        return result;
    }
}

module.exports = KM;
