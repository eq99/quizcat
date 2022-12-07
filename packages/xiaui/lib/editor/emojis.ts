const EMOJIS = [
    ['脱单doge', '63903c7eb1fccdcd3603df3e'],
    ['doge', '63903c6fb1fccdcd3603c5d3'],
    ['OK', '63903c6fb1fccdcd3603c5ea'],
    ['吃瓜', '63903c6fb1fccdcd3603c5dd'],
    ['给心心', '63903c7eb1fccdcd3603df07'],
    ['大哭', '63903c6fb1fccdcd3603c608'],
    ['打call', '63903c6fb1fccdcd3603c5fb'],
    ['捂眼', '63903c7eb1fccdcd3603df54']
];

export function getEmojiURL(longName: string) {
    return `https://pic.imgdb.cn/item/${longName}.png`
}

export default EMOJIS;