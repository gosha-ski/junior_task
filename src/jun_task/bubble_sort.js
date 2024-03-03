function bubble(array) {
	for(let i=0; i<array.length; i++){
		//console.log(process.memoryUsage().heapUsed)
		for(let j=0; j<array.length; j++){
			if(array[i].localeCompare(array[j])==-1){
				let temp = array[j]
				array[j] = array[i]
				array[i]= temp
			}
		}
	}

	return array
}

export {bubble}