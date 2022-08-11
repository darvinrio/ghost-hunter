// import original module declarations
import 'styled-components';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {

    colors: {
      nav: string;
      bg: string;
      text: string;
      btn_dark:string;
      btn_light:string;
    },
    font_family: {
      name:string,
      type:string
    }

  }
}