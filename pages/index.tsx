import MainContainer from "../components/MainContainer";
import s from '/styles/pages/index.module.scss'

const Index = () => {
    return (
        <MainContainer title='Главная страница'>
            <h1 className={s.title}>Главная страница</h1>
            <a className={s.git} href="https://github.com/Ivan-F-Dev">Github.com</a>
            <a className={s.git} href="https://disk.yandex.ru/i/XtGVv8HPAewR2w">resume</a>
        </MainContainer>
    );
};

export default Index;