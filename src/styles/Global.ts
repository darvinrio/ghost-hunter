import {createGlobalStyle} from "styled-components"

export const GlobalStyles = createGlobalStyle`
   
@import url('https://fonts.googleapis.com/css2?family=Space+Mono&display=swap');
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@200&display=swap');

  
* {
  box-sizing: border-box;
}
body {
  background: ${({ theme }) => theme.colors.bg};
  color: ${({ theme }) => theme.colors.text} ;
  font-family: ${({ theme }) => theme.font_family.name}, ${({ theme }) => theme.font_family.type};
  /* font-family: "Space Mono", monospace; */
  /* font-size: 1.15em; */
  margin: 30px;
  padding: 10px;
}
p {
  opacity: 0.8;
  line-height: 1.5;
  font-size: 1.1rem;
  h1{
  font-size: 3rem
}
}
img {
  max-width: 100%;
}
a {
  color: hotpink;
  text-decoration: none;

  :hover{
    color:pink ;
  }
}
`