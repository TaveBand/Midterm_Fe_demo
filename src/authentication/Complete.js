import { useNavigate } from "react-router-dom";
import Header from "../shared/Header";
import "./styles/Complete.css";

function Complete() {
  const navigate = useNavigate();

  
  
  function goToLogin() {
    navigate("/login");
  }

  return (
    <div>
      <Header />
      <div className="SignupSuccessPage">
        <img className="ClapImage" src="../img/clap.png" alt="clap" />
        <div className="Title">
          <div>회원가입을</div>
          <div>축하드립니다!</div>
        </div>
        <div className="LoginButton">
          <button onClick={goToLogin}>로그인 하기</button>
        </div>
      </div>
      <div className="Background">
        <img alt="background" src="/img/backphoto.jpg" />
      </div>
    </div>
  );
}

export default Complete;