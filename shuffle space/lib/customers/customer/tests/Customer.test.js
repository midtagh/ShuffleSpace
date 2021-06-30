import Customer from "../Customer.js";
import Project from "../../../projects/project/Project";

test('can create a customer', () => {
    const spec = {
        name: 'Nintendo',
        id: '1'
    }

    const customer = Customer.fromSpec(spec);

    expect(customer.name).toBe('Nintendo');
    expect(customer.id).toBe('1');
})

test('can convert customer to spec successfully', () => {
    const spec = {
        name: 'Nintendo',
        id: '1'
    };

    const customerSpec = Customer.fromSpec(spec).toSpec();

    expect(customerSpec).toEqual(spec);
});