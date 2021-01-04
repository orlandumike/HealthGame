import React from "react";
import { Route, Switch } from "react-router-dom";

import { Error404Page, HomePage } from "components/pages";
import { ApiData } from "types/api";

interface Props {
  data: ApiData;
}

const Routing: React.FC<Props> = ({ data }) => (
  <Switch>
    <Route path="/" exact>
      <HomePage data={data} />
    </Route>
    <Route path="*">
      <Error404Page />
    </Route>
  </Switch>
);

export default Routing;
