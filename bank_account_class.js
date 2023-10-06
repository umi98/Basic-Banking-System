class BankAccount {
    constructor(saldo) {
        this.saldo = saldo;
    }

    tampilSaldo(){
        document.getElementById("saldo").innerHTML = this.saldo;
        console.log(this.saldo);
    }

    deposit(amount){
        this.saldo += amount;
    }

    withdraw(amount){
        this.saldo -= amount;
    }
}
