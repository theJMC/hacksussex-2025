const express = require('express')
const cors = require('cors')
const app = express()
const port = 3001

app.use(cors())
const fs = require("node:fs")

require('dotenv').config()

// const OpenAI = require("openai");
// const openai = new OpenAI();

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

// Duo Funcs
app.get("/get_lesson", async (req, res) => {
    const target = genz_words[Math.floor(Math.random() * genz_words.length)]
    // const target = genz_words[0]
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

app.get("/update_all_words", (req, res) => {
    fs.writeFile("./all_words.json", JSON.stringify(all_words), (err) => {console.error(err)})
    res.send("Done")
})



// async function getGPT(message) {
//     const completion = await openai.chat.completions.create({
//         model: "gpt-4o-mini",
//         messages: [
//             {role: "system", content: "You are an assistant for a language learning app. You reply in a concise format."},
//             {role: "user", content: message}
//         ],
//         store: true
//     })
//     // console.log(completion)
//     return completion.choices[0].message.content
// }
//
// function getPrompt(target_word){
//     const data = fs.readFileSync("./prompt.txt", "utf8")
//     return data.replace("${target_word}", target_word).replace("${boomer_words}", boomer_words.join(", "))
// }

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})