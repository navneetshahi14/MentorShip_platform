const login_text = document.getElementById("login_text");
const register_change = document.getElementById("register_change");
const register_link = document.getElementById("Register_click");
const loginBtn = document.getElementById("loginBtn");

register_link.addEventListener("click", (e) => {
  e.preventDefault();
  if (register_link.innerHTML === "Register") {
    register_link.innerHTML = "Login";
    login_text.innerHTML = "Register";
    register_change.innerHTML = "You already have account";
    loginBtn.innerHTML = "Register";
  } else {
    register_link.innerHTML = "Register";
    login_text.innerHTML = "Login";
    register_change.innerHTML = "If you don't have account";
    loginBtn.innerHTML = "Login";
  }
});

loginBtn.addEventListener("click", async (e) => {
  try {
    const email = document.getElementById("email").value;
    const pass = document.getElementById("password").value;

    if (loginBtn.innerHTML === "Login") {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, password: pass }),
      });

      const resdata = await res.json();
      localStorage.setItem("token", resdata.token);
      localStorage.setItem("user_email", resdata.email);
      const token = localStorage.getItem("token");
      localStorage.setItem('userid',resdata.userid);
      console.log(resdata)
      if (token) {
        window.location.assign("http://localhost:5500/Frontend/views/profile.html");
      }
    }
    else{
        const res = await fetch('http://localhost:5000/api/auth/register',{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({email:email,password:pass})
        })
        const resdata = await res.json()
        console.log(resdata)
        localStorage.setItem("token", resdata.token);
        localStorage.setItem("user_email", resdata.email);
        localStorage.setItem('userid',resdata.userid)
        const token = localStorage.getItem("token");
        if (token) {
          window.location.assign("http://localhost:5500/Frontend/views/profile.html");
        }
    }
  } catch (error) {
    console.log("error:->", error);
  }
});

const token = localStorage.getItem("token");
if (token) {
  window.location.assign("http://localhost:5500/Frontend/views/profile.html");
}
