import styled, { DefaultTheme } from "styled-components"

interface props {
    theme?:DefaultTheme,
    color?:string,
    bg?: string,
    min_height?: string
}

export const Button = styled.button<props>`
    background: ${props => props.bg || "palevioletred"};
    /* color: ${({ theme }) => theme.colors.bg} ; */
    color: ${props =>props.color || props.theme.colors.bg} ;
    text-align: center;
    justify-content: center;
    /* min-height: 50px; */
    min-height: ${props => props.min_height || '50px'};
    min-width: 200px;
    font-size: 1.1rem;
    font-family: ${({ theme }) => theme.font_family.name}, ${({ theme }) => theme.font_family.type};
    /* width: 50%; */

    border: 0;
    padding: 10px 10px;
    margin: 10px 10px;
    border-radius: 50px;

    /* box-sizing: border-box; */

    cursor: pointer;

    :hover {
        opacity: 0.9;
        transform: scale(0.98)
    }
    :disabled {
        opacity: 1.2;
        transform: none;
        :hover {
            box-shadow: none 0 0;
        }
        cursor: not-allowed;
    }
`


