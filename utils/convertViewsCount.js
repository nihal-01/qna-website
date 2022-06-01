const convertViewsCount = (viewCount) => {
    let str = viewCount.toString();

    if (viewCount >= 1000000) {
        str = str.slice(0, -6);
        return `${str}m`;
    } else if (viewCount >= 1000) {
        str = str.slice(0, -3);
        return `${str}k`;
    }

    return str;
};

export default convertViewsCount;
