const login_text = document.getElementById('login_text')
const register_change = document.getElementById('register_change')
const register_link = document.getElementById('Register_click')
const loginBtn = document.getElementById('loginBtn')

register_link.addEventListener('click',(e)=>{
    e.preventDefault()
    if(register_link.innerHTML === "Register"){
        register_link.innerHTML = "Login"
        login_text.innerHTML = "Register"
        register_change.innerHTML = "You already have account"
        loginBtn.innerHTML = "Register"
    }else{
        register_link.innerHTML = "Register"
        login_text.innerHTML = "Login"
        register_change.innerHTML = "If you don't have account"
        loginBtn.innerHTML = "Login"
    }
})

loginBtn.addEventListener('click',(e)=>{
    try {
        if(loginBtn.innerHTML === "Login"){
            axios.post('')
        }
    } catch (error) {
        console.log('error:->',error)
    }
})