import Carousel from './Carousel.vue';
import type { App } from 'vue';

const components = [Carousel];

const install = (app: App) => {
    components.forEach(c => {
        app.component(c.name, c)
    })

    return app;
}

export {
    Carousel
}

export default install;