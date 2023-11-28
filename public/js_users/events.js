export const declareEvent = () => {
    let id_form = document.querySelector("#id_form")
    let sign_id=document.querySelector("#sign_id")
    id_form.addEventListener("submit", (e) => {
        e.preventDefault()
        let dataBody = {
            email: document.querySelector("#id_email").value,
            password: document.querySelector("#id_password").value,
        }
        console.log(dataBody);
        login(dataBody)
    })

    sign_id.addEventListener("click",()=>{
        document.querySelector("#signDiv").style.display="block"
        declareEventSignUp()
    })
}
const login = async (_bodyData) => {
    
    let url = "http://localhost:3001/users/login";
    try {
        let res = await axios({
            url: url,
            method: "POST",
            data: JSON.stringify(_bodyData),
            headers: {
                'content-type': "application/json"
            }
        })
        if (res.data.token) {
           window.location.href="../test.html"

        }
        else {
            alert("There is a problem. Try again")
        }
        localStorage.setItem("mytoken", res.data.token)

    }
    catch (err) {
        console.log(err);
        alert("problem!!")
    }

  


}

export const declareEventSignUp = () => {
    let id_form = document.querySelector("#id_formS")
    id_form.addEventListener("submit", (e) => {
        e.preventDefault()
        let dataBody = {
            name:document.querySelector("#id_nameS").value,
            email: document.querySelector("#id_emailS").value,
            password: document.querySelector("#id_passwordS").value,
        }
        console.log(dataBody);
        addNewUser(dataBody)
    })
}

const addNewUser=async(_bodyData)=>{
    let myurl="http://localhost:3001/users"
    try{
        let res=await axios({
            url:myurl,
            method:"POST",
            data:JSON.stringify(_bodyData),
            headers:{
                'content-type':"application/json",
              
            }
        })
        if(res.data._id){
            alert("go login ")
           
        }
        else{
            alert("There is a problem! you are maybe arnt the creator?. Try again")
        }
    }
    catch(err){
        console.log(err);
        alert("problem!!")
    }

}