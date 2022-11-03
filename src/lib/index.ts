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