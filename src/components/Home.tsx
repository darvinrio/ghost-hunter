import { useState } from "react"
import styled from "styled-components"
import { useNavigate } from "react-router-dom"

import { Button } from '../styles/Button.style'

const validateEntry = (entry: string) => {
    if (entry.substring(0, 2) !== '0x') {
        return 0
    }

    let len = entry.length
    if (len != 42 && len != 66) {
        return 0
    }

    if (len == 42) {
        return 1 //user
    }

    return 2 //tx
}

export const Home = () => {

    const [entry, setEntry] = useState<string>('')
    const [invalid, setInvalid] = useState<boolean>(false)
    let navigate = useNavigate();

    const handleSubmit = (e: any) => {
        e.preventDefault();
        setInvalid(false)
        let entry_type = validateEntry(entry)

        if (!entry_type) {
            setInvalid(true)
        }


        if (entry_type == 1) {
            navigate('/user/' + entry)
        }

        if (entry_type == 2) {
            navigate('/tx/' + entry)
        }

    }

    return (
        <HomeLayout>
            <h1>
                GhostHunter
            </h1>
            <StyledInput
                placeholder="Enter transaction hash or user address"
                onChange={(e) => setEntry(e.target.value)}
                required
                autoFocus
            />
            {invalid ? 'Invalid Input' : null}
            <Button
                bg={'white'}
                onClick={handleSubmit}
            >
                Search
            </Button>
            <br />
            <br />
            <p>
                Sample Inputs: 
                Users
                    <ul>
                        <li>0x1908bb246da7d358e4f79cea8b3d2ce5e81e6d64</li>
                        <li>0x3ddfa8ec3052539b6c9549f12cea2c295cff5296</li>
                    </ul>
            </p>
            <p>
                Sample Inputs: 
                Txs
                    <ul>
                        <li>0xd406317c7e05470de0bd3eb718adee4198ebed01bae9f0f7075790ef7013516a</li>
                        <li>0x05f851a010d7059600fb69d100ff5963e42f4f13b62aa996e8c39165c76796f6</li>
                    </ul>
            </p>
        </HomeLayout>
    )
}

const HomeLayout = styled.div`
    height: 80% ;
    display: flex;
    flex-direction: column ;
    align-items: center;
    justify-content: center
`

const StyledInput = styled.input`
    font-family: ${({ theme }) => theme.font_family.name}, ${({ theme }) => theme.font_family.type};
    min-height: 50px;
    width: 80%;
    background: transparent;

    color:pink;

    border: 0;
    border-bottom: 2px solid white;
    outline: 0;

    &::placeholder {
        color: white;
    }

    &:placeholder-shown ~ .form__label {
        font-size: 1.3rem;
        cursor: text;
        top: 20px;
    }
`