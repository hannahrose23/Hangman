let promise = new Promise(function(resolve, reject){
    resolve();
});

let anotherPromise = promise.then(function(response){
    console.log("then called", response);
    return {hello:response};
});

anotherPromise.then(function(massagedData){
    console.log("anotherPromise called", massagedData);
});