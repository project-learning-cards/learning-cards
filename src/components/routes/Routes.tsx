import React from "react";
import {Route, Switch} from "react-router-dom";
import {pages, PageType} from "./Pages";

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

