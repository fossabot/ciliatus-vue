import config from "../config";

const Home = () => import('../views/Home')
const Login = () => import('../views/Login')
const Index_Animal = () => import('../views/index/Animal')
const Index_Habitat = () => import('../views/index/Habitat')
const Index_PhysicalSensor = () => import('../views/index/PhysicalSensor')
const Show_Habitat = () => import('../views/show/Habitat')
const Create_Habitat = () => import('../views/create/Habitat')

let route = (path, name, title, icon, menu, component, breadcrumbs = []) => {
    if (!Array.isArray(breadcrumbs)) breadcrumbs = [breadcrumbs]
    return {
        path: '/' + config.web.prefix + path,
        name: name,
        icon: icon,
        menu: menu,
        component: component,
        meta: {
            breadcrumbs: breadcrumbs,
            title: title
        }
    }
}

const routes = [
    route('', 'home', 'Home', 'mdi-help', true, Home),
    route('login', 'login', 'Login', 'mdi-help', false, Login),
    route('animals', 'index_animals', 'Animals', 'mdi-help', true, Index_Animal),
    route('habitats', 'index_habitats', 'Habitats', 'mdi-help', true, Index_Habitat),
    route('sensors', 'sensors', 'Sensors', 'mdi-help', true, Index_PhysicalSensor),

    route('habitats/create', 'create_habitat', 'Create Habitat', 'mdi-help', false, Create_Habitat, 'index_habitats'),
    route('habitats/:id', 'show_habitat', 'Habitat', 'mdi-help', false, Show_Habitat, 'index_habitats')
]

export default routes
