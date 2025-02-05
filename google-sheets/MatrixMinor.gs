//Обчислює мінор та алгебраїчне доповнення

/**
 * Обчислює мінор для заданого елемента матриці.
 * @param {Array} matrix - Матриця, з якої обчислюється мінор.
 * @param {number} row - Номер рядка елемента (починаючи з 0).
 * @param {number} col - Номер стовпця елемента (починаючи з 0).
 * @return {number} Мінор матриці.
 */
function MINOR(matrix, row, col) {
  row = row - 1;
  col = col - 1;

  let subMatrix = matrix
    .filter((_, i) => i !== row)  // Видаляємо заданий рядок
    .map(r => r.filter((_, j) => j !== col));  // Видаляємо заданий стовпець

//  console.log('Підматриця для MINOR:', subMatrix);
  return DET(subMatrix);  // Обчислюємо визначник підматриці
}
/**
// функція для налагодження function MINOR(matrix, row, col) тестовими даними

function TEST_MINOR() {
  const matrix = [
    [5, 4, 3],
    [7, -2, 1],
    [3, -1, 6]
  ];

  const row = 2;
  const col = 2;

  const result = MINOR(matrix, row, col);
  console.log('Результат MINOR:', result);
}
**/

/**
 * Обчислює визначник для довільної матриці.
 * @param {Array} matrix - Матриця, для якої обчислюється визначник.
 * @return {number} Визначник матриці.
 */
function DET(matrix) {
  const size = matrix.length;

  if (size === 1) {
    return matrix[0][0];  // Визначник для матриці 1x1
  }

  if (size === 2) {
    // Визначник для матриці 2x2: ad - bc
    return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
  }

  let determinant = 0;
  for (let col = 0; col < size; col++) {
    determinant += Math.pow(-1, 0 + col) * matrix[0][col] * DET(getSubMatrix(matrix, 0, col));
  }
  return determinant;
}

/**
 * Повертає підматрицю без заданого рядка і стовпця.
 * @param {Array} matrix - Початкова матриця.
 * @param {number} row - Номер рядка, який треба видалити.
 * @param {number} col - Номер стовпця, який треба видалити.
 * @return {Array} Підматриця.
 */
function getSubMatrix(matrix, row, col) {
  return matrix
    .filter((_, i) => i !== row)  // Видаляємо рядок
    .map(r => r.filter((_, j) => j !== col));  // Видаляємо стовпець
}

/**
 * Обчислює алгебраїчне доповнення для заданого елемента матриці.
 * @param {Array} matrix - Початкова матриця.
 * @param {number} row - Номер рядка елемента (починаючи з 0).
 * @param {number} col - Номер стовпця елемента (починаючи з 0).
 * @return {number} Алгебраїчне доповнення.
 */
function COMP(matrix, row, col) {
  const minor = MINOR(matrix, row, col);  // Обчислюємо мінор
  return Math.pow(-1, row + col) * minor;  // Застосовуємо знак (-1)^(i+j)
}
