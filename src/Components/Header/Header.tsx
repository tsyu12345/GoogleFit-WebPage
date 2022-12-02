import React, {useState} from "react";

import { Title } from "./Components/Title";
import { UserIcon } from "./Components/UserIcon";

export const Header = ():JSX.Element => {

    return (
        <div className="flex border-b-4 border-solid border-gray-300 rounded">
            <Title />
            <UserIcon />
        </div>
    );
};

export default Header;