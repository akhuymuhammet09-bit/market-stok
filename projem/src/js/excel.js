function excelYukle(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(firstSheet);

        jsonData.forEach(row => {
            if (row["Barkod"] && row["Ad"]) {
                urunEkleVeyaGuncelle({
                    ad: String(row["Ad"]),
                    barkod: String(row["Barkod"]),
                    fiyat: parseFloat(row["Fiyat"] || 0),
                    stok: parseInt(row["Stok"] || 0)
                });
            }
        });

        urunListesiniCiz();
        alert("Excel başarıyla aktarıldı!");
    };
    reader.readAsArrayBuffer(file);
}

function excelIndir() {
    const urunler = urunleriGetir().map(u => ({
        "Ad": u.ad,
        "Barkod": u.barkod,
        "Fiyat": u.fiyat,
        "Stok": u.stok
    }));

    const worksheet = XLSX.utils.json_to_sheet(urunler);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Stok Listesi");
    XLSX.writeFile(workbook, "Stok_Listesi.xlsx");
}