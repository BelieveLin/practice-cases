window.addEventListener('load', function () {
    var preview_img = this.document.querySelector('.preview_img');
    var mask = document.querySelector('.mask');
    var big = document.querySelector('.big');
    var bigImg = document.querySelector('.bigImg');
    preview_img.addEventListener('mouseover', function () {
        mask.style.display = 'block';
        big.style.display = 'block';
    })
    preview_img.addEventListener('mouseout', function () {
        mask.style.display = 'none';
        big.style.display = 'none';
    })
    // 盒子内移动
    preview_img.addEventListener('mousemove', function (e) {
        // 鼠标在盒子内的坐标
        var x = e.pageX - this.offsetLeft;
        var y = e.pageY - this.offsetTop;
        // 遮罩层最大移动距离
        var maskMaxX = this.offsetWidth - mask.offsetWidth;
        var maskMaxY = this.offsetHeight - mask.offsetHeight;
        // 遮罩层移动距离
        var maskX = x - mask.offsetWidth / 2;
        var maskY = y - mask.offsetHeight / 2;
        // 限制遮罩层移动
        if (maskX <= 0)
            maskX = 0;
        else if (maskX >= maskMaxX)
            maskX = maskMaxX;
        if (maskY <= 0)
            maskY = 0;
        else if (maskY >= maskMaxY)
            maskY = maskMaxY;
        mask.style.left = maskX + 'px';
        mask.style.top = maskY + 'px';
        // 大图片最大移动距离
        var imgMaxX = bigImg.offsetWidth - big.offsetWidth;
        var imgMaxY = bigImg.offsetHeight - big.offsetHeight;
        // 大图片移动距离
        var imgX = maskX * imgMaxX / maskMaxX;
        var imgY = maskY * imgMaxY / maskMaxY;
        bigImg.style.left = -imgX + 'px';
        bigImg.style.top = -imgY + 'px';
    })
})