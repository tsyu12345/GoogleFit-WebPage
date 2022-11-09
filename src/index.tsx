/**import Tailwindcss */
import "./index.css";

/**import React */
import React from "react";
import { createRoot } from 'react-dom/client';

/**import Components */
import Header from "./Components/Header/Header";

const App = ():JSX.Element => {
    //add components here
    return (
        <Header />
    );
};


const rootDOM = document.getElementById('root') as HTMLElement;
const root = createRoot(rootDOM);
root.render(<App />);
