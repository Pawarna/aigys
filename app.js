const apiToken = "Y_DPdQRfKJ4wUBy4o2NhGwfsGT3ZLcT4";
const apiUrl = `https://blynk.cloud/external/api/get?token=${apiToken}&v0&v1&v2&v3&v4`;

// Cek status dark mode dari localStorage
const darkModeToggle = document.getElementById("dark-mode-toggle");
if (localStorage.getItem("theme") === "dark") {
  document.body.setAttribute("data-theme", "dark");
  darkModeToggle.checked = true;
}

// Event Listener untuk Toggle Dark Mode
darkModeToggle.addEventListener("change", () => {
  if (darkModeToggle.checked) {
    document.body.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.body.removeAttribute("data-theme");
    localStorage.setItem("theme", "light");
  }
});

async function fetchData() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    // Update Kelembaban Tanah (Moisture Level)
    const moistureLevel = data.v0;
    document.getElementById("moisturize-level").innerText = `${moistureLevel}%`;

    // Mengisi progress bar dengan persentase kelembaban
    const progressFill = document.getElementById("moisturize-progress");
    progressFill.style.width = `${moistureLevel}%`;

    // Update data lainnya
    document.getElementById("river-level").innerText = `${data.v1}`;
    document.getElementById("storage-level").innerText = `${data.v2}`;

    const pumpStatus = document.getElementById("pump-status");
    pumpStatus.innerText = data.v3 === 1 ? "On" : "Off";
    pumpStatus.style.color = data.v3 === 1 ? "#4caf50" : "#d32f2f";

    const gateStatus = document.getElementById("gate-status");
    gateStatus.innerText = data.v4 === 1 ? "Open" : "Close";
    gateStatus.style.color = data.v4 === 1 ? "#4caf50" : "#d32f2f";
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Panggil fungsi fetchData setiap 1 detik untuk update data secara otomatis
setInterval(fetchData, 1000);

// Panggil pertama kali saat halaman dimuat
fetchData();
