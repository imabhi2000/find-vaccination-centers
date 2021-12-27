var pincode = document.getElementById('pincode');
var date = document.getElementById('date');
var search = document.getElementById('search');
var cards=document.getElementById('cards');
var centers = [];

function getdata(){
    var url = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pincode.value}&date=${date.value}`;
    var xhreq = new XMLHttpRequest();
    xhreq.onload = function(){
        if(xhreq.status===200){
      var data = JSON.parse(xhreq.response).sessions;
      console.log(xhreq.status);
      console.log(data);
      if(data.length!=0){
          data.map((element , index , array)=>{
              var centerinfo = [
                  element.name,
                  element.address,
                  element.vaccine,
                  element.date,
                  element.min_age_limit,
                  element.available_capacity,
                  element.block_name,
                  element.district_name,
                  element.slots,
              ];
              centers.push(centerinfo);
              let code = `
      <div class="card">
      <h1>
      <span class="category">Center Name - </span>
      ${centers[index][0]}
    </h1>
    <div class="innerCard">
    <h3>
    <span class="category">Center Address - </span>
    ${centers[index][1]}
  </h3>
  <h3>
    <span class="category">Vaccine Name - </span>
    ${centers[index][2]}
  </h3>
  <h3>
    <span class="category">Date Of Vaccination - </span>
    ${centers[index][3]}
  </h3>
  <h3>
    <span class="category">Minimum Age Limit - </span>
    ${centers[index][4]}
  </h3>
  <h3>
    <span class="category">Available Capacity - </span>
    ${centers[index][5]}
  </h3>
  <h3>
    <span class="category">Block Name - </span>
    ${centers[index][6]}
  </h3>
  <h3>
    <span class="category">District Name - </span>
    ${centers[index][7]}
  </h3>
  <h3>
    <span class="category">Available Slots - </span>
     ${centers[index][8].join(" | ")}
  </h3>
    </div>
    </div>`;
    cards.innerHTML += code;
                 
          });
      }else if(data.length==0){
          alert("No Vaccination Avalaible");
      }
      
        }else{
         console.log("error establishing conncection");
        }

    }
    
    xhreq.open("get" , url , true);
    xhreq.send();
}
 


search.addEventListener('click' , getdata);