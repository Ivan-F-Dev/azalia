import {FC, FormEvent, useState} from 'react'
import MainContainer from "../components/MainContainer";
import s from '/styles/pages/Messages.module.scss'
import path from "path";
import promisify from "../helpers/promisify";

interface IMessagesProps {
    messages: Array<{text:string,author:string}>
}

const Messages:FC<IMessagesProps> = ({messages}) => {

    const [author, setAuthor] = useState<string>()
    const [text, setText] = useState<string>()

    const onClick = async (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await fetch(`${process.env.API_HOST}/messages`,{method: "POST",body:JSON.stringify({text: text,author: author})})
        location.reload()
    }

    return (
        <MainContainer title='Сообщения'>
            <h1 className={s.title}>Сообщения</h1>
            <form onSubmit={onClick} className={s.panel}>
                <input type="text" placeholder='Автор' className={s.input} value={author} onChange={(e) => setAuthor(e.target.value)} />
                <input type="text" placeholder='Текст' className={s.input} value={text} onChange={(e) => setText(e.target.value)} />
                <button className={s.button}>Добавить</button>
            </form>

            <ul className={s.list}>
                {messages.map(message =>
                    <li className={s.card} key={String(Math.random())}>
                        <h3>{message.author}</h3>
                        <div>{message.text}</div>
                    </li>
                )}
            </ul>
        </MainContainer>
    );
};

export default Messages;

export async function getServerSideProps() {
    try {
        const buffer = await promisify.readFileAsync(path.join(process.cwd(),"/json/messages.json"))
        const messages = JSON.parse(buffer)
        return {
            props: {messages: messages}
        }
    } catch (err) {
        return {
            props: {messages: [{text: 'error',author: 'error'}]}
        }
    }
}
