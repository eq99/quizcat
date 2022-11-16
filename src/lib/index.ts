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