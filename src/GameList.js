function GameList(props) {
  const gameListItems = props.games.map(game => <li key={game}>{game}</li>);

  return (
    <ol class="list-decimal list-inside">
      {gameListItems}
    </ol>
  );
}

export default GameList;
