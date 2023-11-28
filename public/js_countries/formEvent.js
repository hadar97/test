export const declareEvent=(_doApi)=>{
    let id_form=document.querySelector("#id_form")
    id_form.addEventListener("submit",(e)=>{
        e.preventDefault()
        let dataBody={
            name:document.querySelector("#id_name").value,
             pop:document.querySelector("#id_pop").value,
             capital:document.querySelector("#id_capital").value,
             img:document.querySelector("#id_img").value
        }
console.log(dataBody);
addNewCountry(dataBody,_doApi)
    })
}
const addNewCountry=async(_bodyData,_doApi)=>{
    let token=localStorage.getItem("mytoken")
    let myurl="http://localhost:3001/countries"
    try{
        let res=await axios({
            url:myurl,
            method:"POST",
            data:JSON.stringify(_bodyData),
            headers:{
                'content-type':"application/json",
                'x-api-key':token
            }
        })
        if(res.data._id){
            alert("country added")
            _doApi()
        }
        else{
            alert("There is a problem! . Try again")
        }
    }
    catch(err){
        console.log(err);
        alert("problem!!")
    }

}