/**
 * 冰川粒子背景系统
 * 轻量、克制 — 白色/淡蓝光点缓慢漂浮
 * 近距离粒子间有微弱连线
 */

class GlacierParticles {
  constructor() {
    this.canvas = document.getElementById('particles-canvas');
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.particleCount = 70;
    this.mouse = { x: -1000, y: -1000 };
    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize());
    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });

    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push(this.createParticle());
    }

    this.animate();
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  createParticle() {
    return {
      x: Math.random() * this.canvas.width,
      y: Math.random() * this.canvas.height,
      size: Math.random() * 1.8 + 0.4,
      speedX: (Math.random() - 0.5) * 0.2,
      speedY: (Math.random() - 0.5) * 0.2 - 0.1,
      opacity: Math.random() * 0.45 + 0.1,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: Math.random() * 0.01 + 0.005
    };
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.particles.forEach((p, i) => {
      // 移动
      p.x += p.speedX;
      p.y += p.speedY;
      p.pulse += p.pulseSpeed;

      // 边界循环
      if (p.x < -20) p.x = this.canvas.width + 20;
      if (p.x > this.canvas.width + 20) p.x = -20;
      if (p.y < -20) p.y = this.canvas.height + 20;
      if (p.y > this.canvas.height + 20) p.y = -20;

      // 脉冲透明度
      const pulseOpacity = p.opacity + Math.sin(p.pulse) * 0.15;
      const alpha = Math.max(0.05, Math.min(0.6, pulseOpacity));

      // 绘制粒子
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(180, 210, 240, ${alpha})`;
      this.ctx.fill();

      // 与附近粒子的连线
      for (let j = i + 1; j < this.particles.length; j++) {
        const dx = p.x - this.particles[j].x;
        const dy = p.y - this.particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 100) {
          this.ctx.beginPath();
          this.ctx.moveTo(p.x, p.y);
          this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
          const lineAlpha = (1 - dist / 100) * 0.06;
          this.ctx.strokeStyle = `rgba(180, 210, 240, ${lineAlpha})`;
          this.ctx.lineWidth = 0.5;
          this.ctx.stroke();
        }
      }

      // 鼠标附近的粒子微微靠近
      const mx = p.x - this.mouse.x;
      const my = p.y - this.mouse.y;
      const mDist = Math.sqrt(mx * mx + my * my);
      if (mDist < 150) {
        const force = (1 - mDist / 150) * 0.3;
        p.x += (mx / mDist) * force;
        p.y += (my / mDist) * force;
      }
    });

    requestAnimationFrame(() => this.animate());
  }
}
