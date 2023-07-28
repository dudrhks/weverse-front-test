import 'the-new-css-reset/css/reset.css';

import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Noto Sans KR', Helvetica, '맑은 고딕', 'malgun gothic', 		   
		'Apple SD Gothic Neo', 'Apple SD 산돌고딕 Neo',  		   
		'Microsoft NeoGothic',  		   
		'Droid sans', sans-serif; 
    line-height: 1.5;
   color:#ffffff;
  }
`

export default GlobalStyle
