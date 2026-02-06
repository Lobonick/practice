class AlineaDato {
  
    static truncar(str, maxLength = 20) {
        if (str.length <= maxLength) return str;
        return str.slice(0, maxLength - 3) + '...';
    }

    static alinearIzquierda(str, width) {
        return str.padEnd(width, ' ');
    }

    static alinearDerecha(str, width) {
        return str.padStart(width, ' ');
    }

    static formatearNumero(num, width, decimals = 2) {
        return this.alinearDerecha(num.toFixed(decimals), width);
    }

    static formatearPrecio(precio, width) {
        return this.alinearDerecha('$' + precio.toFixed(2), width);
    }


  }

export default AlineaDato;




