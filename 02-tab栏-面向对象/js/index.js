// var that;
class Tab {
    constructor(id) {
        // that = this;
        this.main = document.querySelector(id);
        this.tabadd = this.main.querySelector('.tabadd');
        this.ul = this.main.querySelector('.fisrstnav ul:first-child');
        this.fsection = this.main.querySelector('.tabscon');
        this.init();
    }

    // 初始化，绑定事件
    init() {
        this.updateNode();
        // 在初始化函数中，需要更新绑定事件，最好用传统注册方式，用于覆盖前面注册的处理函数
        this.tabadd.onclick = this.addTab.bind(this.tabadd, this);
        // this.tabadd.addEventListener('click', this.addTab.bind(this.tabadd, this));
        for (var i = 0; i < this.lis.length; i++) {
            this.lis[i].index = i;
            this.lis[i].onclick = this.toggleTab.bind(this.lis[i], this);
            // this.lis[i].addEventListener('click', this.toggleTab.bind(this.lis[i], this));
            this.remove[i].onclick = this.removeTab.bind(this.remove[i], this);
            // this.remove[i].addEventListener('click', this.removeTab.bind(this.remove[i], this));
            this.spans[i].ondblclick = this.editTab;
            // this.spans[i].addEventListener('dblclick', this.editTab);
            this.sections[i].ondblclick = this.editTab;
            // this.sections[i].addEventListener('dblclick', this.editTab);
        }
    }

    // 清除样式
    clearClass() {
        for (var i = 0; i < this.lis.length; i++) {
            this.lis[i].className = '';
            this.sections[i].className = '';
        }
    }

    // 动态获取
    updateNode() {
        this.lis = this.main.querySelectorAll('li');
        this.sections = this.main.querySelectorAll('section');
        this.remove = this.main.querySelectorAll('.icon-guanbi');
        this.spans = this.main.querySelectorAll('.fisrstnav li span:first-child')
    }

    // 切换
    toggleTab(that) {
        // that.main.querySelector('.liactive').classList.remove('liactive');
        // this.classList.add('liactive');
        that.clearClass();
        this.className = 'liactive';
        that.sections[this.index].className = 'conactive';
    }

    // 添加
    addTab(that) {
        that.clearClass();
        var li = '<li class="liactive"><span>测试' + (that.lis.length + 1) + '</span><span class="iconfont icon-guanbi"></span></li>';
        var section = '<section class="conactive">测试' + (that.lis.length + 1) + '</section>';
        that.ul.insertAdjacentHTML('beforeend', li);
        that.fsection.insertAdjacentHTML('beforeend', section)
        that.init();
    }

    // 删除
    removeTab(that, e) {
        e.stopPropagation();    // 阻止冒泡，防止触发父级li的切换事件
        var index = this.parentNode.index;
        that.lis[index].remove();
        that.sections[index].remove();
        that.init();
        // 已经存在选中状态的li时，不改变选中状态
        // 不存在选中状态的li时，则表明删除的是选中状态的li，需要改变选中状态
        if (!document.querySelector('li.liactive')) {
            index--;
            // that.lis[index] && that.lis[index].click();  // 存在则调用
            if (that.lis[index])
                that.lis[index].click();
            else if (that.lis[0])
                that.lis[0].click();
        }

    }

    // 修改
    editTab(e) {
        var str = this.innerHTML;
        // 禁止双击选定文字
        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
        this.innerHTML = '<input type="text" />';
        var ipt = this.querySelector('input');
        ipt.value = str;    // 除button外，获取表单内容都用value
        ipt.select();       // 文本框中的文字处于选中状态
        ipt.onblur = function () {
            this.parentNode.innerHTML = this.value
        }
        ipt.onkeyup = function (e) {
            if (e.keyCode === 13)
                // 两个操作的结果相同，相当于该操作手动调用另一操作
                // 手动调用表单的失去焦点事件，不需要鼠标离开操作
                this.blur();
        }
    }
}
new Tab('#tab');


