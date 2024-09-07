import { promises } from "dns";

type TTodo ={ id: number, todo: string, userId:number };

type TUser ={
    role: 'admin'|'user';
    id: number;
    username: string;
}

function getUserTodo(user:TUser){
    console.log(`fetching to do list , for ${user.id}`);

    return new Promise<TTodo[]>((resolve,reject) =>{
        setTimeout(()=>{
            const todoList =[{
                id: 1,
                todo:"Do something nice for someone i care about",
                userId: 10,
            },
            {
                id: 2,
                todo:"second to do",
                userId: 12,
            }
        ]
            resolve(todoList)
            console.log(todoList);
        },3000);
    });

};


function fetchUser( user: TUser){
    console.log("fetching user");

    // DATABASE =[{},{},{},{},{},{id =100}];
    const userList = Array.from({length: 100},(_,idx)=>{
        return {
            id : idx+1,
        };
    });
    return new Promise <TUser>((resolve,reject) =>{
        setTimeout(()=>{
            if(user.id > userList.length){
                reject(`unknown user ID ${user.id}`);
                return;
            }
            resolve(user);
        },1500);
    });
}

// function onSuccess(data:TUser){
//     console.log("succesfully getting the user data");
//     if (data.role === "admin"){
//         console.log("welcome admin");
//     }else{
//         console.log("welcome user");
//     }

// }

// function onError(){
//     console.error("error while getting the data");
// }

// fetchUser().then(onSuccess,onError);

const user :TUser={
    role: "user",
    id:10 ,
    username:"codeawy"
};

// On success
function onSuccess(user: TUser){
    return getUserTodo(user);
}

// On rejected
function onRejected(err: Error){
    console.log(err);
}

function onFinally(){
    console.log("stop using indicator");
}

fetchUser(user)
.then(onSuccess)
.catch(onRejected)
.finally(onFinally);