let mahasiswa = [
  { nim: '231011450001', nama: 'Ahmad Fauzi', jurusan: 'Teknik Informatika', fakultas: 'Ilmu Komputer' },
  { nim: '231011450002', nama: 'Siti Aminah', jurusan: 'Sistem Informasi', fakultas: 'Ilmu Komputer' }
];
let editIndex = -1;

function ambilInput() {
  return {
    nim: document.getElementById('nim').value.trim(),
    nama: document.getElementById('nama').value.trim(),
    jurusan: document.getElementById('jurusan').value,
    fakultas: document.getElementById('fakultas').value
  };
}

function validasi(data) {
  if (!data.nim || !data.nama || !data.jurusan || !data.fakultas) {
    alert('Semua field wajib diisi!');
    return false;
  }
  return true;
}

function tambahMahasiswa() {
  const data = ambilInput();
  if (!validasi(data)) return;

  const nimSudahAda = mahasiswa.some(item => item.nim === data.nim);
  if (nimSudahAda) {
    alert('NIM sudah terdaftar!');
    return;
  }

  mahasiswa.push(data);
  tampilkanMahasiswa();
  resetForm();
}

function editMahasiswa(index) {
  const data = mahasiswa[index];
  document.getElementById('nim').value = data.nim;
  document.getElementById('nama').value = data.nama;
  document.getElementById('jurusan').value = data.jurusan;
  document.getElementById('fakultas').value = data.fakultas;

  editIndex = index;
  document.getElementById('btnTambah').disabled = true;
  document.getElementById('btnUpdate').disabled = false;
}

function updateMahasiswa() {
  if (editIndex === -1) return;

  const data = ambilInput();
  if (!validasi(data)) return;

  const nimSudahDipakai = mahasiswa.some((item, index) => item.nim === data.nim && index !== editIndex);
  if (nimSudahDipakai) {
    alert('NIM sudah dipakai mahasiswa lain!');
    return;
  }

  mahasiswa[editIndex] = data;
  tampilkanMahasiswa();
  resetForm();
}

function hapusMahasiswa(index) {
  if (confirm('Yakin ingin menghapus data ini?')) {
    mahasiswa.splice(index, 1);
    tampilkanMahasiswa();
  }
}

function resetForm() {
  document.getElementById('nim').value = '';
  document.getElementById('nama').value = '';
  document.getElementById('jurusan').value = '';
  document.getElementById('fakultas').value = '';
  editIndex = -1;
  document.getElementById('btnTambah').disabled = false;
  document.getElementById('btnUpdate').disabled = true;
}

function tampilkanMahasiswa() {
  const tbody = document.getElementById('tabelMahasiswa');
  tbody.innerHTML = '';

  mahasiswa.forEach((item, index) => {
    tbody.innerHTML += `
      <tr>
        <td>${index + 1}</td>
        <td>${item.nim}</td>
        <td>${item.nama}</td>
        <td>${item.jurusan}</td>
        <td>${item.fakultas}</td>
        <td>
          <button class="btn-aksi btn-edit" onclick="editMahasiswa(${index})">Edit</button>
          <button class="btn-aksi btn-delete" onclick="hapusMahasiswa(${index})">Delete</button>
        </td>
      </tr>
    `;
  });
}

tampilkanMahasiswa();
