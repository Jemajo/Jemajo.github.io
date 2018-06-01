
function LogIn(){
    loggedin=false;
    password="piefke";
    password=prompt("Wie heißen Deutsche in Tirol?","");
    password=password.toLowerCase();
    if 
    (password=="piefke") { 
    loggedin=true;
    window.location="https://jemajo.github.io/frontpage";
    }
    if (loggedin==false) {
    alert("Sorry, du bist noch nicht bereit für deinen Aufenthalt in Innsbruck.");
    }
    }


