import { HeaderButton, HeaderContainer, HeaderContent } from "./styles";
import logoImg from "../../assets/logo.svg";

export function Header() {
  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={logoImg} alt="" />
        <HeaderButton>Nova transação</HeaderButton>
      </HeaderContent>
    </HeaderContainer>
  )
}