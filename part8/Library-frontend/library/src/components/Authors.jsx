import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const Authors = ({ authors}) => {


    return (
      <div>
        <h2 className="text-lg font-bold m-5 text-center pr-10 bg-blend-darken ">Authors</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Born</TableHead>
              <TableHead>Books</TableHead>
            </TableRow>
            </TableHeader>

          <TableBody>
            {authors.map((a) => (
              <TableRow key={a.name}>
                <TableCell>{a.name}</TableCell>
                <TableCell>{a.born}</TableCell>
                <TableCell>{a.bookCount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    )
  }

  export default Authors
