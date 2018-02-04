let table;
let afinn = {};

function preload() {
  table = loadTable('AFINN-111.txt', 'tsv');
}

function setup() {
  noCanvas();
  // console.log(table);
  for (let i = 0; i < table.getRowCount(); i++) {
    let row = table.getRow(i);
    let word = row.get(0);
    let score = row.get(1);
    afinn[word] = score;
    // console.log(word, score);
  }
  // console.log(afinn);
  save(afinn,'afinn-111.json');
}
