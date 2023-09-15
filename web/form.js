import {server} from "./server.js"
const form = document.querySelector("#form")
const input = document.querySelector("#url")
const content = document.querySelector("#content")

form.addEventListener("submit", async (event) => {
  event.preventDefault()
  content.classList.add("placeholder")

  const videoURL = input.value
  
  if (!videoURL.includes("shorts")) {
    return (content.textContent = "Try again, not a shorts")
  }
    const [_, param] = videoURL.split("/shorts/")
    const [videoID] = param.split("?si")
    content.textContent = "Getting your audio"
    const transcription = await server.get("/summary/" + videoID)

    content.textContent = "making your summary"

    const summary = await server.post("/summary", {
      text: transcription.data.result,
    })

    content.textContent = summary.data.result
    content.classList.remove("placeholder")
  
  
 });
