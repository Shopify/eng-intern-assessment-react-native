const formatTime = (time: number) => {
  const minutes = Math.floor(time / 6000);
  const seconds = Math.floor((time - minutes * 6000) / 100);
  const centiseconds = time - minutes * 6000 - seconds * 100;
  return (
    (minutes < 10 ? "0" + minutes : minutes) +
    ":" +
    (seconds < 10 ? "0" + seconds : seconds) +
    ":" +
    (centiseconds < 10 ? "0" + centiseconds : centiseconds)
  );
};

export default formatTime;
