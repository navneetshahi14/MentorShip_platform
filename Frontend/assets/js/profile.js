const userid = localStorage.getItem('userid')
const emaildetail = document.getElementById('emaildetail')
const skillsdetail = document.getElementById('skillsdetail')
const interestdetail = document.getElementById('interestdetail')
const biodetails = document.getElementById('biodetail')
const roledetail = document.getElementById('roledetail')
const updatebtn = document.getElementById('updatebtn')

const loadingdata = async() =>{

    const token = localStorage.getItem('token')

    const config = {
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
        }
    }
    
    const {data} = await axios.get(`http://localhost:5000/api/profiles/${userid}`,config)
    if(data.error){
        localStorage.setItem('error',data.error)
    }
    console.log(data)
    emaildetail.innerHTML = localStorage.getItem('user_email')
    skillsdetail.innerHTML = data.skills
    interestdetail.innerHTML = data.interests
    biodetails.innerHTML = data.bio
    roledetail.innerHTML = data.role
}

loadingdata()

const closebtn = document.getElementById('closebtn')
const profileModel = document.getElementById('profileModel')
const userId = document.getElementById('userId')
const profilebtn = document.getElementById('profile_btn')

const Role = document.getElementById('role')
const Skills = document.getElementById('skills')
const Interest = document.getElementById('interests')
const bio = document.getElementById('bio')

userId.value = userid
const profile = localStorage.getItem('error')

if(profile === "Profile not found"){
    profileModel.style.display = 'flex'
    profilebtn.innerText = "CreateProfile"
}


closebtn.addEventListener('click',()=>{
    profileModel.style.display = 'none'
})

function splitStringToArray(inputString) {

    const resultArray = inputString.split(',').map(item => item.trim());
    return resultArray;
}

profilebtn.addEventListener('click',async()=>{
    const token = localStorage.getItem('token')
    const config = {
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
        }
    }

    const skillsArray = splitStringToArray(Skills.value)

    const data = {
        userId:userid,
        role:Role.value,
        skills:Skills.value,
        interests:Interest.value,
        bio:bio.value
    }

    if(profilebtn.innerHTML === "CreateProfile"){
        await axios.post(`http://localhost:5000/api/profiles/create/${userid}`,data,config)
    
        profileModel.style.display = 'none'
        profilebtn.innerText = "UpdatingProfile"
        localStorage.removeItem('error')
    }else{
        await axios.post(`http://localhost:5000/api/profiles/update/${userid}`,data,config)

        profileModel.style.display = 'none'
    }
    loadingdata();
})

updatebtn.addEventListener('click',()=>{
    profileModel.style.display = 'flex'
})

const deletebtn = document.getElementById('deletebtn')

deletebtn.addEventListener('click',async()=>{
    const config = {
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${userid}`
        }
    }
    await axios.post(`http://localhost:5000/api/profiles/delete/${userid}`,config)
    loadingdata()
})

