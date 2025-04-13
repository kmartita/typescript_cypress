// this is our example:



// to create method:
const writeNumbers = () =>{
    console.log("--------------------")
    const numb = 5;
    let second_numb = 6;
    console.log('my first number  =' + numb)
    console.log('my second number  = ' + second_numb)
}

const addNumbers = (numb1:number, numb2:number) =>{
    console.log("--------------------")
    console.log('my first number  =' + numb1)
    console.log('my second number  = ' + numb2)
    console.log('sum = ' + (numb1 + numb2))
    console.log('sum = ' + numb1 + numb2)
}

const arrays = () =>{
    console.log("--------------------")
    const myArray = ["test",3,"element"]
    console.log(myArray[0])
    console.log(myArray[1])
    console.log(myArray[2])
}

const objects = () =>{
    console.log("--------------------")
    const myobj = {
        first:4,
        second:{
            yahoo: 'I am here'
        }
    }
    console.log(myobj.first)
    console.log(myobj.second)
    console.log(myobj.second.yahoo)
}



const examples = ()=>{
    const myObj = {
        min:2,
        max:3
    }
    //     =>  console.log(myObj.min)   => 2
    //      =>  console.log(myObj['min'])   => 2
    const myArray = ["first", "last"]
    // =>  console.log(myArray[0])   => first

    let line:string = "THIS is my string"
    let numb:number = 3

}


writeNumbers()
addNumbers(1,2)
arrays()
objects()