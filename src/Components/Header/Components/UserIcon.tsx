import React, { useState, useEffect } from "react";

/**
 * @returns iconのURL
 */
const requestIcon = async ():Promise<string> => {
    const response = await fetch("some url");
    const data = await response.json();
    return data; //todo:暫定
};

export const UserIcon = (): JSX.Element => {
    const [iconUrl, getUrl] = useState<string>(undefined);
    useEffect(() => {
        console.log("useEffect!");
        requestIcon().then((url) => {
            getUrl(url);
        }).catch((error) => {
            throw new Error("ユーザーアイコン画像取得でエラーが発生しました", error);
        });
    });

    return (
        <div className="mt-auto mr-4 mb-auto ml-auto border-solid border-gray-500 border-3 rounded-full h-10 w-10 bg-gray-300">
            <img src={iconUrl} className="h-full w-full rounded-full" />
        </div>
    );
};

export default UserIcon;