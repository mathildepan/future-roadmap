/**
 * 时间轴渲染与交互系统
 * 负责：时间轴 DOM 生成、复选框交互、进度计算
 * 数据结构 v2：periods[].categories[].tasks[]
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

    self._initIntersectionObserver();
  },

  /** 创建单个时间段元素 */
  _createPeriodElement: function(period, index) {
    var self = this;
    var wrapper = document.createElement('div');
    wrapper.className = 'timeline-period';
    wrapper.setAttribute('data-period-index', String(index));

    var dot = document.createElement('div');
    dot.className = 'period-dot';

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

    card.appendChild(theme);
    card.appendChild(statusBadge);
    card.appendChild(goal);

    // 目标院校（仅 2028 H1）
    if (period.targetSchools && period.targetSchools.length > 0) {
      var schoolsDiv = document.createElement('div');
      schoolsDiv.className = 'target-schools';
      var schoolsTitle = document.createElement('div');
      schoolsTitle.className = 'category-name';
      schoolsTitle.innerHTML = '🎓 留学申请目标院校';
      schoolsDiv.appendChild(schoolsTitle);

      var schoolsList = document.createElement('div');
      schoolsList.className = 'schools-list';
      period.targetSchools.forEach(function(school) {
        var tag = document.createElement('span');
        tag.className = 'school-tag';
        tag.textContent = school;
        schoolsList.appendChild(tag);
      });
      schoolsDiv.appendChild(schoolsList);
      card.appendChild(schoolsDiv);
    }

    // 分类任务
    if (period.categories) {
      period.categories.forEach(function(cat) {
        var catSection = self._createCategorySection(cat);
        card.appendChild(catSection);
      });
    }

    // 阶段进度条
    var allTasks = self._getAllTasksFromPeriod(period);
    var totalTasks = allTasks.length;
    var completedCount = self._countCompleted(allTasks);

    var progressDiv = document.createElement('div');
    progressDiv.className = 'period-progress';
    progressDiv.innerHTML =
      '<div class="progress-label">' +
        '<span>阶段完成度</span>' +
        '<span>' + completedCount + '/' + totalTasks + '</span>' +
      '</div>' +
      '<div class="progress-bar-mini">' +
        '<div class="progress-fill-mini" style="width: 0%" data-period-progress="' + period.id + '"></div>' +
      '</div>';
    card.appendChild(progressDiv);

    content.appendChild(timeLabel);
    content.appendChild(card);
    wrapper.appendChild(dot);
    wrapper.appendChild(content);

    return wrapper;
  },

  /** 创建分类任务区域 */
  _createCategorySection: function(cat) {
    var self = this;
    var section = document.createElement('div');
    section.className = 'category-section';

    var nameDiv = document.createElement('div');
    nameDiv.className = 'category-name';
    nameDiv.textContent = cat.name;
    section.appendChild(nameDiv);

    var taskList = document.createElement('ul');
    taskList.className = 'task-list';

    cat.tasks.forEach(function(task) {
      var li = document.createElement('li');
      li.className = 'task-item';

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
      li.appendChild(main);
      taskList.appendChild(li);
    });

    section.appendChild(taskList);
    return section;
  },

  /** 获取阶段所有任务（扁平化） */
  _getAllTasksFromPeriod: function(period) {
    var all = [];
    if (period.categories) {
      period.categories.forEach(function(cat) {
        if (cat.tasks) {
          cat.tasks.forEach(function(t) { all.push(t); });
        }
      });
    }
    return all;
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

    self._updateAllProgress();
  },

  /** 统计已完成任务数 */
  _countCompleted: function(tasks) {
    var self = this;
    var count = 0;
    tasks.forEach(function(t) {
      if (self.checked.has(t.id)) count++;
    });
    return count;
  },

  /** 更新所有阶段的进度 */
  _updateAllProgress: function() {
    var self = this;
    TIMELINE_CONFIG.periods.forEach(function(period) {
      var all = self._getAllTasksFromPeriod(period);
      var total = all.length;
      var done = self._countCompleted(all);
      var pct = total > 0 ? Math.round((done / total) * 100) : 0;

      var fill = document.querySelector('[data-period-progress="' + period.id + '"]');
      if (fill) {
        fill.style.width = pct + '%';
      }

      var parentRow = fill ? fill.closest('.period-progress') : null;
      if (parentRow) {
        var label = parentRow.querySelector('.progress-label span:last-child');
        if (label) {
          label.textContent = done + '/' + total;
        }
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

    var allTasks = self._getAllTasksFromPeriod(activePeriod);
    var totalTasks = allTasks.length;
    var doneTasks = self._countCompleted(allTasks);
    var pct = totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0;

    // 统计分类数
    var catCount = activePeriod.categories ? activePeriod.categories.length : 0;

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
        '<div class="mission-meta">' + catCount + ' 个分类 · ' + totalTasks + ' 项任务</div>' +
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
