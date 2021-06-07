

//focus on name field
//https://www.w3schools.com/jsref/met_html_focus.asp
window.onload = function() {
    document.getElementById("name").focus();
};

let otherOptionJob = document.getElementById("other-job-role"); 
//set default everytime the page loads
otherOptionJob.style.display= 'none';

//hide and show when the 'other role' option is selected under the job role dropdown menu
document.getElementById("title").addEventListener("change", e =>{
    let hitOtherOption = e.target.value;
    if(hitOtherOption === "other"){
        otherOptionJob.style.display= "";
    }else{
        //hide the option job field box if the 'option role' option is unselected
        otherOptionJob.style.display= "none";
    }
});

//hide color selection
const shirtColorOption = document.getElementById("shirt-colors");
shirtColorOption.style.display = "none";

//show the color selection once the design option is selected
document.getElementById("design").addEventListener("change", e => {
    shirtColorOption.style.display = "";
    //let designSelect = document.querySelectorAll("#design option");
    let colorSelect = document.querySelectorAll("#color option");

    for(let i = 0; i <= colorSelect.length; i++){
        colorSelect[i].style.display = "none";

        if(e.target.value === "js puns" && colorSelect[i].dataset.theme == "js puns"){
            colorSelect[i].style.display = "";
        } else if(e.target.value === "heart js" && colorSelect[i].dataset.theme == "heart js") {
            colorSelect[i].style.display = "";
        }
    }
});

//listen for change action in the activities section and add the cost of selected activity
let actList = document.getElementById("activities");
actList.addEventListener("change", e => {
    let totalCost = 0;
    for(i=0; i < actList.querySelectorAll('input[type="checkbox"]').length; i++){

        if(actList.querySelectorAll('input[type="checkbox"]')[i].checked){
            //console.log(actList.querySelectorAll('input[type="checkbox"]')[i].checked);
            totalCost += parseInt(actList.querySelectorAll('input[type="checkbox"]')[i].dataset.cost);
        }
    }
    document.getElementById("activities-cost").innerHTML = `Total: ${totalCost}`;
});

//Payment Section
//Set Credit Card as default in dropbox
const paymentList = document.getElementById("payment");

//
const creditcard = document.getElementById("credit-card");
const paypal = document.getElementById("paypal");
const bitcoin = document.getElementById("bitcoin");

//Listen for change action in the payment section
paymentList.children[1].defaultSelected = true
paymentList.addEventListener("change", e=> {

    //reset the payment dropbox
    creditcard.style.display = "";
    paypal.style.display = "";
    bitcoin.style.display = "";

    if(e.target.value === "credit-card"){
        paypal.style.display = "none";
        bitcoin.style.display = "none";
    } else if(e.target.value === "paypal"){
        creditcard.style.display = "none";
        bitcoin.style.display = "none";
    } else if(e.target.value === "bitcoin"){
        paypal.style.display = "none";
        creditcard.style.display = "none";
    }
});

const form = document.getElementsByTagName("form")[0];
const name = document.getElementById("name");
const email = document.getElementById("email");
const cc = document.getElementById("cc-num");
const zip = document.getElementById("zip");
const cvv = document.getElementById("cvv");

//const failPass = 0;
//Form order validation

function validationPass(element){
    element.parentElement.classList.add("valid");
    element.parentElement.classList.remove("not-valid");
    element.parentElement.lastElementChild.hidden = false;
}

function validationFail(element){
    element.parentElement.classList.add("not-valid");
    element.parentElement.classList.remove("valid");
    element.parentElement.lastElementChild.hidden = true;
}

const nameValidation = () => {
    const nameIsValid = /^[a-zA-Z]+ ?[a-zA-Z]*? ?[a-zA-Z]*?$/.test(name.value);

    if(nameIsValid){
        validationPass(name);
    }
    else{
        validationFail(name);
    }

    return nameIsValid;
};

const emailValidation = () => {
    const emailIsValid = /^[^@]+@[^@.]+\.[a-z]+$/i.test(email.value);

    if(emailIsValid){
        validationPass(email);
    }
    else{
        validationFail(email);
    }

    return emailIsValid;
};

const ccValidation = () => {
    const ccIsValid = /^[0-9]{13,16}$/.test(cc.value);

    if(ccIsValid){
        validationPass(cc);
    }
    else{
        validationFail(cc);
    }

    return ccIsValid;
};

const zipValidation = () => {
    const zipIsValid = /^[0-9]{5}$/.test(zip.value);

    if(zipIsValid){
        validationPass(zip);
    }
    else{
        validationFail(zip);
    }

    return zipIsValid;
};

const cvvValidation = () => {
    const cvvIsValid = /^[0-9]{3}$/.test(cvv.value);

    if(cvvIsValid){
        validationPass(cvv);
    }
    else{
        validationFail(cvv);
    }

    return cvvIsValid;
};

//Listen for submit button
form.addEventListener('submit', e => {
    if(!nameValidation()){
        e.preventDefault();
        console.log("Name cannot be empty or blank");
    }

    if(!emailValidation()){
        e.preventDefault();
        console.log("Invalid Email Address");
    }

    if(!ccValidation()){
        e.preventDefault();
        console.log("Invaild Credit Card");
    }

    if(!zipValidation()){
        e.preventDefault();
        console.log("Zip code needs 5 digit");
    }

    if(!cvvValidation()){
        e.preventDefault();
        console.log("cvv needs 3 digit");
    }
});