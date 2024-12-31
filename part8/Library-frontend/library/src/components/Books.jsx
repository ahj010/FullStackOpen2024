import { useState } from 'react';
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"



const Books = ({ books }) => {
    const uniqueGenres = books.reduce((acc, book) => {
    book.genres.forEach(genre => {
      if (!acc.includes(genre)) {
        acc.push(genre);
      }
    });
    return acc;
  }, []);

  const [selectedGenre, setSelectedGenre] = useState(null);

  const filteredBooks = selectedGenre
    ? books.filter(book => book.genres.includes(selectedGenre))
    : books;

  return (
    <div>
      <h2 className='text-lg font-bold m-5 text-center pr-10 bg-blend-darken '>Books</h2>
      <Table className="items-center table-auto border border-slate-100 mb-4 rounded-md">
        <TableHeader>
          <TableRow className="items-center">
            <TableHead className=" px-4 py-2 font-black">Title</TableHead>
            <TableHead className=" px-4 py-2 font-bold">Author</TableHead>
            <TableHead className=" px-4 py-2 font-bold">Published</TableHead>
          </TableRow>
          </TableHeader>

        <TableBody className="items-center">
          {filteredBooks.map(b => (
            <TableRow key={b.title} >
              <TableCell className="px-4 py-2">{b.title}</TableCell>
              <TableCell className="px-4 py-2">{b.author.name}</TableCell>
              <TableCell className="px-4 py-2">{b.published}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div>
        <Button onClick={() => setSelectedGenre(null) } className="m-1">All Genres</Button>
        {uniqueGenres.map(g => (
          <Button key={g} onClick={() => setSelectedGenre(g)}   className={`m-1 hover:bg-blue-300 ${selectedGenre === g ? 'bg-blue-500' : 'bg-slate-800'}`}
          >
            {g}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Books;
