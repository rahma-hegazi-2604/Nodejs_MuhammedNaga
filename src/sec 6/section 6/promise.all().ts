// Promise.all() method
import { rejects } from "assert";
import { resolve } from "path";

function examplePromiseAll (){  //return promise
    
    const promise1 = new Promise<string>((resolve,reject)=> setTimeout(resolve,500,'from promise 1'));
    const promise2 = new Promise<string>((resolve,reject)=> setTimeout(reject,1000,'from promise 2'));
    

return Promise.all([promise1,promise2]);
}

examplePromiseAll().then(console.log).catch(console.error);
