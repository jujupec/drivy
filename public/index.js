'use strict';

//list of cars
//useful for ALL exercises
var cars = [{
  'id': 'p306',
  'vehicule': 'peugeot 306',
  'pricePerDay': 20,
  'pricePerKm': 0.10
}, {
  'id': 'rr-sport',
  'pricePerDay': 60,
  'pricePerKm': 0.30
}, {
  'id': 'p-boxster',
  'pricePerDay': 100,
  'pricePerKm': 0.45
}];

//list of rentals
//useful for ALL exercises
//The `price` is updated from exercice 1
//The `commission` is updated from exercice 3
//The `options` is useful from exercice 4
var rentals = [{
  'id': '1-pb-92',
  'driver': {
    'firstName': 'Paul',
    'lastName': 'Bismuth'
  },
  'carId': 'p306',
  'pickupDate': '2016-01-02',
  'returnDate': '2016-01-02',
  'distance': 100,
  'options': {
    'deductibleReduction': false
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'assistance': 0,
    'drivy': 0
  }
}, {
  'id': '2-rs-92',
  'driver': {
    'firstName': 'Rebecca',
    'lastName': 'Solanas'
  },
  'carId': 'rr-sport',
  'pickupDate': '2016-01-05',
  'returnDate': '2016-01-09',
  'distance': 300,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'assistance': 0,
    'drivy': 0
  }
}, {
  'id': '3-sa-92',
  'driver': {
    'firstName': ' Sami',
    'lastName': 'Ameziane'
  },
  'carId': 'p-boxster',
  'pickupDate': '2015-12-01',
  'returnDate': '2015-12-15',
  'distance': 1000,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'assistance': 0,
    'drivy': 0
  }
}];

//list of actors for payment
//useful from exercise 5
var actors = [{
  'rentalId': '1-pb-92',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'assistance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'drivy',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': '2-rs-92',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'assistance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'drivy',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': '3-sa-92',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'assistance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'drivy',
    'type': 'credit',
    'amount': 0
  }]
}];

//list of rental modifcation
//useful for exercise 6
var rentalModifications = [{
  'rentalId': '1-pb-92',
  'returnDate': '2016-01-04',
  'distance': 150
}, {
  'rentalId': '3-sa-92',
  'pickupDate': '2015-12-05'
}];

//exercice 1 and 2
function generateprice() {
    var i;
    var j;
    var pr;
    for (i=0; i<rentals.length; i++){
        pr=new Date(rentals[i].returnDate) - new Date(rentals[i].pickupDate);
        if (pr==0){
            pr=1;
        }
        else{
            pr=pr/24/3600/1000+1;

        }

        if (pr==1){
            for (j=0; j<cars.length;j++){
                        if (cars[j].id==rentals[i].carId){
                            rentals[i].price=pr*cars[j].pricePerDay+rentals[i].distance*cars[j].pricePerKm;
                        }
             }
        }
         else if(pr>1 && pr<=4){
            for (j=0; j<cars.length;j++){
                        if (cars[j].id==rentals[i].carId){
                            rentals[i].price=pr*cars[j].pricePerDay*0.9+rentals[i].distance*cars[j].pricePerKm;
                        }
            }
         }

         else if(pr>4 && pr<=10){
            for (j=0; j<cars.length;j++){
                        if (cars[j].id==rentals[i].carId){
                             rentals[i].price=pr*cars[j].pricePerDay*0.7+rentals[i].distance*cars[j].pricePerKm;
                        }
            }
         }

         else if(pr>10){
            for (j=0; j<cars.length;j++){
                        if (cars[j].id==rentals[i].carId){
                              rentals[i].price=pr*cars[j].pricePerDay*0.5+rentals[i].distance*cars[j].pricePerKm;
                        }

            }
         }

    }


}

//exercice 3
function generatecommission(){
    var i;

    for (i=0; i<rentals.length; i++){
            rentals[i].commission.insurance=0.3*rentals[i].price*0.5;
            rentals[i].commission.assistance=((new Date(rentals[i].returnDate) - new Date(rentals[i].pickupDate))/24/3600/1000)+1;
            rentals[i].commission.drivy=0.3*rentals[i].price-rentals[i].commission.insurance-rentals[i].commission.assistance
    }

}

//exercice 4

function deductible(){
    var i;

    for (i=0; i<rentals.length; i++){
        if(rentals[i].options.deductibleReduction){
            rentals[i].price+=4*(((new Date(rentals[i].returnDate) - new Date(rentals[i].pickupDate))/24/3600/1000)+1);
            rentals[i].commission.drivy+=4*(((new Date(rentals[i].returnDate) - new Date(rentals[i].pickupDate))/24/3600/1000)+1);
        }

    }
}

//exercice5

function payactor(){
    var i;
    var j;
    var k;
    for (i=0; i<actors.length; i++){
        for(j=0;j<rentals.length;j++){
            if (rentals[j].id==actors[i].rentalId){
                for (k=0;k<actors[i].payment.length;k++){
                    switch(actors[i].payment[k].who){
                        case "driver":
                            actors[i].payment[k].amount=rentals[j].price;
                            break;

                        case "owner":
                            actors[i].payment[k].amount=rentals[j].price-rentals[j].commission.insurance-rentals[j].commission.assistance-rentals[j].commission.drivy;
                            break;

                        case "insurance":
                            actors[i].payment[k].amount=rentals[j].commission.insurance;
                            break;

                        case "assistance":
                            actors[i].payment[k].amount=rentals[j].commission.assistance;
                            break;

                        case "drivy":
                            actors[i].payment[k].amount=rentals[j].commission.drivy;
                            break;

                         default :
                         break;

                    }
                }
            }
        }
    }
}


generateprice();
generatecommission();
deductible();
payactor();

console.log(cars);
console.log(rentals);
console.log(actors);
console.log(rentalModifications);

