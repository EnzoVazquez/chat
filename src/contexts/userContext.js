import fs from 'fs'
import __dirname from '../utils.js'

class userContext{

    constructor(){
        this.path = __dirname + '/files/users.json'
    }


    //traer a los usuarios
    getUsers = async()=>{
        try {
            if(fs.existsSync(this.path)){
                let data = await fs.promises.readFile(this.path,'utf-8');
                let users = JSON.parse(data)
                return users
            }else{
                return [];
            }
        } catch (error) {
            console.log(error)
        }
    }

    //guardar los usuarios
    save = async(user) =>{
        try{
            let users = this.getUsers();
            users.push(user)
            await fs.promises.writeFile(this.path,JSON.stringify(users,null,"\t"))
        }catch(error){
            console.log(error)
        }    
    }
}

export default userContext