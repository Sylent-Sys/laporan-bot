export default class UtilService {
  formatCurrency(value: number) {
    return Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(value);
  }
}
