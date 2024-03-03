import * as fs from "fs"
import * as process from 'process';
import * as readline from "readline"
import {text} from "./text_data.js"
import {bubble} from "./bubble_sort.js"
import {fillFile} from "./fill_File.js"
import {createFilteredFiles} from "./createFilteredFiles.js"
//import * as lineByLine from 'n-readlines' 
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

const MB500 = 800

//fillFile("hello.txt", MB500)

//let mb100 = 1024*1024*200

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


// finalMerge("/home/gosha/nodejs/decorators_lesson/src/jun_task/hello.txt",
//  "/home/gosha/nodejs/decorators_lesson/src/jun_task/final.txt", 
//  "/home/gosha/nodejs/decorators_lesson/src/jun_task/data/", 
//  mb100
//  )

let readFromFile = process.argv[2]
let saveToFile = process.argv[3]
let transferFolder = process.argv[4]
let memoryLimit = process.argv[5]

finalMerge(readFromFile, saveToFile, transferFolder, memoryLimit)




