const express = require('express')
const app = express()
const port = 3001

require('dotenv').config()

const OpenAI = require("openai");
const openai = new OpenAI();

const boomer_words = require('./boomer_words.json')
const genz_words = require('./genZ_words.json')

app.get('/', (req, res) => {
    res.send("Hello World");
})

// Duo Funcs
app.get("/get_lesson", async (req, res) => {
    // pick target word from gen-z list
    // get the answer and 5 other words from the boomer list
    // send to frontend
    const target_word = genz_words[Math.floor(Math.random() * genz_words.length)]
    const msg = `The target word is ${target_word}, and it is used in the traditional Gen Z way. please choose 4 words from the list below, and 2 words that \
    are not in the list, which are synonyms of the target word. You also need to provide a sentence where the target word is used. The words used should have one clear, correct normal word, which should also be used as the normal word in the format.
    Please give the answer in the format \
    {"options": ["word1, word2, word3, word4, word5, word6"], "sentence": the word used in a sentence, "correct_word": the normal word} \
    The list of words is: ${boomer_words.join(", ")}`
    const response = JSON.parse(await getGPT(msg))
    console.log(response)
    const options = response["options"]
    const sentence = response["sentence"]
    const correct_word = response["correct_word"]
    const result = {"target_word": target_word, "options": options, "sentence": sentence, "correct_word": correct_word}
    console.log(result)
    res.send(result)
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

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})