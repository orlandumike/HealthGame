import { createMuiTheme } from "@material-ui/core/styles";

import Colors from "colors";

export const theme = createMuiTheme({
  palette: {
    primary: {
      light: Colors.RedLighten10,
      main: Colors.Red,
    },
  },
});
