import { Outlet, Link } from "react-router-dom";
import styled from "styled-components"

import { InputBox } from "./InputBox"

const Layout = () => {
  return (
    <>
      <NavLayout>
        <Link to="/">
          <h1>
            GhostHunter
          </h1>
        </Link>
        <InputBox />
      </NavLayout>
      <Outlet />
    </>
  )
}

const NavLayout = styled.div`
  display:grid ;
  grid-template-columns: 2fr 4fr 1fr 1fr;
  align-self: center;
  justify-self: center;
`

export default Layout;