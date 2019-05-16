export class FormatUtils {
  static dataToDatePicker(data: string): string {
    if (!data) {
      return null;
    } else {
      return data.substr(6, 4) + '-' + data.substr(3, 2) + '-' + data.substr(0, 2);
    }
  }

  static datePickerToData(datePicker: string): string {
    if (!datePicker) {
      return null;
    } else {
      return datePicker.substr(8, 2) + '/' + datePicker.substr(5, 2) + '/' + datePicker.substr(0, 4);
    }
  }

  static formatMoney(valor: number): string {
    if (!valor) {
      return '0,00';
    }

    var formatter = new Intl.NumberFormat('pt-BR', {
      style: 'decimal',
      currency: 'BRL',
      minimumFractionDigits: 2,
    });

    return formatter.format(valor);
  }

  static formatNumberOneDigit(valor: number): string {
    if (!valor) {
      return '0,0';
    }

    var formatter = new Intl.NumberFormat('pt-BR', {
      style: 'decimal',
      currency: 'BRL',
      minimumFractionDigits: 1,
    });

    return formatter.format(valor);
  }

  /**
   * Preenche uma string com um caractere à esquerda
   * @param source String original
   * @param padWith String a preencher
   * @param length Tamanho total
   */
  static fill(source, padWith, length) {
    if (!source) {
      source = '';
    }
    while (source.toString().length < length) {
      source = padWith + source;
    }
    return source;
  }

}
