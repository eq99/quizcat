import type { App } from 'vue';
import Carousel from './Carousel.vue';
import Zoom from './Zoom.vue';
import Pagenate from './Pagenate.vue';
import Dropdown from './Dropdown.vue';
import Abuse from './abuse/Abuse.vue';
import Report from "./abuse/Report.vue";

const components = [
    Carousel,
    Zoom,
    Pagenate,
    Dropdown,
    Abuse,
    Report,
];

const install = (app: App) => {
    components.forEach(c => {
        app.component(c.name, c)
    })

    return app;
}

export {
    Carousel,
    Zoom,
    Pagenate,
    Dropdown,
    Abuse,
    Report
}

export default install;