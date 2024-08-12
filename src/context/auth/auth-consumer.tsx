//import LoadingScreen from '@/screens/LoadingScreen';

import { AuthContext } from './auth-context';

interface Props {
    children: React.ReactNode;
}

export function AuthConsumer({ children }: Props) {
    /* return (
        <AuthContext.Consumer>
            {auth => {
                console.log('Auth context in consumer:', auth);
                return auth.loading ? <LoadingScreen /> : children;
            }}
        </AuthContext.Consumer>
    ); */

    return (
        <AuthContext.Consumer>
            {auth => {
                console.log('Auth context in consumer:', auth);
                return auth.loading ? children : children;
            }}
        </AuthContext.Consumer>
    )
}
