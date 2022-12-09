// @ts-nocheck

import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import remarkRehype from 'remark-rehype'
import rehypeKatex from 'rehype-katex'
import rehypePrism from 'rehype-prism-plus'
import rehypeStringify from 'rehype-stringify'



export function debounce(fn, wait) {
    let timer = null;

    return function () {
        const context = this;
        const args = [...arguments];

        if (timer) {
            clearTimeout(timer);
            timer = null;
        }
        timer = setTimeout(() => {
            fn.apply(context, args);
        }, wait);
    };
}


export function renderMarkdown(doc: string = ""): string {
    const file = unified()
        .use(remarkParse)
        .use(remarkGfm)
        .use(remarkMath)
        .use(remarkRehype)
        .use(rehypePrism)
        .use(rehypeKatex)
        .use(rehypeStringify)
        .processSync(doc)

    return String(file);
}

export function formatTime(utcTime: string): string {
    return utcTime.split("T")[0];
}

const allowedDomains = ["@qq.com", "@163.com", "@gmail.com", "@sina.com", "@outlook.com"];
export function validateEmail(email: string): string {
    let isAllowed = false;
    for (let i = 0; i < allowedDomains.length; i++) {
        if (email.endsWith(allowedDomains[i])) {
            isAllowed = true;
            break;
        }
    }

    if (!isAllowed) {
        return `允许的邮箱域名：${allowedDomains.join(', ')}`;
    }

    return '';
}


export function getImageColor(img: HTMLImageElement) {
    const canvas = document.createElement('canvas')
    canvas.width = img.width;
    canvas.height = img.height;

    const context = canvas.getContext("2d");
    img.crossOrigin = "Anonymous"
    context.drawImage(img, 0, 0, canvas.width, canvas.height);

    // 获取像素数据
    const data = context.getImageData(0, 0, img.width, img.height).data;

    const colors = new Map();

    for (let i = 0; i < data.length; i++) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const a = data[i + 3];
        i = i + 4;

        const color = `${r},${g},${b},${a}`
        const cnt = colors.get(color);
        cnt ? colors.set(color, cnt + 1) : colors.set(color, 1);
    }

    console.log(colors)
}
