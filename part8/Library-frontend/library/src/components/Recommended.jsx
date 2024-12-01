const Recommended = ({ user, books }) => {
    if (!user || !user.favoriteGenre) {
      return <p>Please log in to see recommended books.</p>;
    }

    const favoriteGenre = user.favoriteGenre;
    const filteredBooks = books.filter(book => book.genres.includes(favoriteGenre));

    return (
      <div>
        <h2>Recommendations</h2>
        <p>Books in your favorite genre: <strong>{favoriteGenre}</strong></p>
        {filteredBooks.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Author</th>
                <th>Published</th>
              </tr>
            </thead>
            <tbody>
              {filteredBooks.map(book => (
                <tr key={book.title}>
                  <td>{book.title}</td>
                  <td>{book.author.name}</td>
                  <td>{book.published}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No books available in your favorite genre.</p>
        )}
      </div>
    );
  };

  export default Recommended;
