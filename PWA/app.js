// ==============================
// REGISTER SERVICE WORKER
// ==============================
if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker
            .register("/sw.js")
            .then((reg) => console.log("Service Worker Registered:", reg))
            .catch((err) => console.error("SW registration failed:", err));
    });
}

// ==============================
// NOTIFICATION LOGIC
// ==============================

const notifyBtn = document.getElementById("notifyBtn");
const notifStatus = document.getElementById("notifStatus");

// Jika tombol ditemukan di halaman
if (notifyBtn) {
    notifyBtn.addEventListener("click", () => {

        // Efek klik kecil (diperkecil sebentar)
        notifyBtn.style.transform = "scale(0.9)";
        setTimeout(() => {
            notifyBtn.style.transform = "scale(1)";
        }, 180);

        // Jika permission sudah diberikan — langsung kirim notif
        if (Notification.permission === "granted") {
            sendNotification();
            return;
        }

        // Jika belum — minta izin
        Notification.requestPermission().then((perm) => {
            if (perm === "granted") {
                sendNotification();
            } else if (perm === "denied") {
                notifStatus.innerText = "❌ Notifikasi ditolak";
                notifStatus.style.color = "#d63031";
            }
        });
    });
}

// ==============================
// FUNGSI MENGIRIM NOTIFIKASI
// ==============================
function sendNotification() {
    new Notification("Notifikasi Aktif! 🔔", {
        body: "Keren! Notifikasi berhasil diaktifkan ✨",
        icon: "/images/icons/icon-192x192.png"
    });

    notifStatus.innerText = "✅ Notifikasi berhasil!";
    notifStatus.style.color = "#2ecc71";

    // Menghilangkan status setelah 3 detik
    setTimeout(() => {
        notifStatus.innerText = "";
    }, 3000);
}
