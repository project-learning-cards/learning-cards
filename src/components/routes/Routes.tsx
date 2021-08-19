import React from "react";
import {Switch, Route} from "react-router-dom";
import {PageType, pages} from "./Pages";

const mappedRoutes = pages.map((p: PageType) => (
    <Route
        key={"route-" + p._id}
        path={p.path && (p.path + (p.params || ""))}
        exact={p.exact}
        render={() => p.page}
    />
));
export const Routes = () => {
    return (
        <Switch>
            {mappedRoutes}
        </Switch>
    );
};

