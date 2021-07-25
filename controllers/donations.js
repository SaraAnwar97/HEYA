const stripe = require('stripe')('sk_test_51J5xXrLK0ECg6dX4ItUvwFh8xnlsbJpUU4EdBnDz9HLrQJaoPq7niwbfJXmalVK5gBtfukk6NrzZaV6BCsmDQRFg00YkmuKvBa');
const Donation = require('../models/donation');

exports.getDonations = (req,res,next) =>{
    Donation.find()
    .then(donation =>{
        if(!donation){
            const error = new Error('Could not find post');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({message: 'Fetched a donation post successfuly' ,
         donation:donation})
    })
    .catch(err => {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next (err);
    });
 };

 exports.checkout = (req,res,next) => {
    const donationId = req.params.donationId;
    Donation .findById(donationId)
    .then(donation =>{
        return stripe.checkout.sessions.create({
            //configuring session
            //accepts credit card
           payment_method_types: ['card'], 
           line_items :  [
                        {
                          price_data: {
                            currency: 'egp',
                            product_data: {
                              name: donation.title,
                              description: donation.organization
                            },
                            unit_amount: donation.amount * 100,
                          },
                          quantity: 1,
                        },
                      ],
           mode: 'payment',
           // http://localhost:8080/donations/checkout/success
           success_url: req.protocol + '://' + req.get('host') + '/checkout/success',
           // // http://localhost:8080/donations/checkout/cancel
           cancel_url: req.protocol + '://' + req.get('host') + '/checkout/cancel'
           });
    })
    .then(session =>{
        //303 is a redirect status to another url
        res.status(303).json({message:'fetched payment url successfully', session:session.url})
    })
    .catch(err =>{
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
         });
   };
