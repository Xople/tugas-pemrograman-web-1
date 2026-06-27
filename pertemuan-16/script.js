const DB_KEY = 'db_mahasiswa_pertemuan_16';
const SESSION_KEY = 'session_login_pertemuan_16';
let editId = null;

function getDatabase() {
  const data = localStorage.getItem(DB_KEY);
  if (data) return JSON.parse(data);

  const defaultData = [
    { id: 1, nim: '231011450099', nama: 'Solehudin Thaib', jurusan: 'Teknik Informatika', email: 'solehudin@example.com' },
    { id: 2, nim: '231011450100', nama: 'Budi Santoso', jurusan: 'Sistem Informasi', email: 'budi@example.com' }
  ];
  localStorage.setItem(DB_KEY, JSON.stringify(defaultData));
  return defaultData;
}

function saveDatabase(data) {
  localStorage.setItem(DB_KEY, JSON.stringify(data));
}

function login() {
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();
  const message = document.getElementById('loginMessage');

  if (username === 'admin' && password === 'admin123') {
    localStorage.setItem(SESSION_KEY, 'true');
    message.className = 'message success';
    message.textContent = 'Login berhasil!';
    showApp();
  } else {
    message.className = 'message error';
    message.textContent = 'Username atau password salah!';
  }
}

function logout() {
  localStorage.removeItem(SESSION_KEY);
  document.getElementById('appPage').classList.add('hidden');
  document.getElementById('loginPage').classList.remove('hidden');
}

function showApp() {
  document.getElementById('loginPage').classList.add('hidden');
  document.getElementById('appPage').classList.remove('hidden');
  renderMahasiswa();
}

function ambilForm() {
  return {
    nim: document.getElementById('nim').value.trim(),
    nama: document.getElementById('nama').value.trim(),
    jurusan: document.getElementById('jurusan').value.trim(),
    email: document.getElementById('email').value.trim()
  };
}

function validasiForm(data) {
  if (!data.nim || !data.nama || !data.jurusan || !data.email) {
    alert('Semua data wajib diisi!');
    return false;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    alert('Format email tidak valid!');
    return false;
  }

  return true;
}

function simpanMahasiswa() {
  const data = ambilForm();
  if (!validasiForm(data)) return;

  const mahasiswa = getDatabase();

  if (editId === null) {
    const nimAda = mahasiswa.some(item => item.nim === data.nim);
    if (nimAda) {
      alert('NIM sudah terdaftar!');
      return;
    }

    mahasiswa.push({ id: Date.now(), ...data });
  } else {
    const nimAda = mahasiswa.some(item => item.nim === data.nim && item.id !== editId);
    if (nimAda) {
      alert('NIM sudah dipakai mahasiswa lain!');
      return;
    }

    const index = mahasiswa.findIndex(item => item.id === editId);
    mahasiswa[index] = { id: editId, ...data };
  }

  saveDatabase(mahasiswa);
  resetForm();
  renderMahasiswa();
}

function editMahasiswa(id) {
  const mahasiswa = getDatabase();
  const data = mahasiswa.find(item => item.id === id);
  if (!data) return;

  document.getElementById('nim').value = data.nim;
  document.getElementById('nama').value = data.nama;
  document.getElementById('jurusan').value = data.jurusan;
  document.getElementById('email').value = data.email;
  document.getElementById('btnSimpan').textContent = 'Update';
  editId = id;
}

function hapusMahasiswa(id) {
  if (!confirm('Yakin ingin menghapus data ini?')) return;

  const mahasiswa = getDatabase().filter(item => item.id !== id);
  saveDatabase(mahasiswa);
  renderMahasiswa();
}

function resetForm() {
  document.getElementById('nim').value = '';
  document.getElementById('nama').value = '';
  document.getElementById('jurusan').value = '';
  document.getElementById('email').value = '';
  document.getElementById('btnSimpan').textContent = 'Simpan';
  editId = null;
}

function renderMahasiswa() {
  const keyword = document.getElementById('keyword')?.value.toLowerCase() || '';
  const mahasiswa = getDatabase().filter(item => {
    return item.nim.toLowerCase().includes(keyword) ||
      item.nama.toLowerCase().includes(keyword) ||
      item.jurusan.toLowerCase().includes(keyword) ||
      item.email.toLowerCase().includes(keyword);
  });

  const tbody = document.getElementById('tabelMahasiswa');
  tbody.innerHTML = '';

  mahasiswa.forEach((item, index) => {
    tbody.innerHTML += `
      <tr>
        <td>${index + 1}</td>
        <td>${item.nim}</td>
        <td>${item.nama}</td>
        <td>${item.jurusan}</td>
        <td>${item.email}</td>
        <td>
          <button class="btn-small btn-edit" onclick="editMahasiswa(${item.id})">Edit</button>
          <button class="btn-small btn-delete" onclick="hapusMahasiswa(${item.id})">Delete</button>
        </td>
      </tr>
    `;
  });
}

function fakeAjaxRequest(method, endpoint, payload = null) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        status: 200,
        method,
        endpoint,
        payload,
        data: getDatabase()
      });
    }, 400);
  });
}

async function getApiData() {
  const output = document.getElementById('apiOutput');
  output.textContent = 'Loading data via AJAX...';

  const response = await fakeAjaxRequest('GET', '/api/mahasiswa');
  output.textContent = JSON.stringify(response, null, 2);
}

if (localStorage.getItem(SESSION_KEY) === 'true') {
  showApp();
}
