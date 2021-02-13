import React from "react";

import { MenuWrapper } from "./styles/MenuWrapper";

import Logo from "../../../theme/Logo";
import { Button } from "../Button";

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
            <li key={link.url}>
              <a href={link.url}>{link.text}</a>
            </li>
          );
        })}
      </MenuWrapper.CentralSide>
      <MenuWrapper.RightSide>
        <Button type="button" ghost variant="secondary.main">
          Entrar
        </Button>
        <Button type="button" variant="primary.main">
          Cadastrar
        </Button>
      </MenuWrapper.RightSide>
    </MenuWrapper>
  );
}
