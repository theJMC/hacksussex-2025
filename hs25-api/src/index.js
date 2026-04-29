/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import ALL_WORDS from "./all_words.json";
import GENZ_WORDS from "./genZ_words.json";

let all_words = []
let boomer_words = []

for (let item of GENZ_WORDS) {
	all_words.push({ "word": item["word"], "type": "genz" })
	for (let word of item["normal_words"]) {
		boomer_words.push(word)
		all_words.push({ "word": word, "type": "genz" })
	}
}


export default {
	async fetch(request, env, ctx) {

		switch (new URL(request.url).pathname) {
			case "/":
				return new Response("Hello World!");
			case "/network":
				return new Response(JSON.stringify(require("./network2.json")));
			case "/get_lesson":
				const target = GENZ_WORDS[Math.floor(Math.random() * GENZ_WORDS.length)]
				const correct = target["word"]
				let options = []
				do {
					options = [
						correct,
						GENZ_WORDS[Math.floor(Math.random() * GENZ_WORDS.length)]["word"],
						GENZ_WORDS[Math.floor(Math.random() * GENZ_WORDS.length)]["word"],
						GENZ_WORDS[Math.floor(Math.random() * GENZ_WORDS.length)]["word"]
					]
				} while (new Set(options).size !== options.length)

				let shuffled = options.sort(() => Math.random() - 0.5)

				const result = {
					"target_word": target["word"],
					"options": shuffled,
					"sentence": target["example"],
					"correct_word": correct,
					"hint": target["hint"]
				}
				return new Response(JSON.stringify(result));
			case "/get_card":
				let cards = []
				for (let i = 0; i < 4; i++) {
					let target = GENZ_WORDS[Math.floor(Math.random() * GENZ_WORDS.length)];
					cards.push({ cardGenZ: target["word"], cardBoomer: target["normal_words"][Math.floor(Math.random() * target["normal_words"].length)] })
				}
				return new Response(JSON.stringify(cards));
			case "/conversation":
				const converstaion_target_word = GENZ_WORDS[Math.floor(Math.random() * GENZ_WORDS.length)]
				console.log(`Target word: ${converstaion_target_word["word"]}`)

				const example_sentence = converstaion_target_word["example"].replace("<span class=\"lesson-answer--hidden\">", "").replace("</span>", "")
				const opening_statement_prompt = `I am trying to write a conversation back and fourth. Please give me an opening statement that would 
    trigger a response that will include the word '${converstaion_target_word["word"]}' in the traditional gen z meaning. Do not use any gen z language in this statement. A use of this in a sentence is  
    '${example_sentence}'. Respond with just this statement, without any quote marks.`

				const opening_statement = await env.hs25_ai.run(
					"@cf/meta/llama-3.1-8b-instruct",
					{ 
						prompt: opening_statement_prompt
					}
				)
				// const opening_statement = await getGPT(opening_statement_prompt)
				console.log(`Opening statement: ${opening_statement.response}`)

				const prompt = `Respond sentences each using a different gen z word to the statement ${opening_statement.response}.
				You HAVE to use the gen-z word ${converstaion_target_word["word"]} in all of your responses, in a typical gen z context. Try to use normal words for the rest of the sentence, but you can use gen z words if you want.
    The response should take the form {"response": response, "reasoning": reasoning}.`

				const raw = await env.hs25_ai.run(
					"@cf/meta/llama-3.1-8b-instruct",
					{ 
						prompt: prompt
					}
				)
				// const raw = await getGPT(prompt)
				const responses = JSON.parse(raw.response)
				console.log(responses)

				return new Response(JSON.stringify({ "initial": opening_statement.response, options: responses }));
			default:
				return new Response("Not Found", { status: 404 });
		}

		return new Response("Hello World!");
	},
};
