import { Route } from "react-router-dom";
import type { RouteType } from "../config";
import type { ReactNode } from "react";
import RouteAuthenticator from "../../components/routes/RouteAuthenticator";


export const generateRoute = (routes: RouteType[]): ReactNode => {
    return routes.map((route, index) => {
        const element = route.element;

        const authenticatedElement = (
            <RouteAuthenticator route={route}>
                {element}
            </RouteAuthenticator>
        );

        return route.index ? (
            <Route index
                element={authenticatedElement}
                key={route.state || route.path || index}
            >
            </Route>
        ) : (
            <Route
                path={route.path}
                element={authenticatedElement}
                key={route.state || route.path || index}
            >
                {route.child && (
                    generateRoute(route.child)
                )}
            </Route>
        );
    });
};
