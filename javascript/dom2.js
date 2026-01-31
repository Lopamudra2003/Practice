//let div = document.querySelector("div");
// console.log(div);

// let id = div.getAttribute("id");
// console.log(id);

// let name = div.getAttribute("name");
// console.log(name);

// div.style.backgroundcolor = "green";
// div.style.backgroundcolor = "purple";
// div.style.fontsize = "23px" ;
// div.style.visibility = "hidden";

// div.innerText = "HELLO !!" ;

// let newBtn = document.createElement("button");
// newBtn.innerText = "click me!";
// console.log(newBtn);

// let div = document.querySelector("div");
// div.append(newBtn);

let newHeading = document.createElement("h1");
newHeading.innerHTML = "<i> Hi, i am new !!</i>";
document.querySelector("body").prepend(newHeading);