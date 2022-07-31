import Signer from "tiktok-signature"; // Import package

const signer = new Signer(); // Create new signer
await signer.init(); // Create page with. Returns promise
let url = process.argv.slice(2)[0];

const signature = await signer.sign(url); // Get sign for your url. Returns promise
const navigator = await signer.navigator(); // Retrieve navigator data used when signature was generated

console.log(signature);
console.log(navigator);

let res = await fetch(url, {
	method: "GET",
	headers: {
		"x-tt-params": signature.x_tt_params,
		"accept-encoding": "gzip, deflate",
		"User-Agent": navigator.user_agent,
	},
});

let data = await res.json();
console.log(data);

await signer.close(); // Close browser. Returns promise
