import * as fs from "fs"
import * as process from 'process';
import * as readline from "readline"
import {bubble} from "./bubble_sort.js"
import {createFilteredFiles} from "./createFilteredFiles.js"
import * as path from "path"


function writeArrayToFile(array, file_path){
	for(let i=0; i<array.length; i++){
		fs.appendFileSync(file_path, array[i]+"\n")
	}
}

function mergeDataInSortedFile(from, out){
	let files_array = fs.readdirSync(from)
	let string_array = fs.readFileSync(`${from}/${files_array[0]}`).toString().split("\n")
	let file_min = files_array[0]
	let string = fs.readFileSync(`${from}/${files_array[0]}`).toString().split("\n")[0]

	for(let i=1; i<files_array.length; i++){
		let string_i = fs.readFileSync(`${from}/${files_array[i]}`).toString().split("\n")[0]

		if(string.localeCompare(string_i)==1){
			string = string_i
			file_min = files_array[i]
		}
	}

	let newData = fs.readFileSync(`${from}/${file_min}`).toString().split("\n")
	newData.shift()

	if(newData.length==1){
		let str = newData.join("\n")
		fs.writeFileSync(`${from}/${file_min}`, str)
		fs.appendFileSync(`${out}`, string+"\n")
		fs.unlinkSync(`${from}/${file_min}`)
	}else{
		let str = newData.join("\n")
		fs.writeFileSync(`${from}/${file_min}`, str)
		fs.appendFileSync(`${out}`, string+"\n")
	}
}


async function finalMerge(readFrom, saveTo, transferFolder, memoryLimit){
	let memory = (1024*1024*memoryLimit*0.8)/3
	await createFilteredFiles(readFrom, transferFolder, memory)
	console.log("data created")
	let files = fs.readdirSync(transferFolder)
	while(files.length>0){
		mergeDataInSortedFile(transferFolder,saveTo)
		files = fs.readdirSync(transferFolder)
	}

	fs.rmdirSync(transferFolder)
}


let readFromFile = process.argv[2]
let saveToFile = process.argv[3]
let transferFolder = process.argv[4]
let memoryLimit = Number(process.argv[5])
console.log(memoryLimit)

finalMerge(readFromFile, saveToFile, transferFolder, memoryLimit)




