const engine = new TamagotchiEngine();
window.engine = engine;

const container = document.getElementById('console-container');
document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 30;
    const y = (e.clientY / window.innerHeight - 0.5) * -30;
    container.style.transform = `rotateX(${y}deg) rotateY(${x}deg)`;
});
document.addEventListener('mouseleave', () => {
    container.style.transform = `rotateX(0deg) rotateY(0deg)`;
});
