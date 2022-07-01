const fs = require("fs");
const path = require("path");
const { base32 } = require("rfc4648");
const crypto = require("crypto");
const os = require("os");

function createBase32Hash (str) {
    return base32.stringify(crypto.createHash('md5').update(str).digest()).replace(/(=+)$/, '').toLowerCase()
}

async function createBase32HashFromFile (file) {
    return createBase32Hash(await fs.promises.readFile(file, 'utf8'))
}

const patch = path.join(__dirname, "test.patch");

(async () => {
    console.log(`${os.platform()} result is: ${await createBase32HashFromFile(patch)}`);
})()