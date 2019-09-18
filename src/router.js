import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
export const PATH_REFORM = "/edit";
export const PATH_HOME = "/";

Vue.use(Router);

let router = new Router({
    mode: 'history',
    component: Home,
    routes: [
        {
            path: PATH_REFORM,
            name: "ReformPage",
            props: true,
            component: () =>
                import ("./views/ReformPage.vue")
        },
        {
            path: PATH_HOME,
            name: "Home",
            component: () =>
                import ("./views/Home.vue")
        }
    ]
});

export default router;