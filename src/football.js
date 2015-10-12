


function createTicketBooth(){
  return {
    a: {
      available: 500,
      filled: 0,
      reserved: {
        som: 0
      }
    },
    b: {
      available: 500,
      filled: 0,
      reserved: {
        som: 100
      },
    },
  };
}

var seatPrices = {
  a: 50,
  b: 30
};

function placeTicketOrder(numberOfTickets, seatSection, studentAffiliation, ticketBooth) {
  var fulfilled = false;
  var totalPrice = 0;

  if (seatSection !== 'a' && seatSection !== 'b') {
    throw new Error('invalid seat section');
  }

  // Are enough seats available?
  if (numberOfTickets < ticketBooth[seatSection].available) {

    // If so, decrement the number of tickets available, we just sold 'em!
    var numberOfHalfTickets = 0;
    ticketBooth[seatSection].available -= numberOfTickets;
    ticketBooth[seatSection].filled += numberOfTickets;
    
    // Half price tickets for som students in the reserved section b
    // Fill as many as these as possible, the rest of the tickets are non reserve / full price
    if(seatSection == 'b' && studentAffiliation == 'som') {
      if (ticketBooth[seatSection].reserved.som < numberOfTickets) {
        numberOfHalfTickets = ticketBooth[seatSection].reserved.som;
        ticketBooth[seatSection].reserved.som = 0;
      }
      else {
        ticketBooth[seatSection].reserved.som -= numberOfTickets;
        numberOfHalfTickets = numberOfTickets; 
      }
      
    }
    // Half price tickets for yale college students
    else if (studentAffiliation == 'yc') {
      numberOfHalfTickets = numberOfTickets;
    }
    
    totalPrice = numberOfTickets * seatPrices[seatSection] - numberOfHalfTickets * seatPrices[seatSection] / 2;

    fulfilled = true;
  }

  return {
    fulfilled: fulfilled,
    totalPrice: totalPrice
  };
}
