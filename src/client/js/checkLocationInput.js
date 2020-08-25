
// function checkLocationInput(location, startDate, endDate){
//     if(!location.length > 0 && startDate.value != null && endDate.value != null){
//         alert('WHAAAAAAAAAAAAAAT')
//         document.querySelector("#error").textContent = "Kindly fill in the correct location"
        
//     }
//    }
function checkLocationInput(location, startDate, endDate){
if(!location){
    alert('WHAAAAAAAAAAAAAAT')
    document.querySelector("#error").textContent = "Kindly fill in the correct location"
    return false
}else if(!startDate){
    document.querySelector("#error").textContent = "Kindly Choose Departing Date"
    return false
}else if(!endDate){
    document.querySelector("#error").textContent = "Kindly Choose Arriving back Date"
    return false
} 
}
export { checkLocationInput }