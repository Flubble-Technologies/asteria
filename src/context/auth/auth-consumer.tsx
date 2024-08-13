import Splash from '../../screens/SplashScree';
import { AuthContext } from './auth-context';

interface Props {
    children: React.ReactNode;
}

export function AuthConsumer({ children }: Props) {
    return (
        <AuthContext.Consumer>
            {auth => {
                return auth.loading ? <Splash /> : children;
            }}
        </AuthContext.Consumer>
    );
}
