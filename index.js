"use strict";

const checkBingo = (card, selectedWords) => {
  const S = card.length;
  let bingo = false;

  // 横のビンゴ調べる
  for (let i = 0; i < S; i++) {
    const isBingoRow = card[i].every((word) => selectedWords.includes(word));
    if (isBingoRow) {
      bingo = true;
      break;
    }
  }

  // 縦のビンゴを調べる
  for (let i = 0; i < S; i++) {
    // 縦列の単語を配列を入れる
    const col = card.map((row) => row[i]);

    // colとselectedWordsが完全に一致するかどうかを確認
    const isBingoColumn = col.every((word) => selectedWords.includes(word));
    if (isBingoColumn) {
      bingo = true;
      break;
    }
  }

  // 右下りのビンゴを調べる
  const diagonallyRight = [];
  for (let i = 0; i < S; i++) {
    diagonallyRight.push(card[i][i]);
  }

  // diagonallyRightとselectedWordsが完全に一致するかどうかを確認
  const isBingoDiagonallyRight = diagonallyRight.every((word) =>
    selectedWords.includes(word)
  );

  if (isBingoDiagonallyRight) {
    bingo = true;
  }

  // 左下りのビンゴを調べる
  const diagonallyLeft = [];
  for (let i = S - 1; i >= 0; i--) {
    diagonallyLeft.push(card[i][S - 1 - i]);
  }

  // diagonallyLeftとselectedWordsが完全に一致するかどうかを確認
  const isBingoDiagonallyLeft = diagonallyLeft.every((word) =>
    selectedWords.includes(word)
  );

  if (isBingoDiagonallyLeft) {
    bingo = true;
  }

  return bingo ? "yes" : "no";
};

process.stdin.resume();
process.stdin.setEncoding("utf8");

let lines = [];
const reader = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

reader.on("line", (line) => {
  lines.push(line.trim());
});

reader.on("close", () => {
  const S = parseInt(lines[0]);
  const card = lines.slice(1, S + 1).map((line) => line.split(" "));

  const N = parseInt(lines[S + 1]);
  const selectedWords = lines.slice(S + 2);

  const result = checkBingo(card, selectedWords);
  console.log(result);
});
