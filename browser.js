import Signer from "tiktok-signature"; // Import package
import randomUseragent from "random-useragent";

let url =
	"https://m.tiktok.com/api/item_list/?count=30&id=1&type=5&secUid=&maxCursor=0&minCursor=0&sourceType=12&appId=1233&region=CA&language=en";

async function generate_signer() {
	const signer = new Signer(); // Create new signer
	signer.userAgent = randomUseragent.getRandom();
	await signer.init(); // Create page with. Returns promise

	const signature = await signer.sign(url); // Get sign for your url. Returns promise
	const navigator = await signer.navigator(); // Retrieve navigator data used when signature was generated
	await signer.close(); // Close browser. Returns promise
	return [signature, navigator];
}

async function get_data(signer) {
	try {
		let [signature, navigator] = await signer;
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
	} catch (err) {
		console.error(`failed to get data ${err}`);
	}
}

setInterval(() => get_data(generate_signer()), 10000);

module.exports = {
	generate_signer,
	get_data,
};
