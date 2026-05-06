function injectMainContent(fragmentHtml, includeBackButton) {
  if (includeBackButton === false) {
    document.getElementById('app-content').innerHTML = fragmentHtml;
    return;
  }
  var backButtonHtml = '<button class="close-btn" onclick="closeApp()">Back</button>';
  document.getElementById('app-content').innerHTML = backButtonHtml + fragmentHtml;
}

function openApp(appUrl) {
  const viewer = document.getElementById('app-viewer');
  const grid = document.querySelector('.app-grid');
  viewer.style.display = 'block';
  grid.style.display = 'none';
  fetch(appUrl)
    .then(function (res) {
      if (!res.ok) {
        throw new Error('Gagal memuat: ' + appUrl + ' (' + res.status + ')');
      }
      return res.text();
    })
    .then(function (html) {
      injectMainContent(html);
    })
    .catch(function () {
      injectMainContent(
        '<section><h2>Konten tidak ditemukan</h2><p>Halaman menu gagal dimuat. Coba refresh halaman.</p></section>'
      );
    });
  viewer.onclick = function (e) {
    if (e.target === viewer) {
      closeApp();
    }
  };
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function slideImagesHtml(slide, slideTitle) {
  var paths = slide.images || (slide.image ? [slide.image] : []);
  if (!paths.length) return '';
  var figures = paths
    .map(function (src, i) {
      return (
        '<figure class="slideshow-slide-figure">' +
        '<img src="' +
        escapeHtml(src) +
        '" alt="' +
        escapeHtml(slideTitle + ' — ilustrasi ' + (i + 1)) +
        '" loading="lazy" />' +
        '</figure>'
      );
    })
    .join('');
  return '<div class="slideshow-slide-figures">' + figures + '</div>';
}

function slideBodyHtml(slide) {
  if (slide.paragraphs && slide.paragraphs.length) {
    return slide.paragraphs
      .map(function (p) {
        return '<p>' + escapeHtml(p) + '</p>';
      })
      .join('');
  }
  return '<p>' + escapeHtml(slide.body || '') + '</p>';
}

/** Daftar proyek: id harus cocok dengan onclick di apps/projects.html */
var PROJECT_PORTFOLIO = [
  {
    id: 'odigi',
    title: 'ODIGI',
    slides: [
      {
        title: 'Overview Project',
        images: ['img/login.png', 'img/dashboard.png'],
        body:
          'Halaman masuk ODIGI memakai tema BPR Go Digital: kolom ilustrasi merek dan kolom formulir username, kata sandi, serta tombol Masuk. Setelah login, dashboard Super Administrator menampilkan sambutan, filter tahun, dan kartu KPI jumlah pengajuan (masuk, dalam proses, disetujui, ditolak). Pada cuplikan yang sama terlihat grafik rekapitulasi realisasi per bulan beserta tabel rincian nominal per jenis kredit. Ringkasnya, gambar pertama adalah pintu akses, gambar kedua agregat monitoring operasional.',
      },
      {
        title: 'Alur Sistem',
        images: ['img/dashboard.png', 'img/menuutama.png'],
        body:
          'Cuplikan dashboard tetap berfokus pada ringkasan dan visualisasi realisasi agar pengawas cepat membaca tren. Layar berikutnya adalah modul Data Pengajuan berjudul Register Data untuk registrasi SLIK OJK dan pengajuan, dengan filter nama, status, dan jenis serta tabel arsip nomor registrasi hingga tanggal realisasi. Tombol Tambah Data, Hapus, dan pencarian arsip mendukung operasi harian. Sidebar yang sama menghubungkan Dashboard, Data Pengajuan, dan Manajemen Pengguna sehingga alur dari ikhtisar ke daftar transaksi nyata terlihat jelas.',
      },
      {
        title: 'Fitur Utama',
        images: ['img/menuutama.png', 'img/fitur.png'],
        body:
          'Register Data menampilkan daftar pengajuan yang bisa difilter, ditambah, dan dikelola dalam bentuk tabel terstruktur. Detail Register membuka satu pengajuan (contoh badan usaha) dengan tab kerja Detail, Data, Bank, SLIK, dan Komite menuju penyelesaian. Kartu informasi merangkum data dasar, badan usaha, pengajuan kredit, hingga blok realisasi dan nominal disetujui. Dengan demikian, cuplikan kiri adalah manajemen koleksi pengajuan, kanan adalah drill-down lengkap per nasabah.',
      },
      {
        title: 'Kontribusi Saya (Frontend)',
        images: ['img/manajemen.png', 'img/komite.png'],
        body:
          'Saya bertanggung jawab di sisi frontend untuk modul Manajemen Pengguna dan Komite sesuai dua cuplikan ini. Di manajemen pengguna saya menyusun daftar, formulir, dan pengaturan peran agar mudah dipakai admin. Di komite saya menata tampilan persetujuan bertingkat.',
      },
      {
        title: 'Detail Kontribusi',
        images: ['img/manajemen.png', 'img/komite.png'],
        body:
          'Pada layar manajemen pengguna saya menangani CRUD user dan penetapan hak akses berbasis role pada tabel serta form. Pada komite saya membedakan tampilan dan aksi tiap level dengan conditional rendering agar tidak ada fitur di luar wewenang role. State loading, validasi input, dan penanganan respons backend saya rapikan untuk kedua modul tersebut.',
      },
    ],
  },
  {
    id: 'retinascan-dr',
    title: 'RetinoScan — Diabetic Retinopathy',
    slides: [
      {
        title: 'Gambaran Proyek',
        images: ['img/halamandashboard.png'],
        body:
          'RetinoScan adalah aplikasi web untuk membantu mendeteksi Diabetic Retinopathy (kerusakan retina akibat diabetes) dari foto belakang mata. Cuplikan ini menampilkan dasbor utama: ringkasan jumlah pengguna, dokter, pasien, dan pemeriksaan dalam bentuk kartu warna. Menu samping menghubungkan pengelolaan data dengan halaman klasifikasi dan riwayat pemeriksaan. Pengguna tidak perlu memahami detail teknis model untuk mulai melihat gambaran sistem secara keseluruhan.',
      },
      {
        title: 'Fitur untuk Pengguna',
        images: ['img/klasifikasi.png'],
        body:
          'Di halaman Klasifikasi, pengguna mengunggah citra retina atau memilih file dari perangkat, lalu memilih model AI (contoh DenseNet121) dari daftar. Ada juga penautan ke dokter, pasien, dan perawat agar setiap pemeriksaan tercatat rapi. Tombol “Upload and Analyze” menjalankan analisis otomatis. Dengan alur ini, petugas medis mendapat bantu tanpa mengolah gambar secara manual.',
      },
      {
        title: 'Peran Saya',
        images: ['img/halamandashboard.png', 'img/tabelmodel.png'],
        body:
          'Saya terlibat membangun dan mengevaluasi model klasifikasi, lalu merangkum hasil uji agar tim bisa memilih model yang masuk ke RetinoScan. Cuplikan kiri menunjukkan sistem secara utuh (dasbor, menu klasifikasi, riwayat) supaya kerja model tidak lepas dari konteks aplikasi. Cuplikan kanan adalah ringkasan angka perbandingan model yang kami pakai seperti lembar Excel. Dengan cara ini, kontribusi saya menjembatani “berapa baik model di data uji” dengan keputusan fitur di produk.',
      },
      {
        title: 'Perbandingan Model (Ringkas)',
        images: ['img/tabelmodel.png'],
        body:
          'Beberapa model dilatih dengan skenario yang sama, lalu dibandingkan lewat angka di tabel: seberapa sering benar (akurasi), ketepatan positif, kelengkapan temuan, dan skor F1 sebagai ringkasan keseimbangan. Pada data uji kami, ResNet50 menempati akurasi tertinggi, sementara VGG16 tertinggal jauh sehingga tidak ideal dipilih. Tabel ini memudahkan tim melihat siapa “juara” dan siapa yang perlu diperbaiki atau ditinggalkan.',
      },
      {
        title: 'Grafik Latihan Model',
        images: ['img/ResNet50_accuracy_loss_plot.png', 'img/DenseNet121_accuracy_loss_plot.png'],
        paragraphs: [
          'Grafik menampilkan dua kurva: biru untuk data latihan (model berlatih dengan contoh yang sudah dikenal) dan oranye untuk data validasi (contoh yang dipakai seperti “ujian mendadak”). Pada ResNet50 dan DenseNet121, kurva biru menunjukkan loss turun dan akurasi naik tajam, sedangkan kurva oranye lebih datar atau loss-nya justru memburuk di akhir.',
          'Pola ini sering disebut overfitting secara sederhana: model terlalu “hafal” data latihan sehingga belum sebaik itu pada situasi baru. Temuan ini membantu kami menjaga ekspektasi: angka bagus di latihan tidak otomatis sama dengan kinerja di lapangan, sehingga perlu uji lanjutan dan aturan penggunaan yang aman.',
        ],
      },
      {
        title: 'Hasil di Aplikasi',
        images: ['img/hasilklasifikasi.png'],
        body:
          'Setelah analisis, sistem menampilkan halaman hasil: prediksi tingkat keparahan (misalnya Proliferative DR) beserta bilah persentase kepercayaan untuk tiap kelas. Informasi dokter, pasien, dan perawat ikut tampil agar konteks pemeriksaan jelas. Hasil evaluasi model sebelumnya dipakai untuk memilih model yang lebih andal di tahap ini. Pendekatan ini mengarahkan kami: akurasi tinggi saja tidak cukup tanpa tampilan yang mudah dibaca dan proses yang konsisten.',
      },
    ],
  },
];

function reloadProjectsApp() {
  fetch('apps/projects.html')
    .then(function (res) {
      if (!res.ok) {
        throw new Error('Gagal memuat daftar proyek (' + res.status + ')');
      }
      return res.text();
    })
    .then(function (html) {
      injectMainContent(html);
    })
    .catch(function () {
      injectMainContent(
        '<section><h2>Konten tidak ditemukan</h2><p>Daftar proyek gagal dimuat. Coba refresh halaman.</p></section>'
      );
    });
}

function openProjectSlideShow(projectId) {
  var project = PROJECT_PORTFOLIO.filter(function (p) {
    return p.id === projectId;
  })[0];
  if (!project) return;
  window.__projSlide = { projectId: projectId, index: 0 };
  renderProjectSlideShow();
}

function projectSlidePrev() {
  var st = window.__projSlide;
  if (!st || st.index < 1) return;
  st.index -= 1;
  renderProjectSlideShow();
}

function projectSlideNext() {
  var st = window.__projSlide;
  if (!st) return;
  var project = PROJECT_PORTFOLIO.filter(function (p) {
    return p.id === st.projectId;
  })[0];
  if (!project || st.index >= project.slides.length - 1) return;
  st.index += 1;
  renderProjectSlideShow();
}

function renderProjectSlideShow() {
  var st = window.__projSlide;
  var project = PROJECT_PORTFOLIO.filter(function (p) {
    return p.id === st.projectId;
  })[0];
  if (!project) return;
  var slide = project.slides[st.index];
  var n = st.index + 1;
  var total = project.slides.length;
  var prevDisabled = st.index === 0 ? ' disabled' : '';
  var nextDisabled = st.index >= project.slides.length - 1 ? ' disabled' : '';

  var frag =
    '<section class="project-slideshow">' +
    '<div class="slideshow-top-bar">' +
    '<button type="button" class="slideshow-back-list" onclick="reloadProjectsApp()">← Daftar proyek</button>' +
    '<button type="button" class="close-btn close-btn--menu" onclick="closeApp()">back to menu</button>' +
    '</div>' +
    '<p class="slideshow-project-title">' +
    escapeHtml(project.title) +
    '</p>' +
    '<div class="slideshow-slide">' +
    '<h3>' +
    escapeHtml(slide.title) +
    '</h3>' +
    slideImagesHtml(slide, slide.title) +
    '<div class="slideshow-slide-body">' +
    slideBodyHtml(slide) +
    '</div>' +
    '</div>' +
    '<div class="slideshow-controls">' +
    '<button type="button" class="slideshow-nav-btn" onclick="projectSlidePrev()"' +
    prevDisabled +
    '>Sebelumnya</button>' +
    '<span class="slideshow-counter">' +
    n +
    ' / ' +
    total +
    '</span>' +
    '<button type="button" class="slideshow-nav-btn" onclick="projectSlideNext()"' +
    nextDisabled +
    '>Berikutnya</button>' +
    '</div>' +
    '</section>';

  injectMainContent(frag, false);
}


function closeApp() {
  const viewer = document.getElementById('app-viewer');
  const grid = document.querySelector('.app-grid');
  viewer.style.display = 'none';
  grid.style.display = 'grid';
  document.getElementById('app-content').innerHTML = '';
}

// Script Jam
function updateClock() {
  const now = new Date();
  let h = now.getHours();
  let m = now.getMinutes();
  if (h<10) h = '0'+h;
  if (m<10) m = '0'+m;
  document.getElementById('clock').innerText = h + ':' + m;
}
setInterval(updateClock, 1000);
updateClock();

// Fitur Search
const searchInput = document.querySelector('.search-bar input');
if (searchInput) {
  searchInput.addEventListener('keyup', function(e) {
    const value = this.value.toLowerCase();
    document.querySelectorAll('.app-grid .app').forEach(function(app) {
      const appText = app.innerText.toLowerCase();
      if(appText.indexOf(value) > -1) {
        app.style.display = '';
      } else {
        app.style.display = 'none';
      }
    });
  });
}
