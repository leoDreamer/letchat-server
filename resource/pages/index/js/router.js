import Blog from "../blog";
import Project from "../project";
import Index from "../index.vue";
import Introduce from "../introduce";

const routes = [
    { path: "/", component: Index },
    { path: "/introduce", component: Introduce },
    { path: "/blog", component: Blog },
    { path: "/project", component: Project }
];

export {
    routes
};
