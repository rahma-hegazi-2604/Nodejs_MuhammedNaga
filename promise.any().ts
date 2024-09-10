// Promise.any() method

function examplePromiseAny (){  //return promise
    
    const promise1 = new Promise<string>((resolve,reject)=> setTimeout(reject,500,'from promise 1'));
    const promise2 = new Promise<string>((resolve,reject)=> setTimeout(resolve,1000,'from promise 2'));
    const promise3 = new Promise<string>((resolve,reject)=> setTimeout(resolve,200,'from promise 3'));

return Promise.any([promise1,promise2,promise3]);
}

examplePromiseAny().then(console.log).catch(console.error);
//return the fullfilled and the faster value