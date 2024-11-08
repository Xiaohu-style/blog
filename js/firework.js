// 设置初始状态，用户是否进行了交互
window.human = false;

// 获取 canvas 元素及其 2D 渲染上下文
var canvasEl = document.querySelector('.fireworks');
var ctx = canvasEl.getContext('2d');

// 烟花粒子数量
var numberOfParticules = 20;

// 鼠标指针的位置
var pointerX = 0;
var pointerY = 0;

// 根据设备支持情况设置触摸或点击事件
var tap = ('ontouchstart' in window || navigator.msMaxTouchPoints) ? 'touchstart' : 'mousedown';

// 烟花颜色数组
var colors = ['rgba(99, 97, 220, 0.2)', 'rgba(99, 97, 220, 0.4)', 'rgba(139, 240, 254, 0.2)'];

// 设置 canvas 大小
function setCanvasSize() {
  canvasEl.width = window.innerWidth;
  canvasEl.height = window.innerHeight;
  canvasEl.style.width = window.innerWidth + 'px';
  canvasEl.style.height = window.innerHeight + 'px';
}

// 更新鼠标指针位置
function updateCoords(e) {
  pointerX = e.clientX || e.touches[0].clientX;
  pointerY = e.clientY || e.touches[0].clientY;
}

// 计算烟花粒子的运动方向
function setParticuleDirection(p) {
  var angle = Math.random() * Math.PI * 2; // 随机角度
  var distance = Math.random() * 100 + 50; // 随机距离
  return {
    x: p.x + Math.cos(angle) * distance,
    y: p.y + Math.sin(angle) * distance
  };
}

// 创建烟花粒子
function createParticule(x, y) {
  var p = {};
  p.x = x;
  p.y = y;
  p.color = colors[Math.floor(Math.random() * colors.length)];
  p.radius = Math.random() * 8 + 8; // 随机大小区间
  p.endPos = setParticuleDirection(p);
  p.draw = function() {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, true);
    ctx.fillStyle = p.color;
    ctx.fill();
  };
  return p;
}

// 创建烟花中心圆
function createCircle(x, y) {
  var p = {};
  p.x = x;
  p.y = y;
  p.color = '#6361DC';
  p.radius = 0.1;
  p.alpha = .01; // 不透明度很小，可以看不到
  p.lineWidth = 2;
  p.draw = function() {
    ctx.globalAlpha = p.alpha;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, true);
    ctx.lineWidth = p.lineWidth;
    ctx.strokeStyle = p.color;
    ctx.stroke();
    ctx.globalAlpha = 1;
  };
  return p;
}

// 渲染烟花粒子
function renderParticule(anim) {
  ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
  for (var i = 0; i < anim.animatables.length; i++) {
    anim.animatables[i].target.draw();
  }
}

// 烟花粒子动画
function animateParticules(x, y) {
  var circle = createCircle(x, y);
  var particules = [];
  for (var i = 0; i < numberOfParticules; i++) {
    particules.push(createParticule(x, y));
  }
  anime.timeline().add({
    targets: particules,
    x: function(p) { return p.endPos.x; },
    y: function(p) { return p.endPos.y; },
    radius: 0.1,
    duration: anime.random(1200, 1800),
    easing: 'easeOutExpo',
    update: renderParticule
  })
    .add({
    targets: circle,
    radius: anime.random(80, 160),
    lineWidth: 0,
    alpha: {
      value: 0,
      easing: 'linear',
      duration: anime.random(600, 800)
    },
    duration: anime.random(1200, 1800),
    easing: 'easeOutExpo',
    update: renderParticule,
    offset: 0
  });
}

// 动画渲染控制器
var render = anime({
  duration: Infinity,
  update: function() {
    ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
  }
});

// 用户交互触发事件
document.addEventListener(tap, function(e) {
  window.human = true;
  render.play();
  updateCoords(e);
  animateParticules(pointerX, pointerY);
}, false);

// 设置 canvas 尺寸及窗口大小变化时的处理
setCanvasSize();
window.addEventListener('resize', setCanvasSize, false);
