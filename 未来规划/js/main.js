/**
 * 未来规划时间轴 — 主入口
 * 初始化粒子背景、时间轴、能力模块、导航交互
 */

document.addEventListener('DOMContentLoaded', function() {

  // 1. 启动冰川粒子背景
  new GlacierParticles();

  // 2. 渲染时间轴
  Timeline.render();

  // 3. 渲染当前任务卡片
  Timeline.renderCurrentMission();

  // 4. 渲染能力模块
  Capabilities.render();

  // 5. 导航 — 滚动时样式切换
  var nav = document.querySelector('.nav');
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });

  // 6. Fade-up 元素进场观察
  var fadeUps = document.querySelectorAll('.fade-up');
  var fadeObserver = new IntersectionObserver(
    function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // 如果是能力模块区域，触发技能条动画
          if (entry.target.id === 'capabilities') {
            Capabilities.animateSkills();
          }
        }
      });
    },
    { threshold: 0.15 }
  );
  fadeUps.forEach(function(el) { fadeObserver.observe(el); });

});
