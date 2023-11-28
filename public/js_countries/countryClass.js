export default class countryClass{
    constructor(_parent,_item,index,_doApi){
      this.parent = _parent;
      this.id=_item._id
      this.name = _item.name;
      this.pop = _item.pop;
      this.capital = _item.capital;
      this.image = _item.img;
      this.index=index
      this.doApi = _doApi;
    }
render(){
      let myTr = document.createElement("tr");
      document.querySelector(this.parent).append(myTr);
  
      myTr.innerHTML += `
      <td>${this.index+1}</td>
      <td>${this.name}</td>
      <td>${this.pop}</td>
      <td>${this.capital} nis</td>
      <td>${this.image}</td>
      <td><button class=" btn btn-danger del-btn">Delete</button></td>
      `
      let delBtn = myTr.querySelector(".del-btn");
      delBtn.addEventListener("click" , () => {
        // alert(this.id);
        confirm("Are you sure you want to delete?") && this.delCountry()
      })
    }
  
async delCountry(){
    let token=localStorage.getItem("mytoken")
  let myurl="http://localhost:3001/countries/"+this.id
    try{
        let res=await axios({
            url:myurl,
            method:"DELETE",
            headers:{
                'content-type':"application/json",
                'x-api-key':token
            }
        })
        if(res.data.deletedCount==1){
            alert("country delete")
            this.doApi()
        }
        else{
            alert("There is a problem.you are maybe arnt the creator? Try again")
        }
    }
    catch(err){
        console.log(err);
        alert("problem!!")
    }

}
}