export function renderIf(condition, content) {
    if (condition) {
        return content;
    } else {
        return null;
    }
}

export function renderIfElse(condition, content, contentElse) {
    if (condition) {
        return content;
    } else {
        return contentElse;
    }
}