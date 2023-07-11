import { createGlobalStyle } from "styled-components"

const GlobalStyle = createGlobalStyle`

	padding: 0;
	margin: 0;
	box-sizing: border-box;

	body, html {
		width: 100vw;
		height: 100vh;

		font-family: 'Raleway', sans-serif;
		color: #FFF;
		
	}
	:root{
		width: 100%;
  		height: 100%;
		
		display: flex;
  		justify-content: center;
        align-items: center;
  	    background: #8C11BE;
	}
`

export default GlobalStyle