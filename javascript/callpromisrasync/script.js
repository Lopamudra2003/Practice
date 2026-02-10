function asyncFunc1() {
    return new Promise ((resolve, reject) => {
        setTimeout(() => {
            console.log("data1");
            resolve("success");
        },4000);
    });
    
}

function asyncFunc2() {
    return new Promise ((resolve, reject) => {
        setTimeout(() => {
            console.log("data2");
            resolve("success");
        },4000);
    });
    
}

console.log ("fetching data1....");
asyncFunc1().then((res) =>  {
    console.log("fetching data2....");
    asyncFunc2().then((res) => {} );
})


//Promise chain

console.log("getting data1....");
getData(1)

    .then((res) => {
    console.log("getting data2....");
    return getData(2);
 })

    .then((res) => {
    console.log("getting data3 ....");
    return getData(3);
    })

    .then((res) => {
    console.log(res);
    
    });