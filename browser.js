import Signer from "tiktok-signature"; // Import package

const signer = new Signer(); // Create new signer
await signer.init(); // Create page with. Returns promise
let url =
	"https://m.tiktok.com/api/item_list/?count=30&id=1&type=5&secUid=&maxCursor=0&minCursor=0&sourceType=12&appId=1233&region=CA&language=en";

const signature = await signer.sign(url); // Get sign for your url. Returns promise
const navigator = await signer.navigator(); // Retrieve navigator data used when signature was generated

async function get_data() {
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
}

setInterval(() => get_data(), 5000);
