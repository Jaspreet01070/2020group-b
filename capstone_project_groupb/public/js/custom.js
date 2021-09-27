/*This function clearout all values from span tags*/
function clearError(){
    document.getElementById("validate1").innerHTML = '';
    document.getElementById("validate2").innerHTML = '';
    document.getElementById("validate3").innerHTML = '';
    document.getElementById("validate4").innerHTML = '';
    document.getElementById("validate5").innerHTML = '';
    document.getElementById("validate6").innerHTML = '';
    document.getElementById("validate7").innerHTML = '';
    document.getElementById("validate8").innerHTML = '';
}



/*After clicking on signup button all the information comes over here
then after it goes into the backend side app.js and there it checks weathwer it contains any error or not
And if it contains eny error then showup in span tags according to their id.*/
function validation(){
        const loading = document.getElementById('loading')

        console.log(window.location.href);
        const firstname = document.getElementById('firstname').value;
        const lastname = document.getElementById('lastname').value;
        const email = document.getElementById('email').value;
        const country = document.getElementById('country').value;
        const contactnumber = document.getElementById('contactnumber').value;
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const confirmpassword = document.getElementById('confirmpassword').value;


        if(firstname && lastname && email && country && contactnumber && username && password && confirmpassword)
        {
            clearError()
            loading.style.display='block'
            fetch('/registrationabcd',{method:'POST',headers: {
            'Content-Type': 'application/json'
            },body:JSON.stringify({
                firstname,
                lastname,
                email,
                country,
                contactnumber,
                username,
                password,
                confirmpassword
            })}).then((res)=>res.json()).then((res)=>{
                console.log("DATA:",res)
                loading.style.display='none'
                if(res.status!=='success'&& Object.keys(res.data.errors).length>0){
                    if(res.data.errors.firstname1)
                    document.getElementById("validate1").innerHTML = res.data.errors.firstname1||'Firstname must be less than 10 letters';
                    if(res.data.errors.lastname1)
                    document.getElementById("validate2").innerHTML = res.data.errors.lastname1||'Only Contain Numbers and letters';
                    if(res.data.errors.email1)
                    document.getElementById("validate3").innerHTML = res.data.errors.email1||'Enter valied email format';
                    if(res.data.errors.contactnumber1)
                    document.getElementById("validate4").innerHTML = res.data.errors.contactnumber1||'Contact number should be in numbers';
                    if(res.data.errors.contactnumber2)
                    document.getElementById("validate4").innerHTML = res.data.errors.contactnumber2||'Contact number should have exact length of 10 digits';
                    if(res.data.errors.username1)
                    document.getElementById("validate5").innerHTML = res.data.errors.username1||'Username should contains atleast one upeercase, one lowercase, one number and one special character from @/#/*/_';
                    if(res.data.errors.password1)
                    document.getElementById("validate6").innerHTML = res.data.errors.password1||'Password should contains atleast one upeercase, one lowercase, one number and one special character from @/#/*/_/!';
                    if(res.data.errors.password2)
                    document.getElementById("validate6").innerHTML = res.data.errors.password2||'Password has to match';
                    if(res.data.errors.password2)
                    document.getElementById("validate7").innerHTML = res.data.errors.password2||'Password has to match ';
                    if(res.data.errors.email)
                    document.getElementById("validate3").innerHTML = res.data.errors.email||'email invalid';
                    if(res.data.errors.username)
                    document.getElementById("validate5").innerHTML = res.data.errors.username||'username invalid';
                    
                }else{
                    document.getElementById("regiform").reset();
                    alert("Data stored successfully");
                    window.location.href = '/';

                }
            }).catch((error)=>{
                loading.style.display='none'
                alert(error)
            })
        }else{
            alert("Please enter all data")
        }
    return false
}

function clearForgetPasswordError(){
    document.getElementById("validate9").innerHTML = '';
}

function forgetpassword()
{
        console.log(window.location.href);
        const forgetPassword = document.getElementById('forgetemail').value;


        if(forgetPassword)
        {
            clearForgetPasswordError()

            loading.style.display='block'
            fetch('/registrationabcd',{method:'POST',headers: {
            'Content-Type': 'application/json'
            },body:JSON.stringify({
                firstname,
                lastname,
                email,
                country,
                contactnumber,
                username,
                password,
                confirmpassword
            })}).then((res)=>res.json()).then((res)=>{
                console.log("DATA:",res)
                loading.style.display='none'
                if(res.status!=='success'&& Object.keys(res.data.errors).length>0)
                {
                    if(res.data.errors.username)
                    document.getElementById("validate5").innerHTML = res.data.errors.username||'username invalid';   
                }
                else
                {
                    document.getElementById("regiform").reset();
                    alert("Data updated successfully");
                    window.location.href = '/';
                }
            }).catch((error)=>{
                loading.style.display='none'
                alert(error)
            })
        }else{
            alert("Please enter email address")
        }
    return false
}
