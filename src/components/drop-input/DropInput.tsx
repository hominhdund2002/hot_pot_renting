import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import "./DropInput.scss";
import { ImageConfig } from "../../configs/ImageConfig";
import uploadImg from "../../assets/cloud-upload-regular-240.png";

interface DropFileInputProps {
  onFileChange: (files: File[]) => void;
}

const DropFileInput: React.FC<DropFileInputProps> = ({ onFileChange }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [fileList, setFileList] = useState<File[]>([]);

  const onDragEnter = () => {
    if (wrapperRef.current) {
      wrapperRef.current.classList.add("dragover");
    }
  };

  const onDragLeave = () => {
    if (wrapperRef.current) {
      wrapperRef.current.classList.remove("dragover");
    }
  };

  const onDrop = () => {
    if (wrapperRef.current) {
      wrapperRef.current.classList.remove("dragover");
    }
  };

  const onFileDrop = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFile = e.target.files?.[0];
    if (newFile) {
      const updatedList = [newFile];
      setFileList(updatedList);
      onFileChange(updatedList);
    }
  };

  const fileRemove = (file: File) => {
    const updatedList = fileList.filter((item) => item !== file);
    setFileList(updatedList);
    onFileChange(updatedList);
  };

  return (
    <>
      <div
        ref={wrapperRef}
        className="drop-file-input"
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        <div className="drop-file-input__label">
          <img src={uploadImg} alt="upload" />
          <p>Drag & Drop your files here</p>
        </div>
        <input type="file" onChange={onFileDrop} />
      </div>
      {fileList.length > 0 && (
        <div className="drop-file-preview">
          <p className="drop-file-preview__title">Ready to upload</p>
          {fileList.map((item, index) => (
            <div key={index} className="drop-file-preview__item">
              <img
                src={
                  ImageConfig[item.type.split("/")[1]] || ImageConfig["default"]
                }
                alt="file type"
              />
              <div className="drop-file-preview__item__info">
                <p>{item.name}</p>
                <p>{item.size}B</p>
              </div>
              <span
                className="drop-file-preview__item__del"
                onClick={() => fileRemove(item)}
              >
                x
              </span>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

DropFileInput.propTypes = {
  onFileChange: PropTypes.func.isRequired,
};

export default DropFileInput;
