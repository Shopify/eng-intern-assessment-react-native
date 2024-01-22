// takes in parameter time that represents time in milliseconds
// returns formatted hours:minutes:seconds:centiseconds time
export default function csToFormattedTime(time: number) {
  const h = Math.floor(time / 3600000); // 1000 * 60 * 60 ms in h
  const m = Math.floor(time / 60000) % 60; // 1000 * 60 cs in m, m goes up to 60
  const s = Math.floor(time / 1000) % 60; // 1000 ms in s, s goes up to 60
  const cs = Math.floor(time / 10) % 100; // 10 ms in cs, goes up to 100

  const hString = h > 0 ? h.toString().padStart(2, '0') + ':' : '';
  const mString = m.toString().padStart(2, '0') + ':';
  const sString = s.toString().padStart(2, '0') + ':';
  const csString = cs.toString().padStart(2, '0')

  return hString + mString + sString + csString;
}
