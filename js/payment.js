var pay = function(){

if(window.PaymentRequest) {
    alert("Yes");
    // Yes, we can use the API
} else {
    // No, fallback to checkout page
    alert("No");
}




}

