<?php

function printNumbers($n) {
    // Memastikan n adalah bilangan bulat positif
    if ($n < 1) {
        echo "Input harus bilangan bulat positif." . PHP_EOL;
        return;
    }
    
    // Melakukan perulangan dari 1 hingga n
    for ($i = 1; $i <= $n; $i++) {
        if ($i % 4 == 0 && $i % 6 == 0) {
            echo "Pemrograman Website 2024" . PHP_EOL;
        } elseif ($i % 5 == 0) {
            echo "2024" . PHP_EOL;
        } elseif ($i % 4 == 0) {
            echo "Pemrograman" . PHP_EOL;
        } elseif ($i % 6 == 0) {
            echo "Website" . PHP_EOL;
        } else {
            echo $i . PHP_EOL;
        }
    }
}

// Contoh penggunaan fungsi
$n = 30; // Ubah nilai ini sesuai keinginan
printNumbers($n);

?>