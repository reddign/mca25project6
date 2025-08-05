function register(event){
    const user = document.getElementById('user').value;
    const pass = document.getElementById('password').value;
   const age = document.getElementById('age').value;

event.preventDefault(); // Prevent the form from submitting immediately
   // password must be 8 or more characters in length and have a number and an upper case letter and a lower case letter.
   // email has to have an @ and a period and must be greater than 5 characters in length.
    if (user && pass && age
        && pass.length >= 8
        && /[A-Z]/.test(pass)
        && /[a-z]/.test(pass)
        && /[0-9]/.test(pass)
        && user.includes("@") && user.includes(".") && user.length > 5
    )    
    {
         document.getElementById('register').submit();
    } else {
       //tell the user exactly what is wrong with their input
        let errorMessage = "Please correct the following errors:\n";
        if (!user.includes("@") || !user.includes(".") || user.length <= 5) {
            errorMessage += "- Email must be valid (contains '@', '.', and is longer than 5 characters).\n";
        }
        if (!pass || pass.length < 8 || !/[A-Z]/.test(pass) || !/[a-z]/.test(pass) || !/[0-9]/.test(pass)) {
            errorMessage += "- Password must be at least 8 characters long and contain an uppercase letter, a lowercase letter, and a number.\n";
        }
        if (!age) {
            errorMessage += "- Age is required.\n";
        }
        alert(errorMessage);
    }

}