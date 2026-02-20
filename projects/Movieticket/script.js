const seatContainer = document.getElementById("seatContainer");
const selectedSeatsDisplay = document.getElementById("selectedSeats");
const totalDisplay = document.getElementById("total");

const ticketPrice = 150;
const convenienceFee = 30;
let selectedSeats = [];

function openBooking() {
    document.getElementById("bookingSection").style.display = "block";
    generateSeats();
}

function generateSeats() {
    seatContainer.innerHTML = "";

    let bookedSeats = JSON.parse(localStorage.getItem("bookedSeats")) || [];

    for (let row = 0; row < 5; row++) {
        for (let col = 0; col < 10; col++) {
            let seatNumber = String.fromCharCode(65 + row) + (col + 1);
            const seat = document.createElement("div");
            seat.classList.add("seat");

            if (bookedSeats.includes(seatNumber)) {
                seat.classList.add("booked");
            }

            seat.innerText = seatNumber;

            seat.addEventListener("click", () => selectSeat(seat, seatNumber));
            seatContainer.appendChild(seat);
        }
    }
}

function selectSeat(seat, seatNumber) {

    if (seat.classList.contains("booked")) return;

    if (seat.classList.contains("selected")) {
        seat.classList.remove("selected");
        selectedSeats = selectedSeats.filter(s => s !== seatNumber);
    } else {
        if (selectedSeats.length >= 6) {
            alert("Maximum 6 seats allowed!");
            return;
        }
        seat.classList.add("selected");
        selectedSeats.push(seatNumber);
    }

    updateSummary();
}

function updateSummary() {
    selectedSeatsDisplay.innerText = selectedSeats.length;
    totalDisplay.innerText = (selectedSeats.length * ticketPrice) + convenienceFee;
}

function confirmBooking() {

    if (selectedSeats.length === 0) {
        alert("Please select seats!");
        return;
    }

    let bookedSeats = JSON.parse(localStorage.getItem("bookedSeats")) || [];
    bookedSeats = [...bookedSeats, ...selectedSeats];

    localStorage.setItem("bookedSeats", JSON.stringify(bookedSeats));

    alert("Booking Confirmed!");

    selectedSeats = [];
    generateSeats();
    updateSummary();
}