import { useRef, useState } from 'react';
import { FiFileText, FiUploadCloud, FiX } from 'react-icons/fi';

function App() {
  const refFile = useRef(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleClickFile = () => {
    refFile?.current?.click();
  };

  const handleFiles = (files) => {
    const updatedFiles = [...uploadedFiles];
    files.forEach((file) => {
      updatedFiles.push(file);
    });

    setUploadedFiles(updatedFiles);
  };

  const handleBrowse = (e) => {
    const { files } = e.target;

    const arrFiles = Array.from(files);
    handleFiles(arrFiles);
  };

  const handleDragDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave' || e.type === 'dragend') {
      setDragActive(false);
    } else if (e.type === 'drop') {
      setDragActive(false);
      const { files } = e.dataTransfer;
      const arrFiles = Array.from(files);
      handleFiles(arrFiles);
    }
  };

  const handleRemove = (file) => {
    const updatedFiles = uploadedFiles.filter((f) => f !== file);
    setUploadedFiles(updatedFiles);
  };

  return (
    <div className="max-w-[400px] mx-auto mt-[20vh]">
      <div
        onDragEnter={handleDragDrop}
        onDragLeave={handleDragDrop}
        onDragEnd={handleDragDrop}
        onDrop={handleDragDrop}
        onDragOver={handleDragDrop}
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
          ref={refFile}
        />
        <FiUploadCloud size={48} />
        <div className="ml-4 flex flex-col items-start">
          <p className="text-base font-semibold text-black">
            Drag & drop files or{' '}
            <span
              className="cursor-pointer text-amber-500"
              onClick={handleClickFile}
            >
              Browse
            </span>
          </p>
          <p>Supported formats: pdf</p>
        </div>
      </div>
      {uploadedFiles.length > 0 && (
        <>
          <p className="text-left font-semibold text-black mt-4 mb-2">
            Uploaded Files
          </p>
          {uploadedFiles.map((file, index) => (
            <div
              className="mb-2 flex justify-between border-2 border-black p-3"
              key={index}
            >
              <div className="flex">
                <div className="h-fit w-fit border border-black p-2">
                  <FiFileText size={20} />
                </div>
                <div className="ml-3 flex flex-col items-start">
                  <p className="text-base font-semibold">{file.name}</p>
                  <p className="text-xs font-semibold">{file.size} kb</p>
                </div>
              </div>
              <FiX
                className="cursor-pointer text-black font-semibold"
                size={12}
                onClick={() => handleRemove(file)}
              />
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default App;
