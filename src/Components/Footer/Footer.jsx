import { Link } from "react-router-dom";
import github from "../../img/GitHub.png"
import styles from "./Footer.module.css";
import { footerLang } from "./footerLang";
import { useSelector } from "react-redux";


export default function Footer(){
  const lan = useSelector((state) => state.language)
    return(
        <div className={styles.contorno} >
        <footer className="d-flex align-items-center justify-content-center ">
           <div className=" row mt-5 col-12 ">
            <div className=" row align-items-center justify-content-center">
      <div className="align-items-center justify-content-center col-2" style={{marginInline: "auto", width: "auto"}}>
      <a href="https://github.com/faculeveratto/PI-FT25a">
      <img className="mx-auto d-block" src={github} alt="" width="50" height="50"/>
      </a>
      </div>
          </div>
      </div>
</footer>
</div>
    )
}