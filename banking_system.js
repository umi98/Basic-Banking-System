class BankingSystem extends BankAccount {
    #pin = "p";
    #riwayat = [];

    constructor(saldo, pin) {
        super(saldo);
        this.isPinCorrect(pin);
    }

    isPinCorrect = (pin) => {
        if (this.#pin !== pin) {
            this.disableTampilan();
            alert("PIN salah! Harap muat ulang halaman ini");
            throw new Error("PIN salah! Harap muat ulang halaman ini");
        }
        return "Login success";
    }

    tampilSaldo() {
        super.tampilSaldo();
        const tabel = document.querySelector('tbody');
        let r = this.#riwayat[this.#riwayat.length-1]
        tabel.innerHTML += `<tr><td>${r.waktu}</td>
            <td>${r.aktivitas}</td>
            <td>${r.mutasi}</td></tr>`;
    }

    #disableTampilan() {
        document.getElementById("btnTambah").disabled = true;
        document.getElementById("btnKurang").disabled = true;
    }

    #tundaTampilan() {
        document.getElementById("saldo").innerHTML = "Harap tunggu...";
        this.#disableTampilan();
        setTimeout(() => {
            document.getElementById("btnTambah").disabled = false;
            document.getElementById("btnKurang").disabled = false;
            this.tampilSaldo();
        }, 1000);
    }

    deposit() {
        let amount = Number(prompt("Masukkan jumlah uang: "));
        if (!isNaN(amount) && amount > 0) {
            super.deposit(amount);
            this.#tambahRiwayat("Tambah saldo", amount);
            this.#tundaTampilan();
        } else {
            alert("Saldo harus angka atau tidak boleh 0");
        }        
    }

    withdraw() {
        let amount = Number(prompt("Masukkan jumlah uang: "));
        if (!isNaN(amount)) {
            if (this.saldo > amount) {
                super.withdraw(amount);
                this.#tambahRiwayat("Ambil saldo", amount);
                this.#tundaTampilan();
            } else {
                alert("Mutasi tidak boleh lebih besar dari saldo");
            }
        } else {
            alert("Saldo harus angka");
        }  
    }

    #tambahRiwayat(jenis, amount) {
        let tanggal = new Date();
        let obj = {
            aktivitas: jenis,
            mutasi: amount,
            waktu: tanggal.toString()
        }
        this.#riwayat.push(obj);
    }

}

const pin = prompt("Masukkan PIN rekening!");
const operasi = new BankingSystem(0, pin);
