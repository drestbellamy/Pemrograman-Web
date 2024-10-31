<?php
function segitigaSamaSisiTerbalik($tinggi) {
    for ($i = $tinggi; $i >= 1; $i--) {
        // Mengatur spasi
        for ($j = $tinggi; $j > $i; $j--) {
            echo " ";
        }
        // Mengatur bintang
        for ($k = 1; $k <= (2 * $i - 1); $k++) {
            echo "*";
        }
        echo "\n"; // Pindah ke baris baru
    }
}

$tinggi = 5; // Tinggi segitiga
echo "Segitiga Sama Sisi Terbalik:\n";
segitigaSamaSisiTerbalik($tinggi);
?>
