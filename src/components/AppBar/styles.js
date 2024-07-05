import styled from "styled-components";

export const Header = styled.header`
    background-color: #00A195;
    color: #333232;
    display: flex;
    align-items: center;
    padding: 15px;
    height: 11vh;
    width: 100%;

    @media (max-width: 768px) {
    img {
        width: 80px;
    }

    h1 {
        font-size: 15px;
    }}
`;
export const Title = styled.h1`
    color: #fff;
    text-align: center;
    margin-left: 32%;

     @media (max-width: 768px) {
        margin-left: 25%;
    }

`;