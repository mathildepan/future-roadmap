/**
 * localStorage 持久化管理
 * 负责所有任务的勾选状态存储与读取
 */

var Storage = {
  KEY: 'future-timeline-checklist',

  /** 读取所有已勾选的任务 id 集合 */
  getChecked: function() {
    try {
      var raw = localStorage.getItem(this.KEY);
      if (!raw) return new Set();
      var arr = JSON.parse(raw);
      return new Set(Array.isArray(arr) ? arr : []);
    } catch (e) {
      return new Set();
    }
  },

  /** 保存已勾选的任务 id 集合 */
  saveChecked: function(checked) {
    try {
      var arr = Array.from(checked);
      localStorage.setItem(this.KEY, JSON.stringify(arr));
    } catch (e) {
      // localStorage 不可用时静默失败
    }
  },

  /** 切换单个任务的勾选状态，返回新状态 */
  toggle: function(id) {
    var checked = this.getChecked();
    if (checked.has(id)) {
      checked.delete(id);
      this.saveChecked(checked);
      return false;
    } else {
      checked.add(id);
      this.saveChecked(checked);
      return true;
    }
  },

  /** 检查某任务是否已勾选 */
  isChecked: function(id) {
    return this.getChecked().has(id);
  }
};
