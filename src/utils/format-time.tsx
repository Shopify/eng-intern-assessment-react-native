const formatTime = (time: number) => {
  const hours = Math.floor(time / 360000);
  const minutes = Math.floor((time - hours * 360000) / 6000);
  const seconds = Math.floor((time - hours * 360000 - minutes * 6000) / 100);
  const centiseconds = time - hours * 360000 - minutes * 6000 - seconds * 100;
  return (
    (hours < 10 ? "0" + hours : hours) +
    ":" +
    (minutes < 10 ? "0" + minutes : minutes) +
    ":" +
    (seconds < 10 ? "0" + seconds : seconds) +
    ":" +
    (centiseconds < 10 ? "0" + centiseconds : centiseconds)
  );
};

export default formatTime;
