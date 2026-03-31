Page({
  data: {
    todoList: [],      // 待办列表
    inputValue: ''     // 输入框内容
  },

  onLoad() {
    // 页面加载时读取本地保存的待办
    const savedTodos = wx.getStorageSync('todoList') || [];
    this.setData({ todoList: savedTodos });
  },

  // 输入框变化
  inputChange(e) {
    this.setData({ inputValue: e.detail.value });
  },

  // 添加待办
  addTodo() {
    if (!this.data.inputValue.trim()) {
      wx.showToast({ title: '请输入内容哦~', icon: 'none' });
      return;
    }

    const newTodo = {
      id: Date.now(),
      text: this.data.inputValue.trim(),
      completed: false
    };

    const newList = [...this.data.todoList, newTodo];

    this.setData({
      todoList: newList,
      inputValue: ''   // 清空输入框
    });

    wx.setStorageSync('todoList', newList);
    wx.showToast({ title: '添加成功！' });
  },

  // 切换完成状态
  toggleComplete(e) {
    const id = Number(e.currentTarget.dataset.id);
    const newList = this.data.todoList.map(item => {
      if (item.id === id) {
        item.completed = !item.completed;
      }
      return item;
    });

    this.setData({ todoList: newList });
    wx.setStorageSync('todoList', newList);
  },

  // 删除待办
  deleteTodo(e) {
    const id = Number(e.currentTarget.dataset.id);
    wx.showModal({
      title: '提示',
      content: '确定要删除这条吗？',
      success: (res) => {
        if (res.confirm) {
          const newList = this.data.todoList.filter(item => item.id !== id);
          this.setData({ todoList: newList });
          wx.setStorageSync('todoList', newList);
        }
      }
    });
  }
});