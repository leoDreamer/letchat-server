import Blog from "./pages/blog";
import Project from "./pages/project";
import Index from "./pages/index";
import Introduce from "./pages/introduce";

const routes = [
    { path: "/", component: Index },
    { path: "/introduce", component: Introduce },
    { path: "/blog", component: Blog },
    { path: "/project", component: Project }
];

export {
    routes
};
