let ages=[1,2,3,4]
function checkAdult(age){
    return age>=3
}
function findAdult(array){
    return array.forEach(checkAdult)
}
console.log(findAdult(ages))