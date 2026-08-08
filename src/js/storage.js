const STORAGE_KEY = 'market_urunler_db';

// Varsayılan mock veriler
const varsayilanUrunler = [
    { id: '1', ad: 'Coca Cola 1L', barkod: '869000000001', fiyat: 35.00, stok: 24 },
    { id: '2', ad: 'Ekmek 200g', barkod: '869000000002', fiyat: 10.00, stok: 50 },
    { id: '3', ad: 'Ülker Çikolatalı Gofret', barkod: '869000000003', fiyat: 15.00, stok: 100 }
];

function urunleriGetir() {
    const veriler = localStorage.getItem(STORAGE_KEY);
    if (!veriler) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(varsayilanUrunler));
        return varsayilanUrunler;
    }
    return JSON.parse(veriler);
}

function urunleriKaydet(urunler) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(urunler));
}

function urunEkleVeyaGuncelle(urun) {
    let urunler = urunleriGetir();
    const index = urunler.findIndex(u => u.barkod === urun.barkod);
    
    if (index !== -1) {
        urunler[index] = { ...urunler[index], ...urun };
    } else {
        urun.id = Date.now().toString();
        urunler.push(urun);
    }
    
    urunleriKaydet(urunler);
}

function urunSil(barkod) {
    let urunler = urunleriGetir();
    urunler = urunler.filter(u => u.barkod !== barkod);
    urunleriKaydet(urunler);
}