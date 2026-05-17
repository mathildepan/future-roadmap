/**
 * 时间轴渲染与交互系统
 * 负责：时间轴 DOM 生成、复选框交互、展开/折叠、进度计算
 */

var Timeline = {
  checked: new Set(),

  /** 渲染整个时间轴 */
  render: function() {
    var self = this;
    self.checked = Storage.getChecked();
    var container = document.getElementById('timeline-container');
    if (!container) return;

    TIMELINE_CONFIG.periods.forEach(function(period, idx) {
      var el = self._createPeriodElement(period, idx);
      container.appendChild(el);
    });

    // 启动可见性观察
    self._initIntersectionObserver();
  },

  /** 创建单个时间段元素 */
  _createPeriodElement: function(period, index) {
    var self = this;
    var wrapper = document.createElement('div');
    wrapper.className = 'timeline-period';
    wrapper.setAttribute('data-period-index', String(index));

    // 节点圆点
    var dot = document.createElement('div');
    dot.className = 'period-dot';

    // 内容区
    var content = document.createElement('div');
    content.className = 'period-content';

    var timeLabel = document.createElement('div');
    timeLabel.className = 'period-time';
    timeLabel.textContent = period.timeLabel;

    var card = document.createElement('div');
    card.className = 'period-card';

    var theme = document.createElement('div');
    theme.className = 'period-theme';
    theme.innerHTML = '<span class="period-icon">' + period.icon + '</span>' + period.theme;

    var statusBadge = document.createElement('span');
    statusBadge.className = 'mission-status ' + period.status;
    statusBadge.textContent = period.status === 'in-progress' ? '进行中' : '即将到来';

    var goal = document.createElement('div');
    goal.className = 'period-main-goal';
    goal.textContent = period.mainGoal;

    // 任务列表
    var taskList = document.createElement('ul');
    taskList.className = 'task-list';

    period.tasks.forEach(function(task) {
      var taskEl = self._createTaskElement(task, index);
      taskList.appendChild(taskEl);
    });

    // 阶段进度条
    var progressDiv = document.createElement('div');
    progressDiv.className = 'period-progress';
    var taskCount = self._countAllTasks(period.tasks);
    var completedCount = self._countCompletedTasks(period.tasks);

    progressDiv.innerHTML =
      '<div class="progress-label">' +
        '<span>阶段完成度</span>' +
        '<span>' + completedCount + '/' + taskCount + '</span>' +
      '</div>' +
      '<div class="progress-bar-mini">' +
        '<div class="progress-fill-mini" style="width: 0%" data-period-progress="' + period.id + '"></div>' +
      '</div>';

    card.appendChild(theme);
    card.appendChild(statusBadge);
    card.appendChild(goal);
    card.appendChild(taskList);
    card.appendChild(progressDiv);

    content.appendChild(timeLabel);
    content.appendChild(card);

    wrapper.appendChild(dot);
    wrapper.appendChild(content);

    return wrapper;
  },

  /** 创建任务项（含子任务） */
  _createTaskElement: function(task, periodIndex) {
    var self = this;
    var li = document.createElement('li');
    li.className = 'task-item';

    // 主任务行
    var main = document.createElement('div');
    main.className = 'task-main';

    var checkbox = document.createElement('div');
    checkbox.className = 'checkbox';
    checkbox.setAttribute('data-task-id', task.id);
    if (self.checked.has(task.id)) {
      checkbox.classList.add('checked');
    }
    checkbox.addEventListener('click', function(e) {
      e.stopPropagation();
      self._toggleTask(task.id, checkbox);
    });

    var text = document.createElement('span');
    text.className = 'task-text';
    if (self.checked.has(task.id)) {
      text.classList.add('completed');
    }
    text.textContent = task.text;

    main.appendChild(checkbox);
    main.appendChild(text);

    // 展开按钮（仅当有子任务时）
    if (task.subtasks && task.subtasks.length > 0) {
      var expandBtn = document.createElement('button');
      expandBtn.className = 'expand-btn';
      expandBtn.innerHTML = '▾';
      expandBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        var subtasks = li.querySelector('.subtasks');
        if (subtasks) {
          var isOpen = subtasks.classList.contains('open');
          if (isOpen) {
            subtasks.classList.remove('open');
            expandBtn.classList.remove('open');
          } else {
            subtasks.classList.add('open');
            expandBtn.classList.add('open');
          }
        }
      });
      main.appendChild(expandBtn);

      // 子任务容器
      var subtasksDiv = document.createElement('div');
      subtasksDiv.className = 'subtasks';
      var subtasksInner = document.createElement('div');
      subtasksInner.className = 'subtasks-inner';

      task.subtasks.forEach(function(sub) {
        var subItem = document.createElement('div');
        subItem.className = 'subtask-item';

        var subCheckbox = document.createElement('div');
        subCheckbox.className = 'checkbox';
        subCheckbox.setAttribute('data-task-id', sub.id);
        if (self.checked.has(sub.id)) {
          subCheckbox.classList.add('checked');
        }
        subCheckbox.addEventListener('click', function(e) {
          e.stopPropagation();
          self._toggleTask(sub.id, subCheckbox);
        });

        var subText = document.createElement('span');
        subText.className = 'task-text';
        if (self.checked.has(sub.id)) {
          subText.classList.add('completed');
        }
        subText.textContent = sub.text;

        subItem.appendChild(subCheckbox);
        subItem.appendChild(subText);
        subtasksInner.appendChild(subItem);
      });

      subtasksDiv.appendChild(subtasksInner);
      li.appendChild(main);
      li.appendChild(subtasksDiv);
    } else {
      li.appendChild(main);
    }

    return li;
  },

  /** 切换任务勾选 */
  _toggleTask: function(id, checkboxEl) {
    var self = this;
    var isNowChecked = Storage.toggle(id);
    if (isNowChecked) {
      checkboxEl.classList.add('checked');
      self.checked.add(id);
    } else {
      checkboxEl.classList.remove('checked');
      self.checked.delete(id);
    }

    // 更新关联的文字样式
    var row = checkboxEl.parentElement;
    if (row) {
      var textEl = row.querySelector('.task-text');
      if (textEl) {
        if (isNowChecked) {
          textEl.classList.add('completed');
        } else {
          textEl.classList.remove('completed');
        }
      }
    }

    // 重新计算并更新所有阶段的进度
    self._updateAllProgress();
  },

  /** 统计所有任务数（含子任务） */
  _countAllTasks: function(tasks) {
    var count = 0;
    tasks.forEach(function(t) {
      count++;
      if (t.subtasks) count += t.subtasks.length;
    });
    return count;
  },

  /** 统计已完成任务数 */
  _countCompletedTasks: function(tasks) {
    var self = this;
    var count = 0;
    tasks.forEach(function(t) {
      if (self.checked.has(t.id)) count++;
      if (t.subtasks) {
        t.subtasks.forEach(function(s) {
          if (self.checked.has(s.id)) count++;
        });
      }
    });
    return count;
  },

  /** 更新所有阶段的进度 */
  _updateAllProgress: function() {
    var self = this;
    TIMELINE_CONFIG.periods.forEach(function(period) {
      var total = self._countAllTasks(period.tasks);
      var done = self._countCompletedTasks(period.tasks);
      var pct = total > 0 ? Math.round((done / total) * 100) : 0;

      var fill = document.querySelector('[data-period-progress="' + period.id + '"]');
      if (fill) {
        fill.style.width = pct + '%';
      }

      // 更新百分比文字
      var label = fill && fill.parentElement && fill.parentElement.parentElement
        ? fill.parentElement.parentElement.querySelector('.progress-label span:last-child')
        : null;
      if (label) {
        label.textContent = done + '/' + total;
      }
    });
  },

  /** IntersectionObserver — 滚动渐显 + 轴线点亮 */
  _initIntersectionObserver: function() {
    var periods = document.querySelectorAll('.timeline-period');
    var line = document.querySelector('.timeline-line');

    var observer = new IntersectionObserver(
      function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            if (line) line.classList.add('active');
          }
        });

        var anyVisible = Array.from(periods).some(function(p) {
          return p.classList.contains('visible');
        });
        if (!anyVisible && line) {
          line.classList.remove('active');
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -50px 0px' }
    );

    periods.forEach(function(p) { observer.observe(p); });
  },

  /** 渲染当前任务卡片 */
  renderCurrentMission: function() {
    var self = this;
    var container = document.getElementById('mission-container');
    if (!container) return;

    // 找第一个 in-progress 的阶段，否则找第一个 upcoming
    var activePeriod = null;
    for (var i = 0; i < TIMELINE_CONFIG.periods.length; i++) {
      if (TIMELINE_CONFIG.periods[i].status === 'in-progress') {
        activePeriod = TIMELINE_CONFIG.periods[i];
        break;
      }
    }
    if (!activePeriod) {
      for (var j = 0; j < TIMELINE_CONFIG.periods.length; j++) {
        if (TIMELINE_CONFIG.periods[j].status === 'upcoming') {
          activePeriod = TIMELINE_CONFIG.periods[j];
          break;
        }
      }
    }
    if (!activePeriod) activePeriod = TIMELINE_CONFIG.periods[0];

    var totalTasks = self._countAllTasks(activePeriod.tasks);
    var doneTasks = self._countCompletedTasks(activePeriod.tasks);
    var pct = totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0;

    container.innerHTML =
      '<div class="current-mission-card">' +
        '<div class="mission-header">' +
          '<span class="mission-icon">' + activePeriod.icon + '</span>' +
          '<span class="mission-theme">' + activePeriod.theme + '</span>' +
          '<span class="mission-status ' + activePeriod.status + '">' +
            '<span class="status-dot"></span>' +
            (activePeriod.status === 'in-progress' ? '进行中' : '即将到来') +
          '</span>' +
        '</div>' +
        '<div class="mission-goal">' + activePeriod.mainGoal + '</div>' +
        '<div class="progress-bar-wrapper">' +
          '<div class="progress-info">' +
            '<span>总进度</span>' +
            '<span>' + doneTasks + '/' + totalTasks + ' 任务完成</span>' +
          '</div>' +
          '<div class="progress-bar">' +
            '<div class="progress-fill" style="width: ' + pct + '%"></div>' +
          '</div>' +
        '</div>' +
      '</div>';
  }
};
