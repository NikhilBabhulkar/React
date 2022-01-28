import imageCompression from 'browser-image-compression';
import { useState } from 'react';

function App() {

  const [originalimage, setoriginalimage] = useState('');
  const [originalimagefile, setoriginalimagefile] = useState('');
  const [comprssedimage, setcomprssedimage] = useState('');
  const [filename, setfilename] = useState('');

  const handle = (e) => {
    const img = e.target.files[0];
    console.log(img)
    setoriginalimage(img)
    setoriginalimagefile(URL.createObjectURL(img))
    setfilename(img.name)
  }

  const hadlecompressimage = (e) => {
    e.preventDefault();
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 500,
      useWebWorker: true
    }
    if (options.maxSizeMB > originalimage / 1024) {
      alert("Your Image Is So Small In Size Can't be Compressed")
      return 0;
    }
    let output;
    imageCompression(originalimage, options).then((x) => {
      output = x;
      const downlodelink = URL.createObjectURL(output)
      setcomprssedimage(downlodelink)
    })
  }

  return (
    <>
     
    <h2 style={{textAlign:"center"}}>Image Compressor BY <b>NB</b></h2>
      <div className="main">
      
        <div className="img1">
          {
            originalimagefile ? (<img src={originalimagefile} />) : (<img src="https://picsum.photos/200" alt="" srcset="" />
            )}
          <h2>Select An Image</h2>
          <input type="file" accept='image/' onChange={(e) => handle(e)} />
        </div>
        <div className="btn">

          {originalimagefile &&
            <button onClick={(e) => { hadlecompressimage(e) }}>Compress</button>}
          {comprssedimage && <button><a href={comprssedimage} download={filename}>Downlode</a></button>}


        </div>

        <div className="img2">
          {
            comprssedimage ? (<img src={comprssedimage} />) : (<img src="https://picsum.photos/200" alt="" srcset="" />
            )}
          <h2>Compressed Image</h2>
          
        </div>
       
      </div>
    </>
  );
}

export default App;
