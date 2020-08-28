import React, {FC} from 'react';
import { Link } from 'react-router-dom';

import { singOut } from '../../utils/authentication';


const SignOutButton : FC = () => {
    return (
            <Link to = {'/login'}><button onClick={singOut}>Sign Out</button></Link>
    )
}

export default SignOutButton