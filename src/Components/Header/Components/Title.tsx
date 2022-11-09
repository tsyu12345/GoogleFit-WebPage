import React from "react";

type Props = {
    //nope
}


const logo:JSX.Element = (
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 236.2 200">
        <path fill="#EA4335" d="M22.6 105.8l11.9 11.9 25.7-25.6-11.8-11.9-5.4-5.4c-4.3-4.3-6.6-9.9-6.6-16 0-5.3 1.8-10.1 4.9-13.9 4.2-5.3 10.6-8.7 17.8-8.7 6.1 0 11.7 2.4 16.1 6.7l5.3 5.1 11.9 12 25.8-25.6-12-11.9-5.4-5.2C90.1 6.6 75.4 0 59.1 0 26.4 0 0 26.4 0 58.9 0 67 1.6 74.7 4.6 81.8c3 7.1 7.3 13.4 12.7 18.7l5.3 5.3"/>
        <polyline fill="#FBBC04" points="81.5,122.2 118.2,85.7 92.4,60 60.2,92.1 60.2,92.1 34.5,117.7 48.3,131.6 60.2,143.4 72.6,131"/>
        <polygon fill="#34A853" points="143.8,175.6 201.8,117.7 176,92.1 118.1,149.9 85.9,117.8 60.2,143.4 92.4,175.6 92.3,175.7 118.1,200 118.1,200 118.1,200 143.9,175.6 143.9,175.6"/>
        <path fill="#4285F4" d="M218.9 100.5c12-12 18.9-30.4 17-49-2.8-28.2-26.2-49.4-54.6-51.3C163.4-1 147 5.7 135.4 17.3L92.4 60l25.7 25.7 43-42.8c5.2-5.1 12.4-7.5 19.8-6.3 9.6 1.5 17.4 9.4 18.7 19 1 7.2-1.4 14.2-6.5 19.3L176 92.1l25.8 25.6 17.1-17.2z"/>
    </svg>
);

export const Title = (props: Props):JSX.Element => {
    return(
        <div id="title-logo-wrapper" className="flex max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
            <div id="title-logo" className="w-[50px] mr-4">
                {logo}
            </div>
            <h1 className="text-3xl font-bold text-gray-500">Google</h1>
            <p className="ml-2 text-3xl text-gray-500">Fit</p>
        </div>
    );
};

export default Title;