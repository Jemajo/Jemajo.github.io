
function LogIn(){
    loggedin=false;
    password="piefke";
    password=prompt("Wie heißen Deutsche in Tirol?","");
    password=password.toLowerCase();
    if 
    (password=="piefke") { 
    loggedin=true;
    window.location="https://jemajo.github.io/frontpage.html";
    }
    if (loggedin==false) {
    alert("Invalid login!");
    }
    }


