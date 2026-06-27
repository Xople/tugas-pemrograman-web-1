function formatRupiah(angka) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(angka);
}

function hitungBelanja() {
  // Contoh penggunaan variabel var, let, const
  var nama = document.getElementById('namaPembeli').value;
  let hargaBuku = Number(document.getElementById('hargaBuku').value);
  let jumlahBuku = Number(document.getElementById('jumlahBuku').value);
  let hargaPulpen = Number(document.getElementById('hargaPulpen').value);
  let jumlahPulpen = Number(document.getElementById('jumlahPulpen').value);
  const diskonPersen = Number(document.getElementById('diskon').value) / 100;

  let totalSebelumDiskon = (hargaBuku * jumlahBuku) + (hargaPulpen * jumlahPulpen);
  let potongan = totalSebelumDiskon * diskonPersen;
  let totalSetelahDiskon = totalSebelumDiskon - potongan;
  let dapatDiskon = diskonPersen > 0;

  console.log('Nama Pembeli:', nama);
  console.log('Total sebelum diskon:', totalSebelumDiskon);
  console.log('Potongan:', potongan);
  console.log('Total setelah diskon:', totalSetelahDiskon);
  console.log('Apakah dapat diskon?', dapatDiskon);

  document.getElementById('hasilBelanja').innerHTML = `
    <strong>Nama Pembeli:</strong> ${nama}<br>
    <strong>Total sebelum diskon:</strong> ${formatRupiah(totalSebelumDiskon)}<br>
    <strong>Diskon:</strong> ${diskonPersen * 100}% (${formatRupiah(potongan)})<br>
    <strong>Total setelah diskon:</strong> ${formatRupiah(totalSetelahDiskon)}<br>
    <strong>Dapat diskon:</strong> ${dapatDiskon}
  `;
}

function cekLogin() {
  const usernameBenar = 'admin';
  const passwordBenar = '1234';

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const hasilLogin = document.getElementById('hasilLogin');

  if (username === usernameBenar && password === passwordBenar) {
    hasilLogin.className = 'result success';
    hasilLogin.innerHTML = '<strong>Selamat datang!</strong> Login berhasil.';
    console.log('Status login: sukses');
    window.alert('Login berhasil!');
  } else {
    hasilLogin.className = 'result danger';
    hasilLogin.innerHTML = '<strong>Login gagal!</strong> Username atau password salah.';
    console.log('Status login: gagal');
    window.alert('Login gagal!');
  }
}

function hitungNilai() {
  let tugas = Number(document.getElementById('nilaiTugas').value);
  let uts = Number(document.getElementById('nilaiUts').value);
  let uas = Number(document.getElementById('nilaiUas').value);
  let bonus = Number(document.getElementById('bonus').value);

  // Operator aritmatika
  let rataRata = (tugas + uts + uas) / 3;

  // Operator penugasan
  let nilaiAkhir = rataRata;
  nilaiAkhir += bonus;

  // Operator pembanding
  let status = nilaiAkhir >= 75 ? 'Lulus' : 'Tidak Lulus';

  console.log('Nilai tugas:', tugas);
  console.log('Nilai UTS:', uts);
  console.log('Nilai UAS:', uas);
  console.log('Rata-rata:', rataRata);
  console.log('Nilai akhir:', nilaiAkhir);
  console.log('Status:', status);

  document.getElementById('hasilNilai').innerHTML = `
    <strong>Nilai Tugas:</strong> ${tugas}<br>
    <strong>Nilai UTS:</strong> ${uts}<br>
    <strong>Nilai UAS:</strong> ${uas}<br>
    <strong>Rata-rata:</strong> ${rataRata.toFixed(2)}<br>
    <strong>Nilai Akhir + Bonus:</strong> ${nilaiAkhir.toFixed(2)}<br>
    <strong>Status:</strong> ${status}
  `;
}
