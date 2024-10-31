<?php
function segitigaSamaSisiNormal($tinggi) {
    for ($i = 1; $i <= $tinggi; $i++) {
        // Mengatur spasi
        for ($j = $i; $j < $tinggi; $j++) {
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
echo "Segitiga Sama Sisi Normal:\n";
segitigaSamaSisiNormal($tinggi);
?>
