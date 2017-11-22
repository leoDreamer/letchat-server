import Test from "./pages/test";
import Demo from "./pages/demo";
import Index from "./pages/index";
import Introduce from "./pages/introduce";

const routes = [
    { path: "/", component: Index },
    { path: "/introduce", component: Introduce },
    { path: "/test", component: Test },
    { path: "/demo", component: Demo }
];

export {
    routes
};
