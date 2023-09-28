import { Readable } from "stream";

class OneToHundredStream extends Readable {
  index = 1;

  _read() {
    const i = this.index++;

    setTimeout(() => {
      if (i > 100) {
        this.push(null)
      } else {
        const buf = Buffer.from(String(i));

        this.push(buf);
      }
    }, 1000);
  }
}

fetch('http://localhost:8000', {
  method: 'POST',
  body: new OneToHundredStream(),
  duplex: 'half',
})