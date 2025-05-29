/**
 * Підносить матрицю до цілого степеня.
 * @param {Array} matrix - Квадратна матриця.
 * @param {number} power - Степінь, до якої підноситься матриця.
 * @return {Array} Результуюча матриця після піднесення до степеня.
 */
function MPOWER(matrix, power) {
  var result = matrix;


  for (var i = 1; i < power; i++) {
    result = multiplyMatrices(result, matrix);
  }

  return result;
}

/**
 * Перемножує дві матриці.
 * @param {Array} a - Перша матриця.
 * @param {Array} b - Друга матриця.
 * @return {Array} Результуюча матриця після множення.
 */
function multiplyMatrices(a, b) {
  var result = [];

  for (var i = 0; i < a.length; i++) {
    result[i] = [];
    for (var j = 0; j < b[0].length; j++) {
      var sum = 0;
      for (var k = 0; k < a[0].length; k++) {
        sum += a[i][k] * b[k][j]; // Обчислюємо суму добутків
      }
      result[i][j] = sum; // Записуємо елемент результату
    }
  }

  return result;
}