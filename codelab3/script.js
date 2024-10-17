const form = document.querySelector('form');
const alert = document.querySelector('.alert');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const nama = document.querySelector('input[name="nama"]').value;
  const email = document.querySelector('input[name="email"]').value;
  const katasandi = document.querySelector('input[name="katasandi"]').value;

  if (nama === '' || email === '' || katasandi === '') {
    alert.style.display = 'block';
  } else {
    alert.style.display = 'none';
    // kode untuk mengirimkan data ke server
  }
});