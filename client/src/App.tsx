import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/styles";

import fakeData from "fakeData";
import { Layout } from "./components/layout";
import "./setupFont";
import { theme } from "./setupMUITheme";
import { ApiData } from "types/api";

const fetchData = async () => {
  const requestHeaders = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-User": "9999",
  });

  const response = await fetch(
    "https://assurahack202012activitytrackerapi.azurewebsites.net/ActivityTracker",
    {
      headers: requestHeaders,
    }
  );
  return response;
};

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<ApiData | null>(null);

  useEffect(() => {
    const fetchDataCall = async () => {
      const response = await fetchData();
      const data = await response.json();
      setData(data);
      setIsLoading(false);
    };
    fetchDataCall();
  }, []);

  // const isLoading = false;
  // const data = fakeData;

  return isLoading ? (
    <p>Loading</p>
  ) : (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Layout data={data!} />
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
