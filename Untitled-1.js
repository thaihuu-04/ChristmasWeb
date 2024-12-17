// Lấy phần tử canvas và ngữ cảnh 2D
const canvas = document.getElementById('fireworksCanvas');
const ctx = canvas.getContext('2d');

// Kích thước canvas tự động khớp với kích thước cửa sổ
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Hàm tạo pháo hoa
class Firework {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.particles = [];

        // Tạo các hạt nhỏ cho pháo hoa
        for (let i = 0; i < 100; i++) {
            this.particles.push(new Particle(this.x, this.y, this.color));
        }
    }

    update() {
        this.particles.forEach((particle, index) => {
            particle.update();

            // Xóa các hạt nếu chúng đã mờ đi
            if (particle.alpha <= 0) {
                this.particles.splice(index, 1);
            }
        });
    }

    draw() {
        this.particles.forEach(particle => particle.draw());
    }
}

// Hàm tạo các hạt nhỏ
class Particle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 4 - 2;
        this.speedY = Math.random() * 4 - 2;
        this.gravity = 0.05;
        this.alpha = 1; // Độ mờ
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.speedY += this.gravity;
        this.alpha -= 0.02; // Giảm độ mờ
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.restore();
    }
}

// Mảng chứa các pháo hoa
const fireworks = [];

// Hàm tạo hiệu ứng pháo hoa khi nhấn chuột
canvas.addEventListener('click', (e) => {
    const x = e.clientX;
    const y = e.clientY;
    const color = `hsl(${Math.random() * 360}, 100%, 50%)`;
    fireworks.push(new Firework(x, y, color));
});

// Hàm vẽ và cập nhật hiệu ứng pháo hoa
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    fireworks.forEach((firework, index) => {
        firework.update();
        firework.draw();

        // Xóa pháo hoa nếu tất cả các hạt đã biến mất
        if (firework.particles.length === 0) {
            fireworks.splice(index, 1);
        }
    });

    requestAnimationFrame(animate);
}

animate();

