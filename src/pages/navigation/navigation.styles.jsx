import { Link } from "react-router-dom";
import styled from "styled-components";

export const NavigationContainer = styled.header`
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
`;

export const LogoContainer = styled(Link)`
  width: 70px;
  height: 100%;
  padding: 24px;
`;

export const NavLinks = styled.nav`
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export const NavLink = styled(Link)`
  cursor: pointer;
  padding: 10px 16px;
`;
