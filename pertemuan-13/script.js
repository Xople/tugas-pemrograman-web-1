function loginIfElse() {
  const username = document.getElementById('loginUsername').value;
  const password = document.getElementById('loginPassword').value;

  if (username === 'admin' && password === '1234') {
    document.getElementById('hasilIfElse').innerHTML = 'Login berhasil, selamat datang Admin!';
    alert('Login berhasil!');
  } else {
    document.getElementById('hasilIfElse').innerHTML = 'Login gagal, coba lagi!';
    alert('Login gagal!');
  }
}

function kategoriHarga() {
  const harga = Number(document.getElementById('hargaBarang').value);
  let kategori;

  switch (true) {
    case harga <= 0:
      kategori = 'Harga tidak valid';
      break;
    case harga < 50000:
      kategori = 'Murah';
      break;
    case harga >= 50000 && harga <= 200000:
      kategori = 'Sedang';
      break;
    case harga > 200000:
      kategori = 'Mahal';
      break;
    default:
      kategori = 'Harga tidak valid';
  }

  document.getElementById('hasilSwitch').innerHTML = `Kategori: <strong>${kategori}</strong>`;
}

function hitungDiskon(harga, persen) {
  return harga - (harga * persen / 100);
}

function konversiSuhu(celcius) {
  return (celcius * 9 / 5) + 32;
}

function jalankanFunction() {
  const harga = Number(document.getElementById('hargaDiskon').value);
  const persen = Number(document.getElementById('persenDiskon').value);
  const celcius = Number(document.getElementById('suhuCelcius').value);

  const hargaSetelahDiskon = hitungDiskon(harga, persen);
  const fahrenheit = konversiSuhu(celcius);

  document.getElementById('hasilFunction').innerHTML = `
    Harga setelah diskon: <strong>Rp ${hargaSetelahDiskon.toLocaleString('id-ID')}</strong><br>
    ${celcius}°C = <strong>${fahrenheit.toFixed(2)}°F</strong>
  `;
}

function appendValue(value) {
  document.getElementById('display').value += value;
}

function clearDisplay() {
  document.getElementById('display').value = '';
}

function deleteLast() {
  const display = document.getElementById('display');
  display.value = display.value.slice(0, -1);
}

function calculate() {
  const display = document.getElementById('display');
  const expression = display.value;

  try {
    // Validasi sederhana supaya hanya karakter kalkulator yang dihitung
    if (!/^[0-9+\-*/.()\s]+$/.test(expression)) {
      throw new Error('Input tidak valid');
    }
    display.value = Function(`return ${expression}`)();
  } catch (error) {
    display.value = 'Error';
  }
}
