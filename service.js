const fs = require('fs');
const file = 'data.json';

function readFile() {
  if (fs.existsSync(file)) {
    content = JSON.parse(fs.readFileSync(file));
  } else {
    fs.mkdirSync(dirPath, { recursive: true });
    fs.writeFileSync(file, '[]');
  }
  return content;
}

function menuProduct() {
  const product = readFile();
  product.forEach((data) => console.log(`${data.id}. ${data.product}`));
  console.log('\n');
}

async function newProduct(rl) {
  let content = readFile();
  let newProduct = {};
  let input;

  console.log('Введите номер товара:');
  input = await getInput(rl);
  newProduct.id = input;
  console.log('Введите название товара: ');
  input = await getInput(rl);
  newProduct.product = input;
  content.push(newProduct);

  let jsonContent = JSON.stringify(content, null, 2);
  fs.writeFileSync(file, jsonContent);

  console.log('Товар добавлен', content, '\n');
}

async function changeProduct(rl) {
  let content = readFile();
  console.log('Введите номер товара для изменения:');
  input = await getInput(rl);
  const findIndex = content.findIndex((data) => data.id == input);
  const updateProduct = content[findIndex];
  if (findIndex === -1) {
    console.log('Такого товара нет, попробуйте снова', '\n');
    return;
  } else {
    console.log('Введите новое название товара:');
  }
  input = await getInput(rl);
  updateProduct.product = input;

  let jsonContent = JSON.stringify(content, null, 2);
  fs.writeFileSync(file, jsonContent);

  console.log('Товар изменен', content, '\n');
}

async function deleteProduct(rl) {
  let content = readFile();

  console.log('Введите номер товара для удаления:');
  input = await getInput(rl);
  const findIndex = content.findIndex((data) => data.id == input);
  if (findIndex === -1) {
    console.log('Ошибка. Такого товара нет, попробуйте снова', '\n');
    return;
  } else {
    console.log(
      'Вы действительно хотите удалить данный товар: ',
      content[findIndex],
      '\n',
      'Введите "да" / "нет"'
    );
  }
  input = await getInput(rl);
  if (input.toLowerCase() == 'да') {
    content.splice(findIndex, 1);
  } else {
    console.log('Товар не был удален', '\n');
  }

  let jsonContent = JSON.stringify(content, null, 2);
  fs.writeFileSync(file, jsonContent);

  console.log('Товар удален', content, '\n');
}

function getInput(rl) {
  return new Promise((resolve) => {
    rl.question('> ', (input) => resolve(input));
  });
}

module.exports = {
    menuProduct,
    newProduct,
    changeProduct,
    deleteProduct,
    getInput,
};
