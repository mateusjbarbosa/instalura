import React from "react";

import { MenuWrapper } from "./styles/MenuWrapper";

import Logo from "../../../theme/Logo";

const links = [
  { text: "Home", url: "/" },
  { text: "Perguntas Frequentes", url: "/faq" },
  { text: "Sobre", url: "/about" },
];

export default function Menu() {
  return (
    <MenuWrapper>
      <MenuWrapper.LeftSide>
        <Logo />
      </MenuWrapper.LeftSide>
      <MenuWrapper.CentralSide>
        {links.map((link) => {
          return (
            <li>
              <a href={link.url}>{link.text}</a>
            </li>
          );
        })}
      </MenuWrapper.CentralSide>
      <MenuWrapper.RightSide>
        <button>Entrar</button>
        <button>Cadastrar</button>
      </MenuWrapper.RightSide>
    </MenuWrapper>
  );
}
