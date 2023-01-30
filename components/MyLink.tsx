import Link from "next/link";
import s from '../styles/components/MyLink.module.scss'

export default function MyLink({text, href}) {
    return (
        <Link className={s.link} href={href}>
            {text}
        </Link>
    )
}
