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
    }
`;
export default Global;