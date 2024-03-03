import * as fs from "fs"
import * as readline from "readline"
import {bubble} from "./bubble_sort.js"


async function createFilteredFiles(file, transferFolder, sizeRAM){
	let arr = []
	let readInterface = readline.createInterface({
		input: fs.createReadStream(file),
		console: false
	})

	let sum = 0
	let index = 0
	if(!fs.existsSync(transferFolder)){
		fs.mkdirSync(transferFolder)
	}
	

	for await (let line of readInterface){
		sum = sum+line.length
		if(sum<=sizeRAM){
			arr.push(line)
		}else{
			let sorted_array = bubble(arr)
			writeSortedArray(`${transferFolder}/sorted_hello_${index}.txt`, sorted_array)
			index++
			arr = []
			arr.push(line)
			sum=0
			
		}
	}

	let sorted_array = bubble(arr)
	writeSortedArray(`${transferFolder}/sorted_hello_${index}.txt`, sorted_array)


}


function writeSortedArray(file, array){
	for(let i=0; i<array.length; i++){
		let line = array[i]
		fs.appendFileSync(file, line+"\n")
	}

	
}

export {createFilteredFiles, writeSortedArray}
