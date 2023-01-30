import MyLink from "./MyLink";
import Head from "next/head";
import s from '../styles/components/MainContainer.module.scss'
import {FC} from "react";

interface IMainContainerProps {
    children: React.ReactNode
    title?: string
    name?: string
    content?: string
    key?:string
}

const MainContainer:FC<IMainContainerProps> = ({children, title,name,content,key}) => {
    return (
        <>
            <Head>
                <meta
                    name={name??"description"}
                    content={content??"Lorem Ipsum is simply dummy text of the printing and typesetting industry."}
                    key={key??"desc"}
                />
                <title>{title ?? 'Главная страница'}</title>
            </Head>
            <div className={s.navbar}>
                <MyLink href={'/'} text="Главная"/>
                <MyLink href={'/messages'} text="Сообщения"/>
                <MyLink href={'/average'} text="Среднее число"/>
            </div>
            <div className={s.mainContainer}>
                {children}
            </div>
        </>
    );
};

export default MainContainer;
