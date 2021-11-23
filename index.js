const readline = require('readline');
const {
  menuProduct,
  newProduct,
  changeProduct,
  deleteProduct,
  getInput,
} = require('./service');

product();

async function product() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  let input;
  const menuInputs = ['1', '2', '3', '4', '5'];
  do {
    console.log('1. Меню: ');
    console.log('2. Добавить новый товар: ');
    console.log('3. Изменить товар: ');
    console.log('4. Удалить товар: ');
    console.log('5. Выход из меню: ');

    input = await getInput(rl);
    while (!menuInputs.includes(input)) {
      console.log('Ошибка. Выберите действие из списка:');
      input = await getInput(rl);
    }

    switch (input) {
      case '1':
        menuProduct();
        break;

      case '2':
        await newProduct(rl);
        break;

      case '3':
        await changeProduct(rl);
        break;

      case '4':
        await deleteProduct(rl);
        break;
    }
  } while (input !== '5');
  rl.close();
}
