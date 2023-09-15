import ytdl from "ytdl-core"
import fs from "fs"

export const download = (videoId) => 
  new Promise ((resolve, reject) => {
    const videoURL = "https://www.youtube.com/shorts/" + videoId

    ytdl(videoURL, { quality: "lowestaudio", filter: "audioonly" })
      .on("info", (info) => {
        const seconds = info.formats[0].approxDurationMs / 1000

        if (seconds > 60) {
          throw new Error("The video length is under 60 seconds") 
        }
      })
      .on("end", () => {
        resolve()
      })
      .on("error", (error) => {
        reject(error)
      })
      .pipe(fs.createWriteStream("./tmp/audio.mp4"))
  })
