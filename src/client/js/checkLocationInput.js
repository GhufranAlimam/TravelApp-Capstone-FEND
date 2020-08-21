// alert("im from location checker")
function checkLocationInput(input){
    console.log("IMHEREEEE")
    input = input.toLowerCase();
    if(input.length === 0 || isNaN(input)){
        alert("ERRRORRR")
    //  document.querySelector('#error').innerHTML = "Kindly Fill in The with Correct location" ;
      return false;
    }
    return true
}

export { checkLocationInput }