// const student ={
//     fullName:"lopamudra baral",
//     mark:94.4,
//     printMarks: function (){
//         console.log("marks = ", this.marks);
//     },
// };


class ToyotaCar {
    constructor(brand,mileage){
        console.log("creating new brand");
        this.brand=brand;
        this.mileage=mileage;
    }
    start(){
        console.log("start");
    }

    stop(){
        console.log("stop");
    }

    setBrand(brand){
        this.brandName = brand;
    }
}

let fortuner = new ToyotaCar("fortuner",10);
console.log(fortuner);
let lexus = new ToyotaCar("lexus",12);
console.log(lexus);




