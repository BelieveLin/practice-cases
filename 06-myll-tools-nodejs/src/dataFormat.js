function dataFormat(timer) {
    const data = new Date(timer);
    let y = padZero(data.getFullYear());
    let m = padZero(data.getMonth() + 1);
    let d = padZero(data.getDate());
    let hh = padZero(data.getHours());
    let mm = padZero(data.getMinutes());
    let ss = padZero(data.getSeconds());
    let str = `${y}年${m}月${d}日 ${hh}：${mm}：${ss}`
    return str;
}
function padZero(n) {
    return n > 9 ? n : '0' + n;
}

module.exports = {
    dataFormat
}