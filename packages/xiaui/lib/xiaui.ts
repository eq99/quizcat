import type { App } from 'vue';
import Carousel from './Carousel.vue';
import Zoom from './Zoom.vue';
import Pagenate from './Pagenate.vue';
import Dropdown from './Dropdown.vue';
import Abuse from './abuse/Abuse.vue';
import Report from "./abuse/Report.vue";
import Avatar from './Avatar.vue';
import CommentEditor from './editor/Comment.vue';
import OneChatEditor from './editor/OneChat.vue';
import Button from './buttons/Button.vue';
import Tooltip from './box/Tootip.vue';
import Icon from './Icon.vue';
import Tabs from './tabs/Tabs.vue';
import TabItem from './tabs/TabItem.vue';


const components = [
    Carousel,
    Zoom,
    Pagenate,
    Dropdown,
    Abuse,
    Report,
    Avatar,
    CommentEditor,
    OneChatEditor,
    Button,
    Tooltip,
    Icon,
    Tabs,
    TabItem
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
    Report,
    Avatar,
    CommentEditor,
    OneChatEditor,
    Button,
    Tooltip,
    Icon,
    Tabs,
    TabItem
}

export default install;