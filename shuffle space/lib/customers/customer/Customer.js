class Customer {
    constructor(name, id){
        this.id = id;
        this.name = name;
    }

    toSpec = () => {
        return {
            id : this.id,
            name: this.name
        }
    }

    static fromSpec = ({name, id}) => {
        return new Customer(name, id);
    }
}

export default Customer;