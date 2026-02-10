function getData(dataId, getNextData){
    setTimeout(() => {
        console.log("data",dataId);
        if (getNextData){
            getNextData();
        }
    }, 2000);
}

// callback hell type code

getData(1, () => {
    console.log("data 1......")

    getData(2, () => {
        console.log("data 2......")
        
        getData(3, () => {
            console.log("data 3......")

            getData(4);
        });
    });
});


//promise type code


let promise = new Promise((resolve, reject) => {
    console.log("I am the Queen of IGIT");
    resolve("success");
});




