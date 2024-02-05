const express = require("express");
const HTTP_SERVER = express();
const bodyParser = require("body-parser");
const PORT = 5000

//Injecting Middleare
HTTP_SERVER.use(bodyParser.json());

HTTP_SERVER.listen(PORT, ()=>{
    console.log(`Hall Booking Server Started on http://localhost:${PORT}`);
})

//Initial store data for creating room
let rooms = [{
    roomId:"Room1",
    seatsAvailable:"3",
    amenities:"wi-fi,ac,food",
    price:"80"
}];

// Creating Room

HTTP_SERVER.post("/create/room", (req, res) => {
    console.log(req.body);
    const room = req.body;
    console.log(room.roomId)
    const exit = rooms.find((id) =>{
        id.roomId === room.roomId
    });
    if(exit != undefined) 
    {
        res.status(400).json({
        msg: "Room Already Occupied"
        });
    }
    else{
        rooms.push(room);
        res.status(201).json({
            msg: "Room Created Successfully"
        });
    }
});

// View Room Details

HTTP_SERVER.get("/view/room", (req, res) =>{
    res.status(200).json({
        RoomList : rooms
    });
    console.log(rooms);
});

//Initial store data for booking
let bookings = [{
    customer: "Moni",
    bookingID: "Book1",
    bookingDate: "2024-01-10",
    roomId: "Room1",
    startTime: "02:00PM",
    endTime: "10:09AM",
    status: "Booking Successed"
}
];


let customers = [
    { name: 'Moni',
     bookings: [ 
        {
            customer: 'Moni',
            bookingDate: '20230612',
            startTime: "02:00PM",
            endTime: "10:09AM",
            bookingID: 'Book1',
            roomId: 'Room1',
            status: 'Booking Successed'
          }
      ] }
];

// Booking Room

HTTP_SERVER.post("/create/book/:id", (req,res) => {
    try{
        const id = req.params;
        console.log(id)
        let booking_details = req.body; 
        let bookId = bookings.filter((b) => b.roomId === id)
        console.log(bookId)
        if(bookId.length > 0)
        {
            let date_check = bookId.filter((check) => check.bookingDate === bookings.bookingDate);
            if(date_check.length === 0)
            {
                let new_bookId = "Book"+(bookings.length + 1);
                let new_book = {...booking_details, bookingID: new_bookId, roomId:id, status:"Booking Successed"};
                bookings.push(new_book);
                return res.status(201).json({
                    msg: "Hall Booked Successfully!!",
                    Booking: bookings,
                    NewBooking: new_book
                })
            }
            else{
                return res.status(400).json({
                    msg:"Hall already booked for this date, choose another date", Bookings:bookings});
            }
        }
        else{
                let new_bookId = "Book"+(bookings.length + 1);
                let new_book = {...booking_details, bookingID: new_bookId, roomId:id, status:"Booking Successed"}
                bookings.push(new_book);
                const customer_details = customers.find(cust => 
                  cust.name === new_book.customer);
                  if (customer_details) {
                    customer_details.bookings.push(new_book);
                  } else {
                      customers.push({ name:new_book.customer,bookings:[new_book]});
                  }
                return res.status(201).json({message:"Hall Booked Successfully!!!", Bookings:bookings});
    
        }
    }
    catch(e){
        res.status(400).json({
            msg: "Boorking Error",
            error: e,
            data: bookings
        })
    }
})

// Viewing all booked data

HTTP_SERVER.get("/view/booked", (req,res) =>{
    const bookedRooms = bookings.map((booking) => 
    {
        const {roomId , status, name, bookingDate, startTime, endTime} = booking;
        return {roomId , status, name, bookingDate, startTime, endTime} 
    });
    res.status(201).json(bookedRooms);
})

// List of all customers who booked room

HTTP_SERVER.get('/customers', (req, res) => {
    const customerBookings = customers.map(custo => {
      const { name, bookings } = custo;
      const customerDetails = bookings.map(booking => {
        const { roomId, bookingDate, startTime, endTime } = booking;
        return { name, roomId, bookingDate, startTime, endTime };
      });
     
      return customerDetails;
    })
   
    res.status(200).json(customerBookings);
  });

  //how many times the user booked the room

HTTP_SERVER.get('/customer/:name', (req, res) => {
    const { name } = req.params;
    const customer = customers.find(cust => cust.name === name);
    console.log(customer)
    if (!customer) {
      res.status(404).json({ error: 'Customer not found' });
      return;
    }
    const customerBookings = customer.bookings.map(booking => {
      const { customer,roomId, startTime, endTime, bookingID, status, bookingDate,booked_On } = booking;
      return { customer};
    });
    let len = customerBookings.length;
    res.status(200).json({
        Customer_name: customerBookings,
        No_of_times_customer_booked : len
    });
  });
