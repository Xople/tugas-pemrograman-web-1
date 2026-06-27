const display = document.getElementById('display');
const historyText = document.getElementById('history');

function appendValue(value) {
  if (display.value === '0' || display.value === 'Error') {
    display.value = '';
  }

  display.value += value;
}

function clearDisplay() {
  display.value = '0';
  historyText.textContent = 'Riwayat akan tampil di sini';
}

function deleteLast() {
  if (display.value === 'Error') {
    display.value = '0';
    return;
  }

  display.value = display.value.slice(0, -1) || '0';
}

function formatExpression(expression) {
  return expression
    .replaceAll('*', '×')
    .replaceAll('/', '÷')
    .replaceAll('-', '−');
}

function normalizePercent(expression) {
  // 50% akan dihitung sebagai 50/100
  return expression.replace(/(\d+(\.\d+)?)%/g, '($1/100)');
}

function calculate() {
  try {
    const expression = display.value;

    // Hanya izinkan angka, operator, persen, titik, spasi, dan tanda kurung.
    if (!/^[0-9+\-*/%.()\s]+$/.test(expression)) {
      throw new Error('Input tidak valid');
    }

    const finalExpression = normalizePercent(expression);
    const result = Function(`return ${finalExpression}`)();

    if (!Number.isFinite(result)) {
      throw new Error('Hasil tidak valid');
    }

    historyText.textContent = `${formatExpression(expression)} =`;
    display.value = Number.isInteger(result) ? result : result.toFixed(6).replace(/0+$/, '').replace(/\.$/, '');
  } catch (error) {
    display.value = 'Error';
    historyText.textContent = 'Ekspresi tidak valid';
  }
}

// Dukungan keyboard agar kalkulator lebih mudah digunakan.
document.addEventListener('keydown', function (event) {
  const key = event.key;

  if (/^[0-9+\-*/%.()]$/.test(key)) {
    appendValue(key);
  } else if (key === 'Enter') {
    calculate();
  } else if (key === 'Backspace') {
    deleteLast();
  } else if (key === 'Escape') {
    clearDisplay();
  }
});
