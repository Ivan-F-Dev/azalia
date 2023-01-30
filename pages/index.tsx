import MainContainer from "../components/MainContainer";
import s from '/styles/pages/index.module.scss'

const Index = () => {
    return (
        <MainContainer title='Главная страница'>

            <h1 className={s.title}>Главная страница</h1>
            <a className={s.git} href="https://github.com/Ivan-F-Dev">Github.com</a>
            <a className={s.git} href="https://hh.ru/resume/80a688faff0b7932a90039ed1f4b6157694345?disableBrowserCache=true&hhtmFrom=resume_list">hh.ru resume</a>
        </MainContainer>
    );
};

export default Index;