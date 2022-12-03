import Casousel from './Carousel.vue';
import type { App } from 'vue';

const components = [Casousel];

const install = (app: App) => {
    components.forEach(c => {
        app.component(c.name, c)
    })

    return app;
}

export {
    Casousel
}

export default install;