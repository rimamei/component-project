import { useRef, useState } from 'react';
import { FiFileText, FiUploadCloud, FiX } from 'react-icons/fi';

function App() {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleBrowse = () => {};

  return (
    <div className="max-w-[400px] mx-auto mt-[20vh]">
      <div
        className={`${
          dragActive ? 'border-amber-500 bg-amber-100' : 'border-black'
        } flex min-h-[185px] items-center justify-center border-4 w-full`}
      >
        <input
          type="file"
          accept=".pdf"
          className="hidden"
          multiple={true}
          name="docs"
          onChange={handleBrowse}
        />
        <FiUploadCloud size={48} />
        <div className="ml-4 flex flex-col items-start">
          <p className="text-base font-semibold text-black">
            Drag & drop files or{' '}
            <span className="cursor-pointer text-amber-500">Browse</span>
          </p>
          <p>Supported formats: pdf</p>
        </div>
      </div>
      <p className="text-left font-semibold text-black mt-4 mb-2">
        Uploaded Files
      </p>
      <div className="flex justify-between border-2 border-black p-3">
        <div className="flex">
          <div className="h-fit w-fit border border-black p-2">
            <FiFileText size={20} />
          </div>
          <div className="ml-3 flex flex-col items-start">
            <p className="text-base font-semibold">Name.pdf</p>
            <p className="text-xs font-semibold">12345 kb</p>
          </div>
        </div>
        <FiX className="cursor-pointer text-black font-semibold" size={12} />
      </div>
    </div>
  );
}

export default App;
