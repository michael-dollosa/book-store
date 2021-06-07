function store(name, list, earnings) {
  (this.name = name), (this.list = list), (this.earnings = earnings);
}

function book(title, quantity, value) {
  (this.title = title), (this.quantity = quantity), (this.value = value);
}

store.prototype.addBook = function(title, quantity, value){
  let newBook= new book(title, quantity, value)
  this.list.push(newBook);
}

store.prototype.restockBook = function (title, quantity) {
  this.list.some((book) => {
    if (book.title === title) {
      book.quantity += quantity;
    }
  });
  console.log(this.list);
};

// TODO
//sell book
// store.prototype.sellBook = function (title, quantity) {
//   const bookIndex = this.list.findIndex((book) => book.title === title);

//   if (bookIndex !== -1) {
//     const {
//       title: StoreTitle,
//       quantity: Stock,
//       value: Price,
//     } = this.list[bookIndex];

//     if (Stock < quantity) {
//       console.log(`${StoreTitle} has only ${Stock} left`);
//     } else {
//       this.list[bookIndex].quantity -= quantity;
//       this.earnings += quantity * Price;
//     }
//   } else {
//     console.log(`We don't sell that book here`);
//   }
// };

//refactored - 8 lines
store.prototype.sellBook = function (bookTitle, bookQuantity) {
  //destructure this
  let { name, list, earnings} = this
  //find specified book
  const book = list.find((book) => book.title === bookTitle);
  //return invalid early
  if(!book) return console.log("We don't sell that book here")
  //destructure book
  let {title, quantity, value} = book
  //return invalid early
  if(quantity < bookQuantity) return console.log(`${title} has only ${quantity} left`)
  //main logic for sell
  quantity -= bookQuantity
  earnings = bookQuantity * value
  return console.log(`Sold ${title} successfully`)
};

store.prototype.totalEarnings = function () {
  console.log(`Store name is ${this.name} with earnings of ${this.earnings}`);
};

store.prototype.listInventory = function () {
  this.list.map((book) => {
    console.log(`${book.title}, ${book.quantity}, ${book.value}`);
  });
};


//create instance of store
let sampleStore = new store("Avion Store", [], 0);
//create books
sampleStore.addBook("Cinder", 10, 300);
sampleStore.addBook("The Little Prince", 10, 300);
sampleStore.addBook("Lord of the RIngs", 2, 500);
//sell books - happy path
sampleStore.sellBook("Cinder", 1)
//sell books - no book condition
sampleStore.sellBook("Cinder123", 1)
//sell books - quantitiy insufficient
sampleStore.sellBook("Cinder", 1000000)
//restock books
sampleStore.restockBook("Cinder", 5);
sampleStore.restockBook("Harry Potter", 4);
//list earning
sampleStore.totalEarnings();
//list inventory
sampleStore.listInventory();
