const slides = [
    { 
        type: 'image', 
        src: 'assets/IM0.png', 
        duration: 10000 
    },
    { 
        type: 'video', 
        src: 'assets/V1.mp4',
    },
    { 
        type: 'video', 
        src: 'assets/V2.mp4',
    },
    { 
        type: 'image', 
        src: 'assets/IM1.jpg', 
        duration: 10000 
    },
    { 
        type: 'video', 
        src: 'assets/V3.mp4', 
    },
    { 
        type: 'image', 
        src: 'assets/IM2.png', 
        duration: 10000 
    },
];

let currentSlideIndex = 0;
const container = document.getElementById('signage-container');

function showNextSlide() {
    const slide = slides[currentSlideIndex];
    
    // 1. Mulai transisi (Fade Out)
    container.style.opacity = 0;

    setTimeout(() => {
        // 2. Kosongkan Kontainer dan Reset Style setelah Fade Out
        container.innerHTML = '';
        container.style.backgroundColor = 'transparent'; // Reset background

        let contentElement;
        let nextDuration = slide.duration;

        if (slide.type === 'text') {
            contentElement = document.createElement('div');
            contentElement.classList.add('slide-text');
            contentElement.textContent = slide.content;
            container.style.backgroundColor = slide.style ? slide.style.match(/background-color:\s*([^;]+)/i)[1] : '#000';
            contentElement.style = slide.style || ''; 
            nextDuration = slide.duration;

        } else if (slide.type === 'image') {
            contentElement = document.createElement('img');
            contentElement.src = slide.src;
            
        } else if (slide.type === 'video') {
            contentElement = document.createElement('video');
            contentElement.src = slide.src;
            contentElement.autoplay = true; 
            contentElement.loop = false; // Video diputar sekali
            contentElement.muted = true; // Penting untuk autoplay di browser modern
            
            if (slide.duration) {
                nextDuration = slide.duration;
            } else {
                // Jika tidak ada durasi, tunggu video selesai
                contentElement.onended = () => {
                    currentSlideIndex = (currentSlideIndex + 1) % slides.length;
                    showNextSlide();
                };
                nextDuration = null;
            }
        }

        // 3. Tambahkan elemen ke Kontainer
        if (contentElement) {
            container.appendChild(contentElement);
        }

        // 4. Lakukan Fade In
        container.style.opacity = 1;

        // 5. Atur Timer untuk Slide Berikutnya (Hanya untuk gambar/teks)
        if (nextDuration) {
            setTimeout(() => {
                currentSlideIndex = (currentSlideIndex + 1) % slides.length; // Hitung mundur
                showNextSlide(); // Panggil fungsi lagi
            }, nextDuration);
        }
    }, 1000); // Tunggu 1 detik untuk transisi fade out
}

// Mulai slideshow saat halaman dimuat
showNextSlide();
