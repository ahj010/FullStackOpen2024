import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const Recommended = ({ user, books }) => {
    if (!user || !user.favoriteGenre) {
      return <p>Please log in to see recommended books.</p>;
    }

    const favoriteGenre = user.favoriteGenre;
    const filteredBooks = books.filter(book => book.genres.includes(favoriteGenre));

    return (
      <div>
        <h2 className='text-lg font-bold m-5 text-center pr-10 bg-blend-darken '>Recommendations</h2>
        <p className=" m-4">Books in your favorite genre <strong>{favoriteGenre}</strong>  :</p>
        {filteredBooks.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Published</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBooks.map(book => (
                <TableRow key={book.title}>
                  <TableCell>{book.title}</TableCell>
                  <TableCell>{book.author.name}</TableCell>
                  <TableCell>{book.published}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p>No books available in your favorite genre.</p>
        )}
      </div>
    );
  };

  export default Recommended;
