const form = document.querySelector("form"); // Form
const numberCard = document.getElementById("placeholder-card"); // Number HTML
const nameCard = document.getElementById("name"); // Name HTML
const dateCardMM = document.getElementById("dateMM"); // Date HTML
const dateCardYY = document.getElementById("dateYY"); // Date HTML
const cvcCard = document.getElementById("cvc"); // CVC HTML
const inputName = document.getElementById("cardholder-name"); // Input Name
const inputNumberCard = document.getElementById("cardholder-number"); // Input Number
const inputExpDate = document.getElementById("cardholder-expdate"); // Input Expdate
const inputMMYY = document.getElementById("cardholder-mmyy"); // Input MMYY
const inputCVC = document.getElementById("cardholder-cvc"); // Input CVC
const nameField = document.getElementById("nameField");
const numberCardField = document.getElementById("numberCardField")
const cvcField = document.getElementById("cvc-field")
const expdateField = document.getElementById("expdate-field")
const yyfield = document.getElementById("yy-field")
const checkName = document.querySelector("#nameField .bi-check2-circle")
const errorName = document.querySelector("#nameField .bi-x-circle")
const checkNumberCard = document.querySelector("#numberCardField .bi-check2-circle")
const errorNumberCard = document.querySelector("#numberCardField .bi-x-circle")
const checkcvc = document.querySelector("#cvc-field .bi-check2-circle")
const errorcvc = document.querySelector("#cvc-field .bi-x-circle")
const formComplete = document.getElementById("form-complete")

numberCard.innerText = "0000 0000 0000 0000";
nameCard.innerText = "Jane Appleseed";
dateCardMM.innerText = "00";
dateCardYY.innerText = "00";
cvcCard.innerText = "000";

inputName.addEventListener("input", () => {
    const valueName = inputName.value
    const regexName = /^[a-zA-ZÀ-ÿ\s]+$/
    const isValidName = regexName.test(valueName)
    if (isValidName === true && valueName.length >= 3){
        errorName.classList.add("d-none")
        checkName.classList.remove("d-none")
        inputName.classList.add("form-control-check")
        inputName.classList.remove("form-control-error")
        nameField.classList.remove("form-message-error-name")
        nameField.classList.remove("form-message-error-null")
    }
    else{
        checkName.classList.add("d-none")
        errorName.classList.remove("d-none")
        inputName.classList.remove("form-control-check")
        inputName.classList.add("form-control-error")
        nameField.classList.add("form-message-error-name")
        nameField.classList.remove("form-message-error-null")
        if(valueName === ""){
            nameField.classList.add("form-message-error-null")
            inputName.classList.remove("form-control-check")
        }
    }
    nameCard.innerHTML = ""
    nameCard.innerText += `${valueName}`
})

inputNumberCard.addEventListener("input", () => {
    const valueNumberCard = inputNumberCard.value.replace(/\D/g, '')
    const regexNumberCard = /(\d{4})(?=\d)/g
    const formatNumberCard = valueNumberCard.replace(regexNumberCard, "$1 ").slice(0,19)
    inputNumberCard.value = formatNumberCard 
    if(valueNumberCard.length > 16){
        inputNumberCard.classList.remove("form-control-check")
        inputNumberCard.classList.add("form-control-error")
        numberCardField.classList.add("form-message-error-limit")
        checkNumberCard.classList.add("d-none")
        errorNumberCard.classList.remove("d-none")
    }
    else if(valueNumberCard.length < 16){ 
        inputNumberCard.classList.remove("form-control-check")
        numberCardField.classList.add("form-message-error-number")
        inputNumberCard.classList.add("form-control-error")
        numberCardField.classList.add("form-message-error-null")
        checkNumberCard.classList.add("d-none")
        errorNumberCard.classList.remove("d-none")
    }
    else{
        inputNumberCard.classList.add("form-control-check")
        inputNumberCard.classList.remove("form-control-error")
        numberCardField.classList.remove("form-message-error-null")
        checkNumberCard.classList.remove("d-none")
        errorNumberCard.classList.add("d-none")
        numberCardField.classList.remove("form-message-error-number")
    }
    numberCard.innerHTML = ""
    numberCard.innerHTML += `${formatNumberCard}`
})


let valueExpDate;
inputExpDate.addEventListener("input", () => {
    valueExpDate = inputExpDate.value
    if(valueExpDate !== undefined && valueExpDate !== "MM"){
        inputExpDate.classList.add("form-control-check")
        expdateField.classList.remove("form-message-error-select")
    }
    else{
        inputExpDate.classList.remove("form-control-check")
    }
    dateCardMM.innerHTML = ""
    if(valueExpDate < 10){
        dateCardMM.innerHTML += "0" + valueExpDate
    }
    else{
        dateCardMM.innerHTML += valueExpDate
    }
})

let valueYY;
inputMMYY.addEventListener("input", () => {
    valueYY = inputMMYY.value
    if(valueYY !== undefined && valueYY !== "YY"){
        inputMMYY.classList.add("form-control-check")
        yyfield.classList.remove("form-message-error-select")
    }
    else{
        inputMMYY.classList.remove("form-control-check")
    }
    dateCardYY.innerHTML = ""
    if(valueYY < 10){
        dateCardYY.innerHTML += "0" + valueYY
    }
    else{
        dateCardYY.innerHTML += valueYY
    }
})

inputCVC.addEventListener("input", () =>{
    const valueCVC = inputCVC.value
    const regexCVC = /^[0-9]+$/g
    const isValidCVC = regexCVC.test(valueCVC)
    if(isValidCVC === true && valueCVC.length === 3){
        inputCVC.classList.add("form-control-check")
        inputCVC.classList.remove("form-control-error")
        checkcvc.classList.remove("d-none")
        errorcvc.classList.add("d-none")
        cvcField.classList.remove("form-message-error-cvc")
    }
    else{
        inputCVC.classList.remove("form-control-check")
        inputCVC.classList.add("form-control-error")
        checkcvc.classList.add("d-none")
        errorcvc.classList.remove("d-none")
        cvcField.classList.add("form-message-error-cvc")   
    }
    cvcCard.innerHTML = ""
    cvcCard.innerHTML += valueCVC
})

form.addEventListener("submit", (event) => {
    event.preventDefault()
    let hasError = false
    if(valueExpDate === undefined || valueExpDate === "MM"){
        hasError = true
        expdateField.classList.add("form-message-error-select")
        inputExpDate.classList.add("form-control-error")
    }
    else if(valueYY === undefined || valueYY === "YY"){
        hasError = true
        yyfield.classList.add("form-message-error-select")
        inputMMYY.classList.add("form-control-error")
    }
    else{
        let inputs = document.querySelectorAll("input")
        let inputArray = Array.from(inputs)
        inputArray.forEach(input => {
            if(input.classList.contains("form-control-error")){
                hasError = true
            }
        })
        if(hasError === true){
            alert("Please fill in all fields correctly")
        }
        else{
            form.classList.add("d-none")
            formComplete.classList.remove("d-none")
        }
    }
})

