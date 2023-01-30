import MainContainer from "../components/MainContainer";
import s from '/styles/pages/Average.module.scss'
import {ChangeEvent, useEffect, useState} from "react";
import {fractionalCheck, signCheck} from "../helpers/numberCheckers";

const Average = () => {

    const [data,setData] = useState<any>(false)
    const [negative,setNegative] = useState<boolean>(false)
    const [fractional,setFractional] = useState<boolean>(false)
    const [number,setNumber] = useState<string>('0')

    useEffect(() => {
        let num = signCheck(number,negative)
        num = fractionalCheck(num,fractional)
        setNumber(num)
    },[negative,fractional])

    useEffect( () => {
        const request = async () => {
            const response = await fetch(`${process.env.API_HOST}/average`)
            const body = await response.json()
            setData(body.reverse())
        }
        request()
    },[])

    const onClick = async () => {
        console.log("API_HOST",process.env.API_HOST,process.env)
        await fetch(`${process.env.API_HOST}/average`,{method: "POST",body:JSON.stringify({number:number})})
        const response = await fetch(`${process.env.API_HOST}/average`)
        const body = await response.json()
        setData(body.reverse())
    }

    const onChangeNumber = (e:ChangeEvent<HTMLInputElement>) => {
        let num = fractionalCheck(e.target.value,fractional)
        num = signCheck(num,negative)
        setNumber(num)
    }

    return (
        <MainContainer title='Среднее число'>
            <h1 className={s.title}>Среднее число</h1>
            <div className={s.panel}>
                <input  id='input' placeholder='Автор' className={s.input} value={number} onChange={onChangeNumber} type="number" step={fractional?'0.1':'1'}/>
                <div className={s.wrapper}>
                    <div className={s.wrapperItem}>
                        <input id='negative' checked={negative} onClick={() => setNegative(prevState => !prevState)} type="checkbox"/>
                        <label htmlFor="negative">Отрицательное</label>
                    </div>
                    <div className={s.wrapperItem}>
                        <input id='fractional' checked={fractional} onClick={() => setFractional(prevState => !prevState)} type="checkbox"/>
                        <label htmlFor="fractional">Дробное</label>
                    </div>
                </div>

                <button onClick={onClick} className={s.button}>Отправить и получить среднее</button>
            </div>
            <div className={s.hint}>
                <div>Предыдущее</div>
                <div>Текущее</div>
                <div>Среднее</div>
            </div>
            <ul className={s.list}>
                {data && data.map(item =>
                    <li className={s.card} key={String(Math.random())}>
                        <div>{item.prev}</div>
                        <div>{item.cur}</div>
                        <div>{item.average}</div>
                    </li>
                )}
            </ul>
        </MainContainer>
    );
};

export default Average;