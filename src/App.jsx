import "./styles.css";
import Cats from "./components/cats.jsx";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCat } from "@fortawesome/free-solid-svg-icons";

const Header = styled.h1`
  margin-top: 30px;

  .icon {
    margin-left: 10px;
  }
`;

const Paragraph = styled.p`
  a {
    color: #ff6841;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export default function App() {
  return (
    <div className="App">
      <Header>
        Cat App
        <FontAwesomeIcon icon={faCat} className="icon" />
      </Header>
      <h3>Julie Lee - Banzai</h3>
      <Paragraph>
        Here is my basic cat app using React. Add a breed of cat to your
        favorites, or learn more about the breed!
      </Paragraph>

      <Paragraph>
        To see some other projects I've worked on feel free to checkout my{" "}
        <a href="https://github.com/juliannehalversen" target="_blank">
          Github.{" "}
        </a>
        Checkout some of my pinned projects to see some previous code, or see my{" "}
        <a href="https://juliannelee.netlify.app/" target="_blank">
          portfolio here.
        </a>
        To see a React landing page that had a lot more styling/animation,{" "}
        <a
          href="https://www.motivosity.com/culture-studies/lemonade-stand/"
          target="_blank"
        >
          checkout this page
        </a>{" "}
        I created, or to see an example of some calculators I made,{" "}
        <a href="https://www.motivosity.com/roi-calculator/" target="_blank">
          check here.
        </a>
      </Paragraph>

      <Cats />
    </div>
  );
}
