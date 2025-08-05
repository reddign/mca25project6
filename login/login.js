function login(event){
    event.preventDefault()

    loginform = document.getElementById("login")
    var username = loginform.elements["user"].value
    var password = loginform.elements["password"].value

    if(username=="" || password==""){
        alert("You need to enter both username and password")
    }else{

        loginform.submit();

        //alert(`Go away, ${username}! You are not a valid user.`)
    }
}