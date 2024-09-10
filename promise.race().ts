// Promise.race() method

function examplePromiseRace (){  //return promise
    //Iterable promises
    const promise1 = new Promise<string>((resolve,reject)=> setTimeout(resolve,500,'from promise 1'));
    const promise2 = new Promise<string>((resolve,reject)=> setTimeout(resolve,1000,'from promise 2'));
    //Another way to write promise 
    // const Promise2 = new Promise((resolve,reject)=>
    //     setTimeout(()=>{
    //     console.log("from promise 2");
    //     },500)
    // );

return Promise.race([promise1,promise2]);
}

// examplePromiseRace().then(
//     value=>console.log(value),
//     err =>console.log(err)
// );

examplePromiseRace().then(console.log).catch(console.error);