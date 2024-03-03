import * as fs from "fs"
import {text} from "./text_data.js"

function getRandomArbitary(min, max) {
		return Math.floor(Math.random() * (max - min) + min)
}

function writeToFile(file){
	let rand = getRandomArbitary(0,13)
	let data = text[rand]
	fs.appendFileSync(file, data+"\n")
}


function fillFile(file, size){
	let fileSize = fs.statSync(file)['size']

	while(fileSize<=size){
		writeToFile(file)
		fileSize = fs.statSync(file)['size']
	}
}

export {fillFile}