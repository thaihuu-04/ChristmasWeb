const canvas = document.getElementById('snow-canvas');
const ctx = canvas.getContext('2d');

// Đặt kích thước canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Mảng lưu các bông tuyết
const snowflakes = [];

// Hàm tạo bông tuyết
function createSnowflake() {
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height;
  const radius = Math.random() * 7 + 1; // Kích thước bông tuyết (1 - 5px)
  const speed = Math.random() * 2 + 1; // Tốc độ rơi
  return { x, y, radius, speed };
}

// Thêm bông tuyết vào mảng
for (let i = 0; i < 100; i++) {
  snowflakes.push(createSnowflake());
}

// Vẽ bông tuyết
function drawSnowflake(snowflake) {
  ctx.beginPath();
  ctx.arc(snowflake.x, snowflake.y, snowflake.radius, 0, Math.PI * 2);
  ctx.fillStyle = 'white';
  ctx.fill();
}

// Cập nhật vị trí bông tuyết
function updateSnowflake(snowflake) {
  snowflake.y += snowflake.speed;
  if (snowflake.y > canvas.height) {
    snowflake.y = -snowflake.radius; // Đặt lại bông tuyết ở phía trên
    snowflake.x = Math.random() * canvas.width;
  }
}

// Hàm tạo hiệu ứng tuyết rơi
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Xóa khung hình trước
  snowflakes.forEach((snowflake) => {
    drawSnowflake(snowflake);
    updateSnowflake(snowflake);
  });
  requestAnimationFrame(animate); // Lặp lại animation
}

// Đảm bảo canvas thay đổi kích thước khi người dùng thay đổi kích thước cửa sổ
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

animate();

document.addEventListener("DOMContentLoaded", function () {
  const menuLink = document.querySelector('.nav-link[href="#menu"]'); // Link Menu
  const popupModal = new bootstrap.Modal(document.getElementById('popupModal'));
  const closePopupBtns = document.querySelectorAll('#closePopupBtn, #closePopupBtnFooter');

  // Mở popup khi click vào menu
  menuLink.addEventListener("click", function (e) {
      e.preventDefault();
      popupModal.show();
  });

  // Đóng popup
  closePopupBtns.forEach(btn => {
      btn.addEventListener("click", function () {
          popupModal.hide();
      });
  });
});
