var pay = function(){

if(window.PaymentRequest) {
    //alert("Yes");
    // Yes, we can use the API
    
    const paymentMethods = [
    {
        supportedMethods: ['basic-card']
    }
	];

	const paymentDetails = {
    total: {
        label: 'Total Amount',
        amount: {
            currency: 'JPY',
            value: 1
        }
    }
	};

	const paymentRequest = new PaymentRequest(
    paymentMethods,
    paymentDetails
	);
    
    
    paymentRequest
    .show()
    .then(paymentResponse => {
        // close the payment UI
        paymentResponse.complete()
            .then(() => {
                // TODO: call REST API to process the payment at backend server
                // with the data from `paymentResponse`.
            });
    })
    .catch(err => {
        // user closed the UI or the API threw an error
        console.log('Error:', err);
    });
    
    
    
    
    
} else {
    // No, fallback to checkout page
    alert("No");
}




}

