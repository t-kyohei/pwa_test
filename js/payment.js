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
          allowedCardNetworks: ["AMEX","JCB", "MASTERCARD", "VISA"]
        },
        tokenizationSpecification: {
          type: 'PAYMENT_GATEWAY',
          // Check with your payment gateway on the parameters to pass.
          // @see {@link https://developers.google.com/pay/api/web/reference/request-objects#gateway}
          parameters: {
            gateway: 'example',
            gatewayMerchantId: 'exampleGatewayMerchantId'
          }
        }
      }],
      
      
      transactionInfo:{
        countryCode: 'US',
        currencyCode: 'JPY',
        totalPriceStatus: 'FINAL',
        // set to cart total
        totalPrice: '1.00'
      }
      
    };
    
    

    //alert("Yes");
    // Yes, we can use the API
    
    const paymentMethods = [
    {supportedMethods: 'https://google.com/pay',data: googlePaymentDataRequest},
    {supportedMethods: "https://apple.com/apple-pay",
    data: {
        version: 3,
        merchantIdentifier: "merchant.com.example",
        merchantCapabilities: ["supports3DS", "supportsCredit", "supportsDebit"],
        supportedNetworks: ["amex", "discover", "masterCard", "visa"],
        countryCode: "US",
    },
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
	
	
	const shippingOptions = [
  {
    id: "standard",
    label: "Ground Shipping (2 days)",
    amount: { currency: "JPY", value: "1" },
    selected: true,
  },
  {
    id: "drone",
    label: " Drone Express (2 hours)",
    amount: { currency: "JPY", value: "1" }
  },
  ];
  Object.assign(paymentDetails, { shippingOptions });
	
	const options = {
        requestPayerEmail: true,
        requestPayerName: true,
        requestPayerPhone: true,
        requestShipping: true
      };

	const paymentRequest = new PaymentRequest(
    paymentMethods,
    paymentDetails,
    options
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
    // No, fallback to checkout page{
   /* supportedMethods: "https://apple.com/apple-pay",
    data: {
        version: 3,
        merchantIdentifier: "merchant.com.example",
        merchantCapabilities: ["supports3DS", "supportsCredit", "supportsDebit"],
        supportedNetworks: ["amex", "discover", "masterCard", "visa"],
        countryCode: "US",
    }*/
    alert("No");
}




}

var pay2 = function(){

if(window.PaymentRequest) {

   
    //alert("Yes");
    // Yes, we can use the API
    
    const paymentMethods = [
    {
    supportedMethods: "https://apple.com/apple-pay",
    data: {
        version: 3,
        merchantIdentifier: "merchant.com.example",
        merchantCapabilities: ["supports3DS", "supportsCredit", "supportsDebit"],
        supportedNetworks: ["amex", "discover", "masterCard", "visa"],
        countryCode: "US",
    }
    },{supportedMethods: ['basic-card'],
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
	
	

 	
	const options = {
        requestPayerName: true,
      };

	const paymentRequest = new PaymentRequest(
    paymentMethods,
    paymentDetails,
    options
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



