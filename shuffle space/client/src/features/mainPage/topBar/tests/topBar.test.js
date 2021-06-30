import { fireEvent, render, screen, waitFor } from '../../../../../testUtils';
import TopBar from '../TopBar';
import DevelopmentApi from '../../../../config/DevelopmentApi';


test('user signs out successfully', async () => {
    const signOut = new DevelopmentApi().signOut;

    const initialState = {
        auth: {
            user: {
                username: 'test@test.ca',
                id: '1'
            }
        }
    };

    const topBar = render(
        <TopBar
            signOut={signOut}
        />,
        {initialState}
    );

    const signOutButton = topBar.getByText('Sign Out');

    await fireEvent.click(signOutButton);

    const alert = await waitFor(() => screen.getByRole('status'));
    expect(alert).toHaveTextContent('signed out');

});