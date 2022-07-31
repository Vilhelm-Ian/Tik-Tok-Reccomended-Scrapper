import Signer from "tiktok-signature"; // Import package

const signer = new Signer(); // Create new signer
await signer.init(); // Create page with. Returns promise

const signature = await signer.sign("tiktok url"); // Get sign for your url. Returns promise
const navigator = await signer.navigator(); // Retrieve navigator data used when signature was generated

console.log(signature);
console.log(navigator);

await signer.close(); // Close browser. Returns promise
