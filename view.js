

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

document.getElementById("edit-btn").addEventListener("click",editemployee);
document.getElementById("close-icon").addEventListener("click",form_close);
document.getElementById("close-icon-2").addEventListener("click",closeDeletePopup);

document.getElementById("popup_cancel_btn").addEventListener("click",closeDeletePopup)
document.getElementById("cancel-btn").addEventListener("click",form_close)


function closeDeletePopup(){
    document.getElementById("delete-popup").style.visibility="hidden";
    document.getElementById("delete-popup").style.opacity="0";
}

function form_popup(){
    document.getElementById("overlay").style.visibility = "visible";
    document.getElementById("overlay").style.opacity = "1";
    
}

function form_close(){
    document.getElementById("overlay").style.visibility = "hidden";
    document.getElementById("overlay").style.opacity = "0";

//     document.getElementById("image-preveiew").src="";
//     // document.getElementById("salutation").value = "";
//     document.getElementById("firstname").value ="";
//    document.getElementById("lastname").value = "";
//     document.getElementById("email").value = "";
//     document.getElementById("number").value ="";
//     document.getElementById("dob").value = "";
//     document.getElementById("address").value="";
//     document.getElementById("country").value = "Select Country";
//     document.getElementById("state").value = "Select State";
//    document.getElementById("city").value = "";
//    document.getElementById("pin").value="";
//     document.getElementById("qualification").value = "";
//     document.getElementById("radio1").checked = false;
//     document.getElementById("radio2").checked = false;


//     document.getElementById("adding-employee-btn").style.display="block";
//     document.getElementById("edit-employee-btn").style.display="none";
    
}

function success_popup(title,text){
    Swal.fire({
        title: `${title}`,
        text: `${text}`,
        icon: "success"
      });
    
       setTimeout(() => {
           
           window.location.href="index.html";
       }, 1000);     
}

// document.getElementById("delete-btn").addEventListener("click",delete_employee)
document.getElementById("delete-btn").addEventListener("click",delete_popup);
let emp_id;
let emp_index;

 function delete_popup(empId,index){

   document.getElementById("delete-popup").style.visibility="visible";
   document.getElementById("delete-popup").style.opacity="1";

   emp_id = id

 }

 document.getElementById("popup-delete-btn").addEventListener("click",delete_employee);

  async function delete_employee(){
    

      console.log("yes",id);
      try{
        const response = await fetch(`http://localhost:3000/employees/${emp_id}`,{
            method:"DELETE",
            headers:{
               "Content-Type": "application/json",
           }
   
           })
           console.log(response);
        //    data.splice(emp_index,1)
        //    const data_limit =  data.slice(0,limit)
        //    render_employee(data_limit)
           closeDeletePopup()
           success_popup("Employee Deleted","Employee Deleted Successfully")
          

      }catch(err){
        console.log(err);
      }
            
}
let employee_data={
    
    salutation: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    address: "",
    city: "",
    state: "",
    country: "",
    qualifications:""

   } 
  var avatar = "";
   document.getElementById("img").addEventListener("change",(e)=>{
      avatar = e.target.files[0];
      document.getElementById("image-preveiew").src= URL.createObjectURL(avatar);
      console.log(avatar);
   })
 console.log(avatar);
async function editemployee(){

    try{
        const response  = await fetch(`http://localhost:3000/employees/${id}`)
        const employee = await response.json()
         
        form_popup()
         console.log(employee.pin);
       document.getElementById("image-preveiew").src=`http://localhost:3000/employees/${employee.id}/avatar`;
       document.getElementById("salutation").value = employee.salutation;
       document.getElementById("firstname").value = employee.firstName;
       document.getElementById("lastname").value = employee.lastName;
       document.getElementById("email").value = employee.email;
       document.getElementById("number").value = employee.phone;
       document.getElementById("dob").value = employee.dob;
       document.getElementById("address").value = employee.address;
       document.getElementById("country").value = employee.country;
       document.getElementById("state").value = employee.state;
       document.getElementById("city").value = employee.city;
       document.getElementById("pin").value = employee.pin;
       document.getElementById("qualification").value = employee.qualifications;

      if(employee.gender == "male"){
          document.getElementById("radio1").checked =true;
      }else{
          document.getElementById("radio2").checked =true;
      }
      
      document.getElementById("edit-employee-btn").addEventListener("click",send_edited_employee)

      async function send_edited_employee(){

         let validation = FormValidation()
         let img= new FormData();
         img.append("avatar",avatar)

         if(validation){
            const response = await fetch(`http://localhost:3000/employees/${id}`,{
               method:"PUT",
               headers:{
                   "Content-Type": "application/json",
               },
               body:JSON.stringify(employee_data)
            })
            if(avatar){
                const image = await fetch(`http://localhost:3000/employees/${id}/avatar`, {
                    method: "POST",
                    body:img
                })
            }

            const updated_data = await response.json()
            const data = updated_data.updatedData
            console.log(data);

            const dob_year = data.dob.split("-")[0]
            const age  = 2024 - dob_year; 
            username  = data.email.split("@")[0]
            
            document.getElementById("v-img").src=`http://localhost:3000/employees/${id}/avatar`;
            document.getElementById("name").innerHTML=data.salutation+'.'+data.firstName + ' ' + data.lastName;
            document.getElementById("v-email").innerHTML = data.email;
            document.getElementById("v-dob").innerHTML = data.dob;
            document.getElementById("v-address").innerHTML = data.address;
            document.getElementById("gender").innerHTML = data.gender;
            document.getElementById("v-qualification").innerHTML = data.qualifications;
            document.getElementById("v-number").innerHTML = data.phone;
            document.getElementById("age").innerHTML = age;
            document.getElementById("username").innerHTML=username;
            Swal.fire({
                title: "Employee Edited",
                text: "Employee Edited Successfully",
                icon: "success"
              });
            form_close()
      }
    }
       
    }catch(err){
        console.log(err);
    }
   
}
console.log(id);

view_employee()
let username;
let age;

async function view_employee(){
    try{
      const response  = await fetch(`http://localhost:3000/employees/${id}`)
      const data = await response.json()

      
      const dob_year = data.dob.split("-")[0]
      const username  = data.email.split("@")[0]
      console.log(dob_year);
      age  = 2024 - dob_year;
      
      document.getElementById("v-img").src=`http://localhost:3000/employees/${id}/avatar`;
      document.getElementById("name").innerHTML=data.salutation+'.'+data.firstName + ' ' + data.lastName;
      document.getElementById("v-email").innerHTML = data.email;
      document.getElementById("v-dob").innerHTML = data.dob;
      document.getElementById("v-address").innerHTML = data.address;
      document.getElementById("gender").innerHTML = data.gender;
      document.getElementById("v-qualification").innerHTML = data.qualifications;
      document.getElementById("v-number").innerHTML = data.phone;
      document.getElementById("age").innerHTML = age;
      document.getElementById("username").innerHTML=username
    }catch(err){
      console.log(err);
    }
 }

 function FormValidation(isEdit=false){

    let Salutation = document.getElementById("salutation").value;
    let FirstName = document.getElementById("firstname").value;
    let LastName = document.getElementById("lastname").value;
    let Email = document.getElementById("email").value;
    let number = document.getElementById("number").value;
    let Dob = document.getElementById("dob").value;
    let Address = document.getElementById("address").value
    let Country = document.getElementById("country").value;
    let State = document.getElementById("state").value;
    let City = document.getElementById("city").value;
    let Pin = document.getElementById("pin").value
    let Qualification  = document.getElementById("qualification").value

     
   let mobile_reg = /^(?:(?:\+|0{0,2})91(\s*|[\-])?|[0]?)?([6789]\d{2}([ -]?)\d{3}([ -]?)\d{4})$/;
   let email_reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   let address_regex  = /^[#.0-9a-zA-Z\s,-]+$/;
   let pin_regex = /^[0-9]/;
   let  name_reg = /^[a-z A-Z]+$/i;
         
      
       employee_data.salutation = Salutation;

       document.getElementsByName("gender").forEach(radio=>{
       
        if(radio.checked && radio.value == "male"){
            employee_data.gender = radio.value;
            document.getElementById("gender-validation").innerHTML="";
        }else if(radio.checked && radio.value == "Female"){
            employee_data.gender = radio.value;
            document.getElementById("gender-validation").innerHTML="";
           
        }

      })

        if(employee_data.gender == ""){
            document.getElementById("gender-validation").innerHTML="select gender";
        }


        // if(!isEdit){
            // if(image){
            //     avatar = image;
            //     document.getElementById("img-validation").innerHTML="";
            //     console.log(avatar);
            // }else{
            //     document.getElementById("img-validation").innerHTML="choose a image";
            //      avatar = "";
            // }
           
           
        // }
       
        if(name_reg.test(FirstName) && FirstName == FirstName.trim()){
            employee_data.firstName = FirstName
            document.getElementById("FirstName-validation").innerHTML="";
            
        }else{
            document.getElementById("FirstName-validation").innerHTML="invalid firstName";
            employee_data.firstName = "";
        }
    
        if(name_reg.test(LastName) && LastName != " "){
            employee_data.lastName = LastName
            document.getElementById("lname-validation").innerHTML="";
            // console.log(employee_data);
        }else{
            document.getElementById("lname-validation").innerHTML="invalid LastName";
            employee_data.lastName = "";
        }
    
        if(email_reg.test(Email) && Email != null){
            employee_data.email = Email;
            document.getElementById("email-validation").innerHTML = "";
       }else{
          document.getElementById("email-validation").innerHTML = "invalid Email";
          employee_data.email = "";
       }

        if(mobile_reg.test(number) && number != null){
            employee_data.phone = number;
            document.getElementById("mobile-validation").innerHTML = "";
       }else{
          document.getElementById("mobile-validation").innerHTML = "invalid mobile number";
          employee_data.phone = "";
       }
       
       if(address_regex.test(Address) && Address != " "){
        employee_data.address = Address;
        document.getElementById("address-validation").innerHTML = "";
      }else{
           document.getElementById("address-validation").innerHTML = "invalid Address";
           employee_data.address = "";
       }

       if(name_reg.test(Qualification) && Qualification != " "){
        employee_data.qualifications = Qualification;
        document.getElementById("qualification-validation").innerHTML = "";
      }else{
           document.getElementById("qualification-validation").innerHTML = "enter qalification";
           employee_data.qualifications = "";
       }
    
       if(name_reg.test(City) && City != " "){
           employee_data.city = City;
           document.getElementById("city-validation").innerHTML = "";
       }else{
           document.getElementById("city-validation").innerHTML = "invalid City";
           employee_data.city = "";
        }
    
        if(pin_regex.test(Pin) && Pin != null){
            employee_data.pin = Pin;
            document.getElementById("pin-validation").innerHTML = "";
        }else{
            document.getElementById("pin-validation").innerHTML = "invalid Pincode";
            employee_data.pin = "";
         }
         if(Dob == ""){
            document.getElementById("date-validation").innerHTML="invalid Date";
            employee_data.dob="";
         }else{
            employee_data.dob=Dob;
            document.getElementById("date-validation").innerHTML="";
         }
         if(Country == "Select Country"){
            document.getElementById("country-validation").innerHTML="Select a Country";
            employee_data.country = "";
         }
         else{
            employee_data.country = Country;
            document.getElementById("country-validation").innerHTML="";
         }
    
         if(State == "Select State"){

            document.getElementById("state-validation").innerHTML="Select  State"
            employee_data.state = "";
         }
         else{
            employee_data.state = State;
            document.getElementById("state-validation").innerHTML="";
         }

         if (
            employee_data.firstName !== ""  &&
            employee_data.lastName !== "" && 
            employee_data.city !== "" && 
            employee_data.email !== "" && 
            employee_data.address !== "" && 
            employee_data.country !== "Select Country" && 
            employee_data.dob !== "" && 
            employee_data.phone !== "" && 
            employee_data.state !== "Select State" && 
            employee_data.gender !== "" && 
            employee_data.qualifications !== ""
        ) {
            return true;
        }else{
            return false;
        }
    
    }