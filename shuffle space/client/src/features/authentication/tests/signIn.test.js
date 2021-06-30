import { fireEvent, render, screen, waitFor } from '../../../../testUtils';
import SignIn from '../SignIn';
import DevelopmentApi from '../../../config/DevelopmentApi';


test('user signs in properly' , async () => {
    const signIn = new DevelopmentApi().signIn;

    const {
        getByLabelText,
        getByRole
    } = render(
        <SignIn
            signIn={signIn}
        />
    );

    await fireEvent.change(getByLabelText(/^User/), {target: {value: 'test@test.ca'}});
    await fireEvent.change(getByLabelText(/^Password/), {target: {value: '123'}});
    await fireEvent.click(getByRole('button'));

    const alert = await waitFor(() => screen.getByRole('status'));
    expect(alert).toHaveTextContent('test@test.ca signed in.');

});

test('sign in fails due to wrong password' , async () => {
    const signIn = () => {
        return Promise.reject('wrong password');
    };

    const {
        getByLabelText,
        getByRole
    } = render(
        <SignIn
            signIn={signIn}
        />
    );

    await fireEvent.change(getByLabelText(/^User/), {target: {value: 'test@test.ca'}});
    await fireEvent.change(getByLabelText(/^Password/), {target: {value: '321'}});
    await fireEvent.click(getByRole('button'));

    const errorText = await waitFor(() => screen.getByRole('signInError'));
    expect(errorText).toHaveTextContent('wrong password');

});