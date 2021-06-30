import bcrypt from "bcryptjs";

class Worker {
    constructor(user, password, name, id) {
        this.user = user;
        this.password = password;
        this.name = name;
        this.id = id;
    }

    login = ({user, password}) => {
        if(!user) throw new Error("username is required.")
        if(!password) throw new Error("password is required.")


        if(user === this.user){
            const hash = this.password;
            if (!bcrypt.compareSync(password, hash)){
                throw new Error("Username or Password does not match.")
            }
            return {
                user: this.user,
                id: this.id,
                name: this.name
            };
        }else{
            throw new Error("Username or Password does not match.")
        }
    }

    toSpec = () => {
        return {
            user: this.user,
            password: this.password,
            name: this.name,
            id: this.id
        }
    }

    static fromSpec = ({user, password, name, id}) => {
        return new Worker(user, password, name, id);
    }
}

export default Worker;