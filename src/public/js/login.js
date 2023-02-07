const form = document.getElementById('loginForm')

form.addEventListener('submit', evt=>{
    evt.preventDefault();
    let data = new FormData(form)
    let user = {};
    data.forEach((value,key)=>user[key]=value);
    console.log(user);
    fetch('/api/users',{
        method:'POST',
        body:JSON.stringify(user),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(result =>result.json()).then(json=>console.log(json));
})