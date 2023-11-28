import CountryClass from "./countryClass.js";
import { declareEvent } from "./formEvent.js";

const init = () => {
 
  doApi();
  declareEvent(doApi);
}

const checkLocal=()=>{
  let token=localStorage.getItem("mytoken")
}
const doApi = async() => {
  let url = "http://localhost:3001/countries?perPage=8&reverse=yes";
  try{
    let resp = await axios.get(url);
    console.log(resp);
    console.log(resp.data);
    createTable(resp.data)
  }
  catch(err){
    console.log(err);
    alert("There problem, come back later")
  }
}


const createTable = (_ar) =>{
  document.querySelector("#tbody").innerHTML = "";
  _ar.forEach((item,i) => {
    let tr = new CountryClass("#tbody",item,i,doApi);
    tr.render();
  })
}

init();