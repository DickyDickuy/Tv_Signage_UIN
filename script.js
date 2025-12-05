// DAFTAR SLIDE ANDA
// Sesuaikan 'src' dengan nama file media yang Anda miliki
// 'duration' dalam milidetik (1000 ms = 1 detik)
const slides = [
    { 
        type: 'text', 
        content: 'Selamat Datang di Ruang Kantor Kami. Utamakan Keselamatan dan Kerapian.', 
        duration: 3000, 
        style: 'background-color: #1a2a4b;' // Gaya tambahan untuk slide teks
    },
    { 
        type: 'image', 
        src: 'assets/Screenshot 2025-05-05 213010.png', // Ganti dengan nama file gambar Anda
        duration: 5000 
    },
    { 
        type: 'text', 
        content: 'Meeting Internal Divisi Marketing akan diadakan pukul 14:00 di Ruang Merapi.', 
        duration: 5000,
        style: 'background-color: #630000;'
    },
    { 
        type: 'video', 
        src: 'assets/3.mp4', // Ganti dengan nama file video Anda
        duration: 5000 // Video akan diputar selama 5 detik. Hapus baris ini jika ingin memutar sampai selesai.
    },
    { 
        type: 'image', 
        src: 'assets/Screenshot 2025-05-11 125348.png', // Ganti dengan nama file gambar Anda
        duration: 5000 
    }
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
            // Terapkan style latar belakang ke kontainer untuk slide teks
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
                // Jika durasi ditentukan, gunakan durasi tersebut
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