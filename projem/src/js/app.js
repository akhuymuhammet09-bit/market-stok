document.addEventListener('DOMContentLoaded', () => {
    urunListesiniCiz();
});

function urunListesiniCiz(filtre = '') {
    const urunler = urunleriGetir();
    const listeEl = document.getElementById('urunListesi');
    listeEl.innerHTML = '';

    const filtrelenmis = urunler.filter(u => 
        u.ad.toLowerCase().includes(filtre.toLowerCase()) || 
        u.barkod.includes(filtre)
    );

    if (filtrelenmis.length === 0) {
        listeEl.innerHTML = '<div style="text-align:center; color:#94a3b8; padding:15px;">Ürün bulunamadı.</div>';
        return;
    }

    filtrelenmis.forEach(u => {
        const item = document.createElement('div');
        item.className = 'product-item';
        item.innerHTML = `
            <div class="product-info">
                <div class="title">${u.ad}</div>
                <div class="details">Barkod: ${u.barkod} | Stok: ${u.stok} Adet</div>
            </div>
            <div style="display:flex; align-items:center; gap:10px;">
                <div class="product-price">${parseFloat(u.fiyat).toFixed(2)} ₺</div>
                <button onclick="urunSilTetikle('${u.barkod}')" style="background:none; border:none; color:#ef4444; cursor:pointer;">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        `;
        listeEl.appendChild(item);
    });
}

function urunAramaYap() {
    const query = document.getElementById('urunAra').value;
    urunListesiniCiz(query);
}

function urunSilTetikle(barkod) {
    if (confirm('Bu ürünü silmek istediğinize emin misiniz?')) {
        urunSil(barkod);
        urunListesiniCiz();
    }
}