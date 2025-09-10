

interface IBorrowable {
  checkAvailability(): boolean;
  markAsBorrowed(): void;
  markAsReturned(): void;
}

interface IUser {
  borrowBook(book: Book): void;
  returnBook(book: Book): void;
  getBorrowedBooks(): Book[];
  getName(): string;
}



class Book implements IBorrowable {
  private isbn: string;
  private title: string;
  private author: string;
  private isAvailable: boolean;

  constructor(isbn: string, title: string, author: string) {
    this.isbn = isbn;
    this.title = title;
    this.author = author;
    this.isAvailable = true;
  }

  public checkAvailability(): boolean {
    return this.isAvailable;
  }

  public markAsBorrowed(): void {
    this.isAvailable = false;
  }

  public markAsReturned(): void {
    this.isAvailable = true;
  }

  public getTitle(): string {
    return this.title;
  }

  public getISBN(): string {
    return this.isbn;
  }

  public getAuthor(): string {
    return this.author;
  }
}



class User implements IUser {
  protected id: number;
  protected name: string;
  protected borrowedBooks: Book[];

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
    this.borrowedBooks = [];
  }

  public borrowBook(book: Book): void {
    this.borrowedBooks.push(book);
  }

  public returnBook(book: Book): void {
    const index = this.borrowedBooks.indexOf(book);
    if (index !== -1) {
      this.borrowedBooks.splice(index, 1);
    }
  }

  public getBorrowedBooks(): Book[] {
    return this.borrowedBooks;
  }

  public getName(): string {
    return this.name;
  }

  public hasBorrowed(book: Book): boolean {
    return this.borrowedBooks.includes(book);
  }
}



class Library {
  private books: Book[] = [];
  private users: User[] = [];

  public addBook(book: Book): void {
    this.books.push(book);
  }

  public registerUser(user: User): void {
    this.users.push(user);
  }

  public borrowBook(user: User, book: Book): void {
    if (!this.users.includes(user)) {
      console.log(`User ${user.getName()} is not registered.`);
      return;
    }

    if (user.hasBorrowed(book)) {
      console.log(`${user.getName()} already borrowed "${book.getTitle()}"`);
      return;
    }

    if (!book.checkAvailability()) {
      console.log(`"${book.getTitle()}" is not available.`);
      return;
    }

    book.markAsBorrowed();
    user.borrowBook(book);
    console.log(`${user.getName()} borrowed "${book.getTitle()}"`);
  }

  public returnBook(user: User, book: Book): void {
    if (!this.users.includes(user)) {
      console.log(`User ${user.getName()} is not registered.`);
      return;
    }

    if (!user.hasBorrowed(book)) {
      console.log(`${user.getName()} has not borrowed "${book.getTitle()}"`);
      return;
    }

    book.markAsReturned();
    user.returnBook(book);
    console.log(`${user.getName()} returned "${book.getTitle()}"`);
  }

  public getBorrowedBooks(user: User): Book[] {
    return user.getBorrowedBooks();
  }
}



const library = new Library();
const user1 = new User(1, "Por");
const book1 = new Book("ISBN123", "One Piece", "ODA");

library.addBook(book1);
library.registerUser(user1);
library.borrowBook(user1, book1);
library.returnBook(user1, book1);
//library.borrowBook(user1, book1); // ยืมได้อีกครั้ง


