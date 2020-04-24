var pay = function(){

if(window.PaymentRequest) {

    // google pay ‚ÌÝ’è
    const googlePaymentDataRequest = {
      environment: 'TEST',
      apiVersion: 2,
      apiVersionMinor: 0,
      merchantInfo: {
        // A merchant ID is available after approval by Google.
        // @see {@link https://developers.google.com/pay/api/web/guides/test-and-deploy/integration-checklist}
        // merchantId: '01234567890123456789',
        merchantName: 'Example Merchant'
      },
      allowedPaymentMethods: [{
        type: 'CARD',
        parameters: {
          allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
          allowedCardNetworks: ["AMEX", "DISCOVER", "INTERAC", "JCB", "MASTERCARD", "VISA"]
        },
        tokenizationSpecification: {
          type: 'PAYMENT_GATEWAY',
          // Check with your payment gateway on the parameters to pass.
          // @see {@link https://developers.google.com/pay/api/web/reference/request-objects#gateway}
          parameters: {
            'gateway': 'example',
            'gatewayMerchantId': 'exampleGatewayMerchantId'
          }
        }
      }]
    };
    
    

    //alert("Yes");
    // Yes, we can use the API
    
    const paymentMethods = [
    {supportedMethods: 'https://google.com/pay'},
    {supportedMethods: ['basic-card'],
    		data: {
      			supportedNetworks: [
        		'visa', 'mastercard', 'amex', 'diners', 'jcb'
      			]
    		}
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

