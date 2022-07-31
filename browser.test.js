import { generate_signer } from "./browser.js";

test("are user agent different", async () => {
	let result1 = await generate_signer();
	let result2 = await generate_signer();
	let first_user_agent = result1[1].user_agent;
	let second_user_agent = result2[1].user_agent;
	console.log(first_user_agent, second_user_agent);
	expect(first_user_agent !== second_user_agent).toBe(true);
}, 15000);
