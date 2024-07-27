import { createGlobalStyle } from "styled-components";
const Global = createGlobalStyle`
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }
    body{
        font-family: 'Roboto', Sans-serif;
        background: #f1f2f6;
        transition: background-color 0.5s, color 0.5s;
    }
    
    .light-mode {
        background-color: #ffffff;
        color: #000000;
    }

    .dark-mode {
        background-color: #1e1e1e;
        color: #ffffff;
    }
`;
export default Global;