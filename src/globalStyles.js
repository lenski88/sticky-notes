import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`

html {
    font-size: 62.5%;
    font-family: Arial, Helvetica, sans-serif;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    width:100%;
    height: 100%;
    background-color: #dfac8d;
}
`;
