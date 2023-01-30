import MainContainer from "../components/MainContainer";
import s from "../styles/pages/404.module.scss";
import {useEffect, useState} from "react";

export default function Error() {

    const [url,setUrl] = useState('')
    useEffect(() => {
        setUrl(window.location.href)
    },[])

    return (
        <MainContainer>
            <h1 className={s.title}>Error 404</h1>
            <div className={s.description}>Некорректный url адрес: <span>{url}</span></div>
        </MainContainer>
    )
};
