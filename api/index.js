const express = require('express')
const cors = require('cors')
const app = express()
const port = 3001

app.use(cors())
const fs = require("node:fs")

require('dotenv').config()

const OpenAI = require("openai");
const openai = new OpenAI();

let all_words = []
let boomer_words = []
const genz_words = require('./genZ_words.json')
for (let item of genz_words) {
    all_words.push({"word": item["word"], "type": "genz"})
    for (let word of item["normal_words"]) {
        boomer_words.push(word)
        all_words.push({"word": word, "type": "genz"})
    }
}



app.get('/', (req, res) => {
    res.send("Hello World");
})

app.get("/network", (req, res) => {
    res.send(require("./network2.json"))
})

// Duo Funcs
app.get("/get_lesson", async (req, res) => {
    const target = genz_words[Math.floor(Math.random() * genz_words.length)]
    const correct = target["word"]
    let options = []
    do {
        options = [
            correct,
            genz_words[Math.floor(Math.random() * genz_words.length)]["word"],
            genz_words[Math.floor(Math.random() * genz_words.length)]["word"],
            genz_words[Math.floor(Math.random() * genz_words.length)]["word"]
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
    console.log(result)
    res.send(result)
})

app.get("/get_card", async (req, res) => {
    // pick 4 gen z and 4 boomer words
    let cards = []
    for (let i = 0; i < 4; i++) {
        let target = genz_words[Math.floor(Math.random() * genz_words.length)];
        cards.push({ cardGenZ: target["word"], cardBoomer: target["normal_words"][Math.floor(Math.random() * target["normal_words"].length)] })
    }
    res.send(cards)
})

app.get("/conversation", async (req, res) => {
    const target = genz_words[Math.floor(Math.random() * genz_words.length)]
    console.log(target)
    const target_word = target["word"]
    const example_sentence = target["example"].replace("<span class=\"lesson-answer--hidden\">", "").replace("</span>", "")
    const opening_statement_prompt = `I am trying to write a conversation back and fourth. Please give me an opening statement that would 
    trigger a response that will include the word '${target_word}' in the traditional gen z meaning. Do not use any gen z language in this statement. A use of this in a sentence is  
    '${example_sentence}'. Respond with just this statement, without any quote marks.`
    const opening_statement = await getGPT(opening_statement_prompt)
    console.log(opening_statement)

    // const prompt = `Propose 4 response sentences each using a different gen z word to the statement ${opening_statement}.
    // Make the responses be relevant to the statement, however using a different gen z word (that may make the sentence not make sense) in each response.
    // Make sure one response use the word/phrase ${target_word} in response to the statement. The response should take the form {"response": response, "correct": true or false, "reasoning": reasoning}.
    // Respond with just the 4 responses, all separated by a , character.`
    const prompt = `Respond sentences each using a different gen z word to the statement ${opening_statement}.
    Make the response be relevant to the statement using the word/phrase ${target_word} in the response. 
    The response should take the form {"response": response, "reasoning": reasoning}.`
    const raw = await getGPT(prompt)
    const responses = JSON.parse(raw)
    console.log(responses)

    let result = {"initial": opening_statement, options: responses}
    res.send(result)
})


app.get("/update_all_words", (req, res) => {
    fs.writeFile("./all_words.json", JSON.stringify(all_words), (err) => {console.error(err)})
    res.send("Done")
})



async function getGPT(message) {
    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            {role: "system", content: "You are an assistant for a language learning app. You reply in a concise format."},
            {role: "user", content: message}
        ],
        store: true
    })
    // console.log(completion)
    return completion.choices[0].message.content
}
//
// function getPrompt(target_word){
//     const data = fs.readFileSync("./prompt.txt", "utf8")
//     return data.replace("${target_word}", target_word).replace("${boomer_words}", boomer_words.join(", "))
// }

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})