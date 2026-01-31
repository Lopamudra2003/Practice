// Create arrays
let nums = [1, 2, 3, 4, 5];
let mixed = ["hello", 42, true, null];

// Access elements
console.log(nums[0]);            // 1  
console.log(mixed[mixed.length - 1]); // null  

// Add elements
nums.push(6);
mixed.unshift("start");

// Remove elements
let last = nums.pop();   // removes 6  
let first = mixed.shift(); // removes "start"

// Iterate over array
nums.forEach((n, i) => {
  console.log(`nums[${i}] = ${n}`);
});

// Transform array with map
let squares = nums.map(n => n * n);
console.log("Squares:", squares);

// Filter array
let evens = nums.filter(n => n % 2 === 0);
console.log("Evens:", evens);

// Reduce array to a single value
let sum = nums.reduce((acc, n) => acc + n, 0);
console.log("Sum:", sum);

// Find element
let firstBig = nums.find(n => n > 3);
console.log("First > 3:", firstBig);

// Check any/all
let hasNegative = nums.some(n => n < 0);
let allPositive = nums.every(n => n > 0);
console.log("Has negative?", hasNegative);
console.log("All positive?", allPositive);

// Concatenate arrays
let more = [7, 8, 9];
let combined = nums.concat(more);
console.log("Combined:", combined);

// Multidimensional array
let matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];
console.log("matrix[1][2]:", matrix[1][2]); // 6
