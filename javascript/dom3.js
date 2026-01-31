let newBtn = document.createElement("button");
 newBtn.innerText = "click me!";
 console.log(newBtn);

 newBtn.style.color = "white";
 newBtn.style.backgroundColor = "red";


 document.querySelector("body").prepend(newBtn);
 let para = document.querySelector("p");