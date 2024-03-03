import * as fs from "fs"
import * as readline from "readline"
import {bubble} from "./bubble_sort.js"
//import * as lineByLine from 'n-readlines'

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
	//fs.mkdirSync(transferFolder)

	// let res = new Promise(()=>{

	// 	let readInterface = readline.createInterface({
	// 	input: fs.createReadStream(file),
	// 	console: false
	// })
	// 	readInterface.on("line", function(line){
	// 		sum = sum+line.length
	// 		if(sum<=sizeRAM){
	// 			arr.push(line)
	// 		}else{
	// 			let sorted_array = bubble(arr)
	// 			writeSortedArray(`data/sorted_hello_${index}.txt`, sorted_array)
	// 			index++
	// 			arr = []
	// 			arr.push(line)
	// 			sum=0
	// 		}
	// 	})

	// 	readInterface.on("close", ()=>{
	// 	//console.log(arr)
	// 	let sorted_array = bubble(arr)
	// 	//console.log(sorted_array)
	// 	writeSortedArray(`data/sorted_hello_${index}.txt`, sorted_array)
	// 	})

	// })

	// return res

	// readInterface.on("line", function(line){
	// 	sum = sum+line.length
	// 	if(sum<=sizeRAM){
	// 		arr.push(line)
	// 	}else{
	// 		let sorted_array = bubble(arr)
	// 		writeSortedArray(`data/sorted_hello_${index}.txt`, sorted_array)
	// 		index++
	// 		arr = []
	// 		arr.push(line)
	// 		sum=0
	// 	}
	// })

	// readInterface.on("close", ()=>{
	// 	//console.log(arr)
	// 	let sorted_array = bubble(arr)
	// 	//console.log(sorted_array)
	// 	writeSortedArray(`data/sorted_hello_${index}.txt`, sorted_array)
	// })


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

	// readInterface.on("close", ()=>{
	// 	//console.log(arr)
	// 	let sorted_array = bubble(arr)
	// 	//console.log(sorted_array)
	// 	writeSortedArray(`data/sorted_hello_${index}.txt`, sorted_array)
	// })


}


function writeSortedArray(file, array){
	for(let i=0; i<array.length; i++){
		let line = array[i]
		fs.appendFileSync(file, line+"\n")
	}

	//fs.appendFileSync(file, "==========END SORTED ARRAY==========\n")
}

export {createFilteredFiles, writeSortedArray}
