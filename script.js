// script.js

// Inisialisasi AOS (Animate On Scroll)
// AOS akan bekerja secara otomatis pada elemen dengan atribut data-aos
AOS.init({
    duration: 800, // Durasi animasi dalam milidetik
    once: true // Animasi hanya akan berjalan sekali saat elemen pertama kali terlihat
});

// Fungsi untuk mengaktifkan/menonaktifkan Dark Mode
function toggleDarkMode() {
    // Mengubah kelas 'dark-mode' pada elemen body
    document.body.classList.toggle("dark-mode");

    // Menyimpan preferensi tema ke Local Storage browser
    // Ini memastikan tema tetap sama saat pengguna kembali ke situs
    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }
}

// Fungsi untuk memvalidasi format email menggunakan Regular Expression
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

// Event Listener yang akan dijalankan setelah seluruh DOM dimuat
document.addEventListener("DOMContentLoaded", () => {
    // Mengaplikasikan tema dari Local Storage saat halaman dimuat
    // Jika ada preferensi 'dark', tema gelap akan diaktifkan
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
    }

    // --- KODE INI MEMBUAT TOMBOL NAVIGASI BERFUNGSI DENGAN SMOOTH SCROLL ---
    // Pilih semua tautan navigasi di dalam elemen <nav> yang href-nya dimulai dengan '#'
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Mencegah perilaku default tautan (yaitu melompat langsung)

            const targetId = this.getAttribute('href'); // Dapatkan ID target (misalnya "#about", "#skills")
            const targetElement = document.querySelector(targetId); // Dapatkan elemen target

            if (targetElement) {
                // Gunakan scrollIntoView untuk menggulir dengan mulus
                targetElement.scrollIntoView({
                    behavior: 'smooth', // Efek gulir yang halus
                    block: 'start'      // Gulir hingga elemen berada di bagian atas viewport
                });

                // Opsional: Jika Anda memiliki header yang posisinya fixed dan menutupi konten
                // Anda bisa menggunakan kode berikut sebagai alternatif untuk mengatasi offset:
                /*
                const header = document.querySelector('header'); // Sesuaikan dengan selector header Anda
                const headerOffset = header ? header.offsetHeight : 0; // Dapatkan tinggi header
                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerOffset; // Kurangi dengan tinggi header

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
                */
            }
        });
    });
    // --- AKHIR KODE SMOOTH SCROLL ---


    // Mengambil elemen form dan pesan status
    const contactForm = document.getElementById("contactForm");
    const successMessage = document.getElementById("successMessage");
    const errorMessage = document.getElementById("errorMessage");

    // Menambahkan event listener untuk submit form kontak
    contactForm.addEventListener("submit", function(event) {
        // Mencegah perilaku default form submit (yaitu refresh halaman)
        event.preventDefault();

        // Mengambil nilai dari input form
        const name = document.getElementById("contactName").value.trim(); // .trim() untuk menghapus spasi di awal/akhir
        const email = document.getElementById("contactEmail").value.trim();
        const message = document.getElementById("contactMessage").value.trim();

        // Validasi sederhana: Memastikan semua kolom tidak kosong
        if (name === "" || email === "" || message === "") {
            // Tampilkan pesan error jika ada kolom yang kosong
            errorMessage.textContent = "Mohon lengkapi semua kolom yang wajib diisi.";
            errorMessage.style.display = "block"; // Tampilkan pesan error
            successMessage.style.display = "none"; // Sembunyikan pesan sukses
        } else if (!validateEmail(email)) { // Memanggil fungsi validasi email
            // Tampilkan pesan error jika format email tidak valid
            errorMessage.textContent = "Mohon masukkan alamat email yang valid.";
            errorMessage.style.display = "block";
            successMessage.style.display = "none";
        } else {
            // Jika validasi berhasil (dalam skenario nyata, data akan dikirim ke backend)
            successMessage.textContent = "Terima kasih, pesan Anda telah berhasil dikirim!";
            successMessage.style.display = "block"; // Tampilkan pesan sukses
            errorMessage.style.display = "none"; // Sembunyikan pesan error
            contactForm.reset(); // Mengatur ulang (mengosongkan) form
        }

        // Catatan: Untuk fungsionalitas pengiriman email atau penyimpanan data,
        // Anda perlu mengintegrasikan ini dengan layanan backend (misalnya PHP, Node.js, Python Flask)
        // atau layanan pihak ketiga seperti Formspree, EmailJS, dll.
    });
});