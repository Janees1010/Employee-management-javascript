

document.getElementById("addemployee-btn").addEventListener("click",form_popup);
document.querySelector(".popup_cancel_btn").addEventListener("click",closeDeletePopup)
document.getElementById("popup_cancel_btn").addEventListener("click",closeDeletePopup)
document.getElementById("cancel-btn").addEventListener("click",form_close);

function success_popup(title,text){
    Swal.fire({
        title: `${title}`,
        text: `${text}`,
        icon: "success"
      });
    
}

// form popup //

function closeDeletePopup(){
    document.getElementById("delete-popup").style.visibility="hidden";
    document.getElementById("delete-popup").style.opacity="0";
}

function form_popup(){
    
    document.getElementById("overlay").style.visibility = "visible";
    document.getElementById("overlay").style.opacity = "1";
    
}

function editform_popup(title){
    document.getElementById("form-title").innerHTML = `${title}`
    document.getElementById("edit-overlay").style.visibility = "visible";
    document.getElementById("edit-overlay").style.opacity = "1";
}

// form close //
let isChecked;
document.getElementById("close-icon").addEventListener("click",form_close);


function form_close(){
    document.getElementById("overlay").style.visibility = "hidden";
    document.getElementById("overlay").style.opacity = "0";

    document.getElementById("form-title").innerHTML = "Add Employee"

    document.getElementById("image-preveiew").src="";
    // document.getElementById("salutation").value = "";
    document.getElementById("firstname").value ="";
   document.getElementById("lastname").value = "";
    document.getElementById("email").value = "";
    document.getElementById("number").value ="";
    document.getElementById("dob").value = "";
    document.getElementById("address").value="";
    document.getElementById("country").value = "Select Country";
    document.getElementById("state").value = "Select State";
   document.getElementById("city").value = "";
   document.getElementById("pin").value="";
    document.getElementById("qualification").value = "";
    document.getElementById("radio1").checked = false;
    document.getElementById("radio2").checked = false;

    document.getElementById("gender-validation").innerHTML="";
    document.getElementById("FirstName-validation").innerHTML="";
    document.getElementById("img-validation").innerHTML="";
    document.getElementById("lname-validation").innerHTML="";
    document.getElementById("email-validation").innerHTML = "";
    document.getElementById("mobile-validation").innerHTML = "";
    document.getElementById("address-validation").innerHTML = "";
    document.getElementById("qualification-validation").innerHTML = "";
    document.getElementById("city-validation").innerHTML = "";
    document.getElementById("pin-validation").innerHTML = "";
    document.getElementById("date-validation").innerHTML="";
    document.getElementById("country-validation").innerHTML="";
    document.getElementById("state-validation").innerHTML="";


    document.getElementById("adding-employee-btn").style.display="block";
    document.getElementById("edit-employee-btn").style.display="none";
    
    
}

// document.getElementById("adding-employee-btn").addEventListener("click",FormValidation);
document.getElementById("adding-employee-btn").addEventListener("click",addEmployee);

// image preveiw//

let image;
var avatar="";
document.getElementById("img").addEventListener("change",(e)=>{
    
    image = e.target.files[0]
    avatar = image
    console.log(avatar);
    
    document.getElementById("image-preveiew").src = URL.createObjectURL(image);

 })

      document.getElementById("firstname").addEventListener("keyup",FormValidation);
      document.getElementById("lastname").addEventListener("keyup",FormValidation);
      document.getElementById("email").addEventListener("input",FormValidation);
    
      document.getElementById("number").addEventListener("keyup",FormValidation);
      document.getElementById("dob").addEventListener("change",FormValidation);
      document.getElementById("address").addEventListener("keyup",FormValidation);
      document.getElementById("country").addEventListener("change",FormValidation);
      document.getElementById("state").addEventListener("change",FormValidation);
      document.getElementById("city").addEventListener("keyup",FormValidation);
      document.getElementById("pin").addEventListener("keyup",FormValidation);
    //   document.getElementById("img"). addEventListener("change",FormValidation);
      document.getElementById("qualification"). addEventListener("keyup",FormValidation);
      document.getElementById("radio1").addEventListener("input",FormValidation);
      document.getElementById("radio2").addEventListener("input",FormValidation);
      
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
       

      fetchemployee();
      
    let data=[];

      async function fetchemployee(){
        try{

            const response = await fetch("http://localhost:3000/employees", {
            });
                
                data = await response.json();
                // render_pagination_btn(data.length);
                // let data_limit = data.slice(0,limit)
                render_employee(data.reverse()) 
                console.log(data);
        }catch(err){
            console.log(err);
        }
              
          
  }

  


    function FormValidation(isEdit=false){
     console.log(data);
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
//    let pin_regex = /^[0-9]/;
   let  name_reg = /^[a-z A-Z]+$/i;
         
      
       employee_data.salutation = Salutation;
      
  if(data.length != 0){
       document.getElementsByName("gender").forEach(radio=>{
       
        if(radio.checked && radio.value == "male"){
            employee_data.gender = radio.value;
            document.getElementById("gender-validation").innerHTML="";
        }else if(radio.checked && radio.value == "Female"){
            console.log(radio.value);
            employee_data.gender = radio.value;
            document.getElementById("gender-validation").innerHTML="";
           
        }

      })

        if(employee_data.gender == ""){
            document.getElementById("gender-validation").innerHTML="select gender";
        }

       
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
    
        if( Pin != ""){
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
            employee_data.dob=Dob
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
                employee_data.qualifications !== ""&&
                employee_data.pin !== ""
            ) {
                return true;
            }else{
                return false;
            }
         
            
           } 
        }
        
    
    


let row;
let limit = 2;

 function render_employee(employee_data){  
    document.getElementById("employee-length").innerHTML=`${data.length}`
         const employees =  employee_data.slice(0,limit)
    
        row = "";
        employees.forEach((employee,i) => {
       
        row += `<tr>
            <td >#0${i+1}</td>
            <td><img id="employee-profile" class="employ-profile" src="http://localhost:3000/employees/${employee.id}/avatar"/>${employee.salutation}.${employee.firstName} ${employee.lastName}</td>
            <td>${employee.email}</td>
            <td>${employee.phone}</td>
            <td>${employee.gender}</td>
            <td>${employee.dob.split('-').reverse().join('-')}</td>
            <td>${employee.country}</td>
          
            <td><div class="dropdown">
    <a class="" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
      <i class="fa-solid fa-ellipsis"></i>
    </a>
    
    <ul class="dropdown-menu">
      <li><a class="dropdown-item" href="view.html?id=${employee.id}" target="_blank"><i class="fa-regular fa-eye "></i>View Details</a></li>
      <li><a class="dropdown-item" href="#"  onclick="(editemployee('${employee.id}','${i}'))"><i class="fa-regular fa-pen-to-square"></i>Edit</a></li>
      <li><a class="dropdown-item" href="#"  onclick="(delete_popup('${employee.id}','${i}'))"><i class="fa-solid fa-trash"></i>Delete</a></li>
    </ul>
    </div></td>
    
        </tr>`;
       
    });
         document.getElementById("tbody").innerHTML=row;
         render_pagination_btn(data.length)
    
           form_close()

 }
   document.getElementById("delete-btn").addEventListener("click",delete_employee)
let emp_id;
let emp_index;

 function delete_popup(empId,index){

   document.getElementById("delete-popup").style.visibility="visible";
   document.getElementById("delete-popup").style.opacity="1";

   emp_id = empId
   emp_index = index



  
 }



  async function delete_employee(){
    

      console.log("yes",emp_id);
      try{
        const response = await fetch(`http://localhost:3000/employees/${emp_id}`,{
            method:"DELETE",
            headers:{
               "Content-Type": "application/json",
           }
   
           })
           console.log(response);
           data.splice(emp_index,1)
           const data_limit =  data.slice(0,limit)
           render_employee(data_limit)
           closeDeletePopup()
           success_popup("Employee Deleted","Employee Deleted Successfully")
       

      }catch(err){
        console.log(err);
      }
            
}
      

 
 
 



 let updated_img;

 async function editemployee(employe_id,index){

  console.log(index);
  console.log(employe_id);

    document.getElementById("adding-employee-btn").style.display="none";
    document.getElementById("edit-employee-btn").style.display="block";

   const response = await fetch(`http://localhost:3000/employees/${employe_id}`,{
   })

    const employee = await response.json()

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

     
     document.getElementById("adding-employee-btn").style.display="none";
     document.getElementById("edit-employee-btn").style.display="block";
 
     document.getElementById("edit-employee-btn").addEventListener("click",send_edited_employee);

     document.getElementById("form-title").innerHTML = "Edit Employee"
     form_popup("Edit Employee")


async function send_edited_employee(){
      let isedit = true;
      const validation = FormValidation(isedit);
     
      let sending_obj={...employee_data}
      console.log(sending_obj);
       try{
           console.log(validation);
          if(validation){
             const response = await fetch(`http://localhost:3000/employees/${employe_id}`,{
                method:"PUT",
                headers:{
                    "Content-Type": "application/json",
                },
                body:JSON.stringify(sending_obj)
             })
             
             console.log(response);
             const updated_data = await response.json()
             updated_data.updatedData.id=employe_id;
             console.log(updated_data);
             sending_obj = null;
              
             if(image){
                const img  = new FormData()
                img.append("avatar",image)
                console.log(img);
                const uimage = await fetch(`http://localhost:3000/employees/${employe_id}/avatar`, {
                    method: "POST",
                    body:img
                })
              
               image = null;  
            //     updated_img = uimage.url;
            //    console.log(updated_img.name);
              

             }
            
                document.getElementById("adding-employee-btn").style.display="block";
                document.getElementById("edit-employee-btn").style.display="none";
               
                document.getElementById("edit-employee-btn").removeEventListener("click",send_edited_employee)
                console.log(index);
                data.splice(index,1,updated_data.updatedData)
    
                
                
                form_close()
                render_employee(data)
                success_popup("Employee Updated","Employee Updated Successfully")
                
            }

          }catch(err){
             console.log(err);
       }
      

     }

    }


   
  async function addEmployee(){
    
    const validation = FormValidation()
    console.log(validation);
  
    try {
        console.log(avatar);
        if (validation) {
        
            const response = await fetch("http://localhost:3000/employees", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(employee_data)
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const resp = await response.json();
            const id = resp.id;
            console.log(id);
            console.log(avatar);
            
            const img  = new FormData()
            img.append("avatar",avatar)
            console.log(img);
        if(avatar){
            const image = await fetch(`http://localhost:3000/employees/${id}/avatar`, {
                method: "POST",
                body:img
            })
        }
            form_close()
            success_popup("Employee Added","Employee Created Succesfully");
            employee_data.id=id;
            data.unshift(employee_data)
             render_employee(data)
               
            
        }else{
            console.log("All fields are required.");
        }
      }catch (err) {
        console.error(err);
       } 

      
}

let clicked;
document.getElementById("sort").value = limit;
let no_pages;

function render_pagination_btn(emploee_length){
    let clicked = true;
    document.getElementById("pagination").innerHTML = "";
    no_pages = Math.ceil(emploee_length/limit)
    document.getElementById("pagination").innerHTML += `<a id="first"  onclick="pagination('0','${clicked}')"><i class="fa-solid fa-angles-left"></i></a>`
    for(let current_page = 0; current_page < no_pages; current_page++){
        document.getElementById("pagination").innerHTML += `<a id="pg-${current_page}"   onclick="pagination('${current_page}')">${current_page + 1}</a>`
    }
    document.getElementById("pagination").innerHTML += `<a id="last"  onclick="pagination('${no_pages-1}')"><i class="fa-solid fa-angles-right"></i></a>`

    document.getElementById("pg-0").style.backgroundColor = "blue";
    document.getElementById("pg-0").style.color = "white";

}

  

let prev_id;
function pagination(current_page,clicked = false){
    
    document.getElementById("pg-0").style.backgroundColor = "white";
    document.getElementById("pg-0").style.color = "grey";
    
    if(prev_id){

        document.getElementById(`pg-${prev_id}`).style.backgroundColor="white";
        document.getElementById(`pg-${prev_id}`).style.color="grey";
    }
   
     prev_id = current_page;
     let id = current_page ;
   
    
      document.getElementById(`pg-${id}`).style.backgroundColor="blue";
      document.getElementById(`pg-${id}`).style.color="white";
    
    let start_index = current_page * limit;
    let end_index = start_index +  parseInt(limit);
    
   
    render_paginated_employee(start_index,end_index)

}


function render_paginated_employee(start,end){
    let row = "";
    document.getElementById("tbody").innerHTML="";
    for(let i = start;i<end;i++){
        //  console.log(data[i]);
    
            if(data[i]){
            row += `<tr>
            <td >#0${i+1}</td>
            <td><img id="employee-profile" class="employ-profile" src="http://localhost:3000/employees/${data[i].id}/avatar"/>${data[i].salutation}.${data[i].firstName} ${data[i].lastName}</td>
            <td>${data[i].email}</td>
            <td>${data[i].phone}</td>
            <td>${data[i].gender}</td>
            <td>${data[i].dob.split('-').reverse().join('-')}</td>
            <td>${data[i].country}</td>
          
            <td><div class="dropdown">
    <a class="" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
      <i class="fa-solid fa-ellipsis"></i>
    </a>
    
    <ul class="dropdown-menu">
      <li><a class="dropdown-item" href="view.html?id=${data[i].id}" target="_blank"><i class="fa-regular fa-eye "></i>View Details</a></li>
      <li><a class="dropdown-item" href="#"  onclick="(editemployee('${data[i].id}','${i}'))"><i class="fa-regular fa-pen-to-square"></i>Edit</a></li>
      <li><a class="dropdown-item" href="#"  onclick="(delete_popup('${data[i].id}','${i}'))"><i class="fa-solid fa-trash"></i>Delete</a></li>
    </ul>
    </div></td>
    
        </tr>`;
        }
    }
    
    document.getElementById("tbody").innerHTML = row;
  
}

document.getElementById("sort").addEventListener("input",sort_employee)

function sort_employee(){
    let sorting_value = document.getElementById("sort").value;
    // console.log(sorting_value);
    // let sorted_data = data.slice(0,sorting_value)
   
    // limit = sorting_value;
    limit=sorting_value;
    console.log(limit);
    render_employee(data)
    // window.location.reload()
}

let search=[];
document.getElementById("search").addEventListener("input",(e)=>{
    search = [];
   value = e.target.value.toLowerCase();
   console.log(value);
    if(value == ""){
        let sending_data = data.slice(0,limit)
        render_employee(sending_data)
        render_pagination_btn(data.length)
    }else{
        
        document.getElementById("tbody").innerHTML="";
        data.forEach((emp,index)=>{
        
          if(emp.firstName.toLowerCase().includes(value)||emp.phone.toLowerCase().includes(value)||emp.email.toLowerCase().includes(value)){
             emp.index = index;
             search.push(emp)

             console.log("hello",index);
             
             let searchArr = search.slice(0,limit)
             render_employee(searchArr)

        }
      })    
         console.log(search);  
      render_search_pagination_btn(search.length)
}
})

function search_display(searchArr){
    let row = "";
    searchArr.forEach((employee,i) => {
   
        row += `<tr>
            <td >#0${i+1}</td>
            <td><img id="employee-profile" class="employ-profile" src="http://localhost:3000/employees/${employee.id}/avatar"/>${employee.salutation}.${employee.firstName} ${employee.lastName}</td>
            <td>${employee.email}</td>
            <td>${employee.phone}</td>
            <td>${employee.gender}</td>
            <td>${employee.dob.split('-').reverse().join('-')}</td>
            <td>${employee.country}</td>
          
            <td><div class="dropdown">
    <a class="" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
      <i class="fa-solid fa-ellipsis"></i>
    </a>
    
    <ul class="dropdown-menu">
      <li><a class="dropdown-item" href="view.html?id=${employee.id}" target="_blank"><i class="fa-regular fa-eye "></i>View Details</a></li>
      <li><a class="dropdown-item" href="#"  onclick="(editemployee('${employee.id}','${employee.index}'))"><i class="fa-regular fa-pen-to-square"></i>Edit</a></li>
      <li><a class="dropdown-item" href="#"  onclick="(delete_popup('${employee.id}','${employee.index}'))"><i class="fa-solid fa-trash"></i>Delete</a></li>
    </ul>
    </div></td>
    
        </tr>`;
       
        document.getElementById("tbody").innerHTML=row;
    });

 }
   
function render_search_pagination_btn(emploee_length){
    // document.getElementById("pagination").innerHTML = "";
    // no_pages = Math.ceil(emploee_length/limit)

    // for(let current_page = 0; current_page < no_pages; current_page++){
    //     document.getElementById("pagination").innerHTML += `<a class=""  onclick="search_pagination('${current_page}')">${current_page + 1}</a>`
    // }
    
    document.getElementById("pagination").innerHTML = "";
    no_pages = Math.ceil(emploee_length/limit)
    document.getElementById("pagination").innerHTML += `<a id="first"  onclick="search_pagination('0','${clicked}')"><i class="fa-solid fa-angles-left"></i></a>`
    for(let current_page = 0; current_page < no_pages; current_page++){
        document.getElementById("pagination").innerHTML += `<a id="spg-${current_page}"   onclick="search_pagination('${current_page}')">${current_page + 1}</a>`
    }
    document.getElementById("pagination").innerHTML += `<a id="last"  onclick="search_pagination('${no_pages-1}')"><i class="fa-solid fa-angles-right"></i></a>`


}
let sprev_id;
function search_pagination(current_page){
    if(sprev_id){

        document.getElementById(`spg-${sprev_id}`).style.backgroundColor="";
        document.getElementById(`spg-${sprev_id}`).style.color="grey";
    }
   
     sprev_id = current_page;
     let id = current_page ;
   
    
      document.getElementById(`spg-${id}`).style.backgroundColor="blue";
      document.getElementById(`spg-${id}`).style.color="white";
    let start_index = current_page * limit;
    let end_index = start_index + limit;

    render_search_paginated_employee(start_index,end_index)

}


function render_search_paginated_employee(start,end){
    let row = "";
    let index = 1;
    document.getElementById("tbody").innerHTML="";
    for(let i = start;i<end;i++){
        //  console.log(data[i]);
        if(search[i]){
            row += `<tr>
            <td >#0${index++}</td>
            <td><img id="employee-profile" class="employ-profile" src="http://localhost:3000/employees/${search[i].id}/avatar"/>${search[i].salutation}.${search[i].firstName} ${search[i].lastName}</td>
            <td>${search[i].email}</td>
            <td>${search[i].phone}</td>
            <td>${search[i].gender}</td>
            <td>${search[i].dob.split('-').riverse().join('-')}</td>
            <td>${search[i].country}</td>
          
            <td><div class="dropdown">
    <a class="" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
      <i class="fa-solid fa-ellipsis"></i>
    </a>
    
    <ul class="dropdown-menu">
      <li><a class="dropdown-item" href="view.html?id=${data[i].id}" target="_blank"><i class="fa-regular fa-eye "></i>View Details</a></li>
      <li><a class="dropdown-item" href="#"  onclick="(editemployee('${data[i].id}','${search[i].index}'))"><i class="fa-regular fa-pen-to-square"></i>Edit</a></li>
      <li><a class="dropdown-item" href="#"  onclick="(delete_popup('${data[i].id}','${search[i].index}'))"><i class="fa-solid fa-trash"></i>Delete</a></li>
    </ul>
    </div></td>
    
        </tr>`;
        }
    }
    document.getElementById("tbody").innerHTML = row;
  
}
    