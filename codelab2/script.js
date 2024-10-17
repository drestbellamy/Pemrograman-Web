function penjumlahan() {
    var bilangan_pertama = parseInt(document.getElementById("bilangan_pertama").value);
    var bilangan_kedua = parseInt(document.getElementById("bilangan_kedua").value);
    var hasil = bilangan_pertama + bilangan_kedua;
    document.getElementById("hasil").innerHTML = hasil;
}

function resetForm() {
    document.getElementById("bilangan_pertama").value = "";
    document.getElementById("bilangan_kedua").value = "";
    document.getElementById("hasil").innerHTML = "";
}