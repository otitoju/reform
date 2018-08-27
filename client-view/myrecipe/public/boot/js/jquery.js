$(document).ready(function(){
    $("#send").click(function () {
          var error0 = false;
              $('#in').show(500);
              $('#in').delay(2000);
              $('#in').animate({
                  height: 'toggle'
              }, 500, function () {
                  // Animation complete.
              });
              error0 = true; // change the error state to true  
              $("#divSCharge").show("slow");
        })
        
        
      })