let html5QrcodeScanner = null;

function kameraAc() {
    const container = document.getElementById('cameraContainer');
    container.classList.remove('hidden');

    if (!html5QrcodeScanner) {
        html5QrcodeScanner = new Html5Qrcode("reader");
    }

    html5QrcodeScanner.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: { width: 250, height: 150 } },
        (decodedText) => {
            barkodBulundu(decodedText);
            kameraKapat();
        },
        (errorMessage) => {
            // Tarama sırasındaki anlık hatalar yutulur
        }
    ).catch(err => {
        alert("Kamera erişim hatası: " + err);
        container.classList.add('hidden');
    });
}

function kameraKapat() {
    if (html5QrcodeScanner) {
        html5QrcodeScanner.stop().then(() => {
            document.getElementById('cameraContainer').classList.add('hidden');
        }).catch(err => console.error(err));
    }
}

function barkodBulundu(barkod) {
    const urunler = urunleriGetir();
    const urun = urunler.find(u => u.barkod === barkod);

    if (urun) {
        alert(`ÜRÜN BULUNDU:\n\nAdı: ${urun.ad}\nBarkod: ${urun.barkod}\nFiyat: ${urun.fiyat} ₺\nStok: ${urun.stok} Adet`);
    } else {
        const ad = prompt(`[${barkod}] Barkodlu ürün sistemde bulunamadı. Eklemek için Ürün Adını girin:`);
        if (ad) {
            const fiyat = parseFloat(prompt("Fiyat girin (₺):") || 0);
            const stok = parseInt(prompt("Stok miktarı girin:") || 0);
            urunEkleVeyaGuncelle({ ad, barkod, fiyat, stok });
            urunListesiniCiz();
        }
    }
}