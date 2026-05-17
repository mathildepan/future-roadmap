/**
 * 能力模块渲染系统
 * 负责 Research / Technical / Language 三个模块的 DOM 生成
 */

var Capabilities = {
  render: function() {
    var container = document.getElementById('capabilities-container');
    if (!container) return;

    var categories = [
      TIMELINE_CONFIG.capabilities.research,
      TIMELINE_CONFIG.capabilities.technical,
      TIMELINE_CONFIG.capabilities.language
    ];

    categories.forEach(function(cat) {
      var card = document.createElement('div');
      card.className = 'capability-card';

      var header = document.createElement('div');
      header.className = 'capability-header';
      header.innerHTML =
        '<span class="capability-icon">' + cat.icon + '</span>' +
        '<span class="capability-title">' + cat.title + '</span>';

      card.appendChild(header);

      cat.items.forEach(function(item) {
        var skillItem = document.createElement('div');
        skillItem.className = 'skill-item';
        skillItem.innerHTML =
          '<div class="skill-info">' +
            '<span class="skill-name">' + item.name + '</span>' +
            '<span class="skill-level">' + item.level + '%</span>' +
          '</div>' +
          '<div class="skill-bar">' +
            '<div class="skill-fill" data-skill-level="' + item.level + '" style="width: 0%"></div>' +
          '</div>';
        card.appendChild(skillItem);
      });

      container.appendChild(card);
    });
  },

  /** 滚动时触发技能条动画 */
  animateSkills: function() {
    var fills = document.querySelectorAll('.skill-fill');
    fills.forEach(function(fill) {
      var level = fill.getAttribute('data-skill-level');
      if (level) {
        setTimeout(function() {
          fill.style.width = level + '%';
        }, 100);
      }
    });
  }
};
