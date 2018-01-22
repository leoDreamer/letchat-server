import Blog from "../pages/index/blog";
import Project from "../pages/index/project";
import Index from "../pages/index/index.vue";
import Introduce from "../pages/index/introduce";

const routes = [
    { path: "/", component: Index },
    { path: "/introduce", component: Introduce },
    { path: "/blog", component: Blog },
    { path: "/project", component: Project }
];

export {
    routes
};
