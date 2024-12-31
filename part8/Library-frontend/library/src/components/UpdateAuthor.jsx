import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries/queries";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const UpdateAuthor = ({ authors }) => {
  const [born, setBorn] = useState("");
  const [selectedAuthor, setSelectedAuthor] = useState("");

  const [changeBirthYear] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const submit = (event) => {
    event.preventDefault();

    changeBirthYear({ variables: { name: selectedAuthor, born: parseInt(born) } });

    setSelectedAuthor("");
    setBorn("");
  };

  return (
    <div className="p-6 rounded-lg shadow-md bg-gray-100">
      <h2 className="text-lg font-bold mb-4">Set Birthyear</h2>
      <form onSubmit={submit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="author">Author</Label>
          <Select onValueChange={(value) => setSelectedAuthor(value)} value={selectedAuthor}>
            <SelectTrigger id="author" className="w-full">
              <SelectValue placeholder="Select an author" />
            </SelectTrigger>
            <SelectContent>
              {authors.map((author) => (
                <SelectItem key={author.name} value={author.name}>
                  {author.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="born">Born</Label>
          <Input
            id="born"
            type="number"
            value={born}
            onChange={({ target }) => setBorn(target.value)}
            placeholder="Enter birth year"
          />
        </div>

        <Button type="submit" className="w-full hover:bg-green-600">
          Update Author
        </Button>
      </form>
    </div>
  );
};

export default UpdateAuthor;
