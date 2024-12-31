import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_BOOK, ALL_BOOKS, ALL_AUTHORS } from "../queries/queries";
import { updateCache } from "../../src/utils";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const NewBook = ({ setErrorMessage }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [published, setPublished] = useState("");
  const [genres, setGenres] = useState("");

  const [addBook] = useMutation(ADD_BOOK, {
    onError: (error) => {
      setErrorMessage(error.graphQLErrors[0].message);
    },
    update: (cache, response) => {
      updateCache(cache, { query: ALL_BOOKS, ALL_AUTHORS }, response.data?.addBook);
    },
  });

  const submit = async (event) => {
    event.preventDefault();

    const genresArray = genres.split(",").map((genre) => genre.trim());
    const publishedYear = parseInt(published);

    await addBook({
      variables: {
        title,
        author,
        genres: genresArray,
        published: publishedYear,
      },
    });

    clearForm();
  };

  const clearForm = () => {
    setTitle("");
    setAuthor("");
    setPublished("");
    setGenres("");
  };

  return (
    <div className="flex justify-center mt-10">
      <Card className="w-full max-w-md shadow-md bg-white">
        <CardHeader>
          <h2 className="text-xl font-semibold text-gray-700">Add a New Book</h2>
        </CardHeader>
        <CardContent>
          <form onSubmit={submit}>
            <div className="mb-4">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={({ target }) => setTitle(target.value)}
                placeholder="Enter book title"
                required
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="author">Author</Label>
              <Input
                id="author"
                value={author}
                onChange={({ target }) => setAuthor(target.value)}
                placeholder="Enter author's name"
                required
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="published">Published Year</Label>
              <Input
                id="published"
                type="number"
                value={published}
                onChange={({ target }) => setPublished(target.value)}
                placeholder="Enter year of publication"
                required
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="genres">Genres</Label>
              <Input
                id="genres"
                value={genres}
                onChange={({ target }) => setGenres(target.value)}
                placeholder="Enter genres separated by commas"
              />
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button onClick={clearForm} variant="outline" className="w-full mr-2 hover:bg-red-600">
            Clear
          </Button>
          <Button onClick={submit} type="submit" className="w-full hover:bg-green-600">
            Add Book
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default NewBook;
